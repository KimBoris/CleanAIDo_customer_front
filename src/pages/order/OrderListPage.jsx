import OrderListComponent from "../../component/order/OrderListComponent";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

const OrderListPage = () => {
    return (
        <div>
            <NaviBarTitle title={"주문 목록"} />
            <OrderListComponent />
        </div>
    );
};

export default OrderListPage;
