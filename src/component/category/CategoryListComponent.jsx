import {useState, useEffect} from 'react';
import {getCategoryList} from '../../api/categoryApi';
import {Link} from "react-router-dom";

const CategoryListComponent = () => {
    const [categories, setCategories] = useState([]);
    const [activeCno, setActiveCno] = useState(null); // 1차 카테고리 활성화 상태
    const [subCategories, setSubCategories] = useState([]);
    const [activeSubCno, setActiveSubCno] = useState(null); // 2차 카테고리 활성화 상태

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoryList();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (cno) => {
        setActiveCno(cno);

        // 새로운 1차 카테고리를 클릭할 때마다 2차 카테고리를 초기화
        setSubCategories([]);
        setActiveSubCno(null); // 선택된 2차 카테고리도 초기화

        const filteredSubCategories = categories.filter(
            (category) => category.parent === cno
        );
        setSubCategories(filteredSubCategories);
    };

    const handleSubCategoryClick = (subCno) => {
        setActiveSubCno(subCno);
    };

    return (
        <div className="flex h-screen w-full p-4 py-4 mt-[9rem]">
            {/* 1차 카테고리 */}
            <div className="w-1/3 bg-gray-100 p-4 flex flex-col items-stretch h-full">
                <h2 className="font-semibold text-lg mb-4">1차 카테고리</h2>
                {categories
                    .filter((category) => category.parent === null)
                    .map((category) => (
                        <button
                            key={category.cno}
                            className={`p-2 mb-2 text-left w-full rounded-md h-10 flex items-center justify-start ${
                                activeCno === category.cno
                                    ? 'bg-blue-200 font-semibold'
                                    : 'hover:bg-gray-200'
                            }`}
                            style={{transition: 'none', minWidth: '100px',}} // 크기 변경 방지
                            onClick={() => handleCategoryClick(category.cno)}
                        >
                            {category.cname}
                        </button>
                    ))}
            </div>

            {/* 2차 카테고리 */}
            <div className="w-2/3 bg-white p-4">
                <h2 className="font-semibold text-lg mb-4 overflow-x-auto">2차 카테고리</h2>
                {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                        <Link
                            to={`/product/list?type=category&keyword=${subCategory.cname}`}
                            key={subCategory.cno}
                            className={`p-3 mb-2 border rounded-md cursor-pointer flex items-center ${
                                activeSubCno === subCategory.cno
                                    ? 'bg-blue-200 font-semibold'
                                    : 'hover:bg-gray-200'
                            }`}
                            style={{
                                transition: 'none', // 크기 변경 방지
                                minWidth: '230px', // 가로 길이 늘림
                            }}
                            onClick={() => handleSubCategoryClick(subCategory.cno)}
                        >
                            {subCategory.cname}
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">1차 카테고리를 선택해 주세요.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryListComponent;
