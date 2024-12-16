import { useState, useEffect } from 'react';
import { getCategoryList } from '../../api/categoryApi';

const CategoryListComponent = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);

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

    const handleCategoryClick = (categoryId) => {
        setActiveCategoryId(categoryId);

        // 새로운 1차 카테고리를 클릭할 때마다 2차 카테고리를 초기화
        setSubCategories([]);
        setActiveSubCategoryId(null);  // 선택된 2차 카테고리도 초기화

        const filteredSubCategories = categories.filter(
            (category) => category.parent === categoryId
        );
        setSubCategories(filteredSubCategories);
    };

    const handleSubCategoryClick = (subCategoryId) => {
        setActiveSubCategoryId(subCategoryId);
    };

    return (
        <div className="flex h-screen w-full p-4 py-4">
            {/* 1차 카테고리 */}
            <div className="w-2/5 bg-gray-100 p-4 overflow-y-auto flex flex-col">
                <h2 className="font-semibold text-lg mb-4">1차 카테고리</h2>
                {categories
                    .filter((category) => category.parent === null)
                    .map((category) => (
                        <button
                            key={category.cno}
                            className={`p-3 mb-2 text-left w-full rounded-md ${
                                activeCategoryId === category.cno
                                    ? 'bg-blue-200 font-semibold'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => handleCategoryClick(category.cno)}
                        >
                            {category.cname}
                        </button>
                    ))}
            </div>

            {/* 2차 카테고리 */}
            <div className="w-3/5 bg-white p-4 overflow-y-auto">
                <h2 className="font-semibold text-lg mb-4">2차 카테고리</h2>
                {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                        <div
                            key={subCategory.cno}
                            className={`p-3 mb-2 border rounded-md cursor-pointer ${
                                activeSubCategoryId === subCategory.cno
                                    ? 'bg-blue-200 font-semibold'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => handleSubCategoryClick(subCategory.cno)}
                        >
                            {subCategory.cname}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">1차 카테고리를 선택해 주세요.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryListComponent;
