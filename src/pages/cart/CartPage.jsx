import { useEffect, useState } from "react";
import CartDetailListComponent from "../../component/cart/CartDetailListComponent.jsx";
import { getCartList } from "../../api/cartAPI.js";
import NaviBarMain from "../../component/layout/NaviBarMain.jsx";

function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getCartList()
            .then(data => {
                setCart(data);
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
                <CartDetailListComponent cart={cart} />
            </div>
        </div>
    );
}

export default CartPage;
