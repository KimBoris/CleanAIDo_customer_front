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
        <div className="container bg-bara_gray_1 min-h-screen pb-48 mt-[10rem]">
            <ul className="mt-4 bg-white py-4">
                {cart.map((item) => (
                    <li key={item.cdno} className="px-8">
                        <div>
                            <div className="flex justify-between py-1">
                                <div className="flex items-start space-x-2">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5"
                                        onChange={() => handleCheckboxChange(item)}
                                        checked={checkedProducts.some(checkedItem => checkedItem.cdno === item.cdno)}
                                    />
                                    <h3 className="w-64 overflow-hidden line-clamp-2 mt-[-0.2rem]">{item.product.pname}</h3>
                                </div>
                                <button
                                    className="w-10 h-10 flex items-center justify-center"
                                    onClick={() => handleDeleteCart(item.cdno)}
                                >
                                    <img className="w-4 h-4" src="/images/close.svg"/>
                                </button>
                            </div>
                            <div className="flex pb-6">
                                <div className="flex-shrink-0 p-2 w-28 h-28 bg-bara_gray_4">
                                    {item.product.imageFiles && item.product.imageFiles.length > 0 ? (
                                        <img src={`path/to/images/${item.product.imageFiles[0].fileName}`}
                                             alt="상품 이미지"/>
                                    ) : (
                                        <span className="no-image">No Image</span>
                                    )}
                                </div>
                                <div className="px-3 flex flex-col justify-between items-start w-full">
                                <p className="text-[1.2rem] font-bold text-bara_blue">{item.product.price.toLocaleString()} 원</p>

                                    <div className="bg-bara_gray_1 w-full flex p-4 mt-4 justify-between">
                                        <span>수량</span>
                                        <div>
                                            <button
                                                onClick={() => handleMinusQty(item.cdno, item.quantity)}
                                                className="px-2 bg-bara_gray_2">-</button>
                                            <input
                                                value={item.quantity}
                                                type="number"
                                                className="w-16 text-center"
                                            />
                                            <button
                                                onClick={() => handlePlusQty(item.cdno, item.quantity)}
                                                className="px-2 bg-bara_gray_2">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="border-bara_gray_2 mb-4"/>
                    </li>
                ))}
            </ul>
            <div
                className="fixed bottom-0 left-0 w-full bg-white text-bara_sodomy px-8 pt-4 pb-12"
                style={{boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'}}
            >
                <button
                    className="w-full py-4 bg-bara_blue text-white rounded"
                    onClick={handlePurchaseClick}
                    disabled={checkedProducts.length === 0}
                >
                    {totalAmount > 0 ?
                        <span>{totalAmount.toLocaleString()}원</span> : <span></span>} 구매하기
                </button>
            </div>
        </div>
    );
}

export default CartDetailListComponent;
