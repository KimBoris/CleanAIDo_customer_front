import  { useState } from "react";
import CategoryList from "../../component/category/CategoryListComponent.jsx"
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";

const CategoryIndexPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div>
            <NaviBarTitle title={"카테고리"} path={"/shop"} />
            <CategoryList onCategorySelect={setSelectedCategory} />
            <TabBarShop />
        </div>
    );
};

export default CategoryIndexPage;