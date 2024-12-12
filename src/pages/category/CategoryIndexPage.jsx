import  { useState } from "react";
import CategoryList from "../../component/category/CategoryListComponent.jsx"

const CategoryIndexPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="flex">

            <CategoryList onCategorySelect={setSelectedCategory} />

        </div>
    );
};

export default CategoryIndexPage;