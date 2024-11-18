import { useEffect, useState } from "react";
import CartDetailListComponent from "./CartDetailListComponent.jsx";
import {getCartList, updateQty} from "../../api/cartAPI.js";
import { deleteCart } from "../../api/cartAPI.js"; // deleteCart API import
import NaviBarMain from "../layout/NaviBarMain.jsx";

function CartPageComponent() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        getCartList()
            .then(data => {
                console.log(data)
                setCart(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleCartItemDelete = async (cdno) => {
        try {
            // 서버에서 해당 카트 항목 삭제
            await deleteCart(cdno);

            // 삭제 후 최신 장바구니 목록을 서버에서 다시 가져오기
            const data = await getCartList();
            setCart(data); // 최신 데이터로 상태 업데이트
        } catch (error) {
            console.error("Error deleting cart item:", error);
            setError("Failed to delete item. Please try again.");
        }
    };

    const handleCartQtyUpdate = async (cdno, quantity) => {
        try {
            await updateQty(cdno, quantity);
            // 삭제 후 최신 장바구니 목록을 서버에서 다시 가져오기
            const data = await getCartList();
            setCart(data); // 최신 데이터로 상태 업데이트
        } catch (error) {
            console.error("Error deleting cart item:", error);
            setError("Failed to delete item. Please try again.");
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NaviBarMain />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Order List</h1>
                <CartDetailListComponent cart={cart} onDelete={handleCartItemDelete} onUpdate={handleCartQtyUpdate}/>
            </div>
        </div>
    );
}

export default CartPageComponent;
