import {useState, useEffect} from 'react';
import {getCategoryList} from '../../api/categoryAPI';
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
        <div className="flex w-full mt-[9rem] mb-40">
            {/* 1차 카테고리 */}
            <div className="w-1/3 bg-bara_gray_1 flex flex-col items-stretch relative">
                {categories
                    .filter((category) => category.parent === null)
                    .map((category, index) => (
                        <button
                            key={category.cno}
                            className={`relative px-4 py-6 w-full flex items-center justify-center 
                        ${
                                activeCno !== category.cno && activeCno !== categories[index + 1]?.cno
                                    ? "after:absolute after:bottom-0 after:left-1/2 after:w-[50%] after:h-[1px] " +
                                    "after:bg-bara_gray_2 after:transform after:-translate-x-1/2"
                                    : ""
                            } last:after:content-none ${
                                activeCno === category.cno && "bg-white font-bold"
                            }`}
                            style={{transition: "none", minWidth: "100px"}}
                            onClick={() => handleCategoryClick(category.cno)}
                        >
                            {category.cname}
                        </button>
                    ))}
            </div>

            {/* 2차 카테고리 */}
            <div className="w-2/3 bg-white p-4">
                {subCategories.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 max-w-full w-full">
                        {subCategories.map((subCategory) => (
                            <Link
                                to={`/product/list?type=category&keyword=${subCategory.cname}`}
                                key={subCategory.cno}
                                className={`relative p-3 cursor-pointer flex items-center justify-center 
                        after:absolute after:bottom-0 after:left-1/2 after:w-[90%] after:h-[1px] after:bg-bara_gray_2 after:transform after:-translate-x-1/2
                    `}
                                style={{
                                    transition: "none",
                                    minWidth: "0", // 요소 크기 강제 제한
                                    width: "100%", // 부모 그리드에 맞게 너비 설정
                                }}
                                onClick={() => handleSubCategoryClick(subCategory.cno)}
                            >
                                {subCategory.cname}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">카테고리를 선택해 주세요.</p>
                )}
            </div>

        </div>
    );
};

export default CategoryListComponent;
