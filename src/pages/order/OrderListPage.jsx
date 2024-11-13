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
            params: { customerId: '2' }  // 실제로는 로그인한 사용자의 ID를 전달해야 합니다.
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NaviBarMain />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Order List</h1>
                <OrderListComponent orders={orders} />
            </div>
        </div>
    );
}

export default OrderListPage;
