import CartPageComponent from "../../component/cart/CartPageComponent.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";

function CartPage(){
    return (
        <>
            {/* path를 쇼핑몰 메인으로 넘겨줘야 함 */}
            <NaviBarTitle title="장바구니" path={"/shop"} />
            <div className="bg-bara_gray_1 min-h-screen w-full overflow-y-auto">
                <CartPageComponent></CartPageComponent>
            </div>
            <TabBarShop />
        </>

    );
}

export default CartPage