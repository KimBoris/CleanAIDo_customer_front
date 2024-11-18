import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import OrderCreateComponent from "../../component/order/OrderCreateComponent.jsx";

const OrderCreatePage = () => {
    return (
        <div className="bg-bara_gray_1 min-h-screen">
            <NaviBarShop />
            <div className="px-8 py-6">
                <OrderCreateComponent />
            </div>
        </div>
    );
};

export default OrderCreatePage;
