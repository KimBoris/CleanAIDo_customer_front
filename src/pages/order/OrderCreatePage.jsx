import OrderCreateComponent from "../../component/order/OrderCreateComponent.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

const OrderCreatePage = () => {
    return (
        <div className="bg-bara_gray_1 min-h-screen">
            <NaviBarTitle title={"주문 하기"} path={-1} />
            <OrderCreateComponent />
        </div>
    );
};

export default OrderCreatePage;
