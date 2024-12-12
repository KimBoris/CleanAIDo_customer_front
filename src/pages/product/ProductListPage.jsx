import ProductListComponent from '../../component/product/ProductListComponent.jsx';
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

const ProductListPage = () => {
    return (
        <div>
            <NaviBarTitle title={""} path={"/shop"}  />
            <ProductListComponent />
            <TabBarShop></TabBarShop>

        </div>
    );
};

export default ProductListPage;
