import axios from 'axios';
import { useState, useEffect } from 'react';
import NaviBarMain from "../../component/layout/NaviBarMain";
import OrderListComponent from "../../component/order/OrderListComponent";

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/order/list', {
            params: { customerId: 'customer0@aaa.com' }  // String ID 전달
        })
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (orderNumber, status) => {
        axios.patch(`http://localhost:8080/api/v1/order/${orderNumber}/status`, null, {
            params: { status }
        })
            .then(() => {
                setOrders(prevOrders => prevOrders.map(order =>
                    order.orderNumber === orderNumber ? { ...order, orderStatus: status } : order
                ));
            })
            .catch(error => {
                console.error("Failed to update order status:", error);
            });
    };

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
