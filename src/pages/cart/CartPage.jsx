import NaviBarMain from "../../component/layout/NaviBarMain.jsx";
import CartPageComponent from "../../component/cart/CartPageComponent.jsx";

function CartPage(){
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NaviBarMain />
            <CartPageComponent></CartPageComponent>
        </div>
    );
}

export default CartPage