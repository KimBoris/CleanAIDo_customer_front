import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import OrderListComponent from "../../component/order/OrderListComponent";

const OrderListPage = () => {
    return (
        <div className="bg-bara_gray_1 min-h-screen">
            <NaviBarShop />
            <div className="px-8 py-6">
                <h1 className="text-2xl font-medium text-bara_sodomy mb-8">주문 내역</h1>
                <OrderListComponent />
            </div>
        </div>
    );
};

export default OrderListPage;
