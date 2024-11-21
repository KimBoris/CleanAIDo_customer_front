import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CartDetailListComponent({ cart, onDelete, onUpdate }) {
    const navigate = useNavigate();

    // 선택된 상품들을 저장하는 상태
    const [checkedProducts, setCheckedProducts] = useState([]);

    // 체크박스 변경 처리 함수
    const handleCheckboxChange = (item) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.some(checkedItem => checkedItem.cdno === item.cdno)) {
                // 이미 선택된 경우 배열에서 제거
                return prevCheckedProducts.filter(checkedItem => checkedItem.cdno !== item.cdno);
            } else {
                // 선택되지 않은 경우 배열에 추가
                return [...prevCheckedProducts, item];
            }
        });
    };

    // 선택된 상품들의 총 합계 계산
    const totalAmount = checkedProducts.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    // 상품 삭제 처리 함수
    const handleDeleteCart = async (cdno) => {
        try {
            await onDelete(cdno);  // 부모에서 전달된 onDelete 호출
            setCheckedProducts((prevCheckedProducts) =>
                prevCheckedProducts.filter((item) => item.cdno !== cdno)
            );  // 삭제된 상품은 체크박스에서 제거
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    };

    // 수량 업데이트 처리 함수
    const handleUpdateQty = async (cdno, newQuantity) => {
        try {
            await onUpdate(cdno, newQuantity);  // 부모에서 전달된 onUpdate 호출
            setCheckedProducts((prevCheckedProducts) =>
                prevCheckedProducts.map((item) =>
                    item.cdno === cdno ? { ...item, quantity: newQuantity } : item
                )
            );  // 수량 업데이트
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };

    // 수량 감소 처리 함수
    const handleMinusQty = async (cdno, quantity) => {
        if (quantity > 1) {
            await handleUpdateQty(cdno, quantity - 1);
        }
    };

    // 수량 증가 처리 함수
    const handlePlusQty = async (cdno, quantity) => {
        await handleUpdateQty(cdno, quantity + 1);
    };

    // '구매하기' 버튼 클릭 처리 함수
    const handlePurchaseClick = () => {
        const productsToPurchase = checkedProducts.map(item => ({
            productId: item.product.pno,
            pname: item.product.pname,
            price: item.product.price,
            quantity: item.quantity,
        }));

        if (productsToPurchase.length === 0) {
            alert("선택된 상품이 유효하지 않습니다.");
            return;
        }

        navigate("/mypage/order/create", { state: { products: productsToPurchase } });
    };
    return (
        <div className="cart-container">
            <ul className="cart-list bg-white  ">
                {cart.map((item) => (
                    <li key={item.cdno} className="cart-item px-8">
                        <div className="cart-item-details">
                            <div className="flex items-center justify-between py-1">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6"
                                        onChange={() => handleCheckboxChange(item)}
                                        checked={checkedProducts.some(checkedItem => checkedItem.cdno === item.cdno)}
                                    />
                                    <h3 className="text-lg font-semibold w-64 overflow-hidden line-clamp-3">{item.product.pname}</h3>
                                </div>
                                <button
                                    className="text-gray-500 w-10 h-10 flex items-center justify-center hover:bg-gray-600"
                                    onClick={() => handleDeleteCart(item.cdno)}
                                >
                                    <img className="w-4 h-4" src="/images/close.svg"/>
                                </button>
                            </div>
                            <div className="flex items-center pb-6">
                                <div className="cart-item-image p-2 w-28 h-28 bg-bara_gray_4">
                                    {item.product.imageFiles && item.product.imageFiles.length > 0 ? (
                                        <img src={`path/to/images/${item.product.imageFiles[0].fileName}`}
                                             alt="상품 이미지"/>
                                    ) : (
                                        <span className="no-image">No Image</span>
                                    )}
                                </div>
                                <div className="px-3">
                                <p className="cart-item-price py-6">Price: {item.product.price.toLocaleString()} 원</p>
                                    <div
                                        className="flex items-center justify-between border-2 border-black-500 w-28 py-1">
                                        <button
                                            className="w-6"
                                            onClick={() => handleMinusQty(item.cdno, item.quantity)}>-
                                        </button>
                                        <p className="cart-item-quantity">{item.quantity}개</p>
                                        <button
                                            className="w-6"
                                            onClick={() => handlePlusQty(item.cdno, item.quantity)}>+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="border-bara_gray_2 mb-4"/>
                    </li>
                ))}
            </ul>
            <div className="h-16"></div>
            <div
                className="p-3 flex items-center justify-between h-16 fixed bottom-0 left-0 w-full bg-white shadow-md z-50"
            >
                <h4 className="p-2">총 합계: {totalAmount.toLocaleString()} 원</h4>
                <button
                    className="w-28 h-8 bg-bara_light_sky_blue rounded"
                    onClick={handlePurchaseClick}
                    disabled={checkedProducts.length === 0}
                >
                    구매하기
                </button>
            </div>
        </div>
    );
}

export default CartDetailListComponent;
