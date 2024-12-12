import  { useState } from "react";

import CategoryListPage from "./CategoryListPage.jsx";

const CategoryIndexPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="flex">

            <CategoryListPage onCategorySelect={setSelectedCategory} />

        </div>
    );
};

export default CategoryIndexPage;