import OrderListComponent from "../../component/order/OrderListComponent";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";

const OrderListPage = () => {
    return (
        <div>
            <NaviBarTitle title={"주문 목록"} />
            <OrderListComponent />
            <TabBarShop />
        </div>
    );
};

export default OrderListPage;
