import { useEffect, useState } from "react";
import CartDetailListComponent from "./CartDetailListComponent.jsx";
import { getCartList, updateQty } from "../../api/cartAPI.js";
import { deleteCart } from "../../api/cartAPI.js"; // deleteCart API import

function CartPageComponent() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        getCartList()
            .then(data => {
                console.log(data);
                setCart(data); // 장바구니 상태 업데이트
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
            await deleteCart(cdno);  // 서버에서 장바구니 항목 삭제
            const data = await getCartList(); // 삭제 후 최신 장바구니 목록을 가져오기
            setCart(data);  // 상태 업데이트
        } catch (error) {
            console.error("Error deleting cart item:", error);
            setError("Failed to delete item. Please try again.");
        }
    };

    const handleCartQtyUpdate = async (cdno, quantity) => {
        try {
            await updateQty(cdno, quantity);  // 서버에서 수량 업데이트
            const data = await getCartList(); // 수량 업데이트 후 최신 장바구니 목록 가져오기
            setCart(data);  // 상태 업데이트
        } catch (error) {
            console.error("Error update quantity:", error);
            setError("Failed to update item. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <CartDetailListComponent
                cart={cart}
                onDelete={handleCartItemDelete}
                onUpdate={handleCartQtyUpdate}
            />
        </div>
    );
}

export default CartPageComponent;
