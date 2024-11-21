import CartPageComponent from "../../component/cart/CartPageComponent.jsx";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";

function CartPage(){
    return (
        <div className="min-h-screen flex flex-col">
            <NaviBarShop />
            <CartPageComponent></CartPageComponent>
        </div>
    );
}

export default CartPage