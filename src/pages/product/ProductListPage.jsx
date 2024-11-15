import ProductListComponent from '../../component/product/ProductListComponent.jsx';
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";

const ProductListPage = () => {
    return (
        <div>
            <NaviBarShop></NaviBarShop>
            <ProductListComponent />
            <TabBarShop></TabBarShop>

        </div>
    );
};

export default ProductListPage;
