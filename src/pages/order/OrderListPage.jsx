import { useState, useEffect } from 'react';
import NaviBarMain from "../../component/layout/NaviBarMain";
import OrderListComponent from "../../component/order/OrderListComponent";
import { fetchOrders, updateOrderStatus } from '../../api/orderApi';

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const customerId = 'customer3@aaa.com'; // 고객 ID 정의

    // 주문 목록을 가져오는 함수
    const loadOrders = async () => {
        try {
            const response = await fetchOrders(customerId);
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('fetching orders 에러입니당:', error);
            setError('Failed to fetch orders. Please try again later.');
            setLoading(false);
        }
    };

    // 상태 변경 함수
    const handleStatusChange = async (orderNumber, status) => {
        try {
            await updateOrderStatus(orderNumber, status);
            setOrders(prevOrders => prevOrders.map(order =>
                order.orderNumber === orderNumber ? { ...order, orderStatus: status } : order
            ));
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    useEffect(() => {
        loadOrders(); // 주문 목록 로드
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NaviBarMain />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">주문 내역</h1>
                <OrderListComponent orders={orders} onStatusChange={handleStatusChange} />
            </div>
        </div>
    );
}

export default OrderListPage;
