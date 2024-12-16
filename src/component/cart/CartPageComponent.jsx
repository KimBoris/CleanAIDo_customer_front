import { useEffect, useState } from "react";
import CartDetailListComponent from "./CartDetailListComponent.jsx";
import { getCartList, deleteCart, updateQty, addCartItem } from "../../api/cartAPI.js";

function CartPageComponent() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 장바구니 목록 조회
    const fetchCartList = async () => {
        setLoading(true);
        try {
            const data = await getCartList();
            setCart(data);
        } catch (error) {
            console.error("Error fetching cart list:", error);
            setError("장바구니를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartList();
    }, []);

    // 장바구니 항목 삭제
    const handleDelete = async (cdno) => {
        try {
            await deleteCart(cdno);
            setCart((prev) => prev.filter((item) => item.cdno !== cdno));
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("상품 삭제에 실패했습니다.");
        }
    };

    // 수량 업데이트
    const handleUpdateQty = async (cdno, quantity) => {
        try {
            await updateQty(cdno, quantity);
            setCart((prev) =>
                prev.map((item) => (item.cdno === cdno ? { ...item, quantity } : item))
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
            setError("수량 업데이트에 실패했습니다.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <CartDetailListComponent
                cart={cart}
                onDelete={handleDelete}
                onUpdate={handleUpdateQty}
            />
        </div>
    );
}

export default CartPageComponent;
