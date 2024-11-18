    import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";

function ProductReadPage() {

    return (
        <>
            <NaviBarShop />
            <div className="bg-bara_gray_1 min-h-screen w-full overflow-y-auto">
                <ProductReadComponent />
            </div>
        </>
    );
}

export default ProductReadPage;
