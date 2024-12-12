import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

function ProductReadPage() {

    return (
        <>
            <NaviBarTitle title={"상품 조회"} path={-1} />
            <div className="bg-bara_gray_1 min-h-screen w-full overflow-y-auto">
                <ProductReadComponent />
            </div>
        </>
    );
}

export default ProductReadPage;
