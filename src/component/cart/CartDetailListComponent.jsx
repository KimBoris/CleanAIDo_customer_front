import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartDetailListComponent({ cart, onDelete, onUpdate }) {
    const navigate = useNavigate();
    const [checkedProducts, setCheckedProducts] = useState([]);

    // 체크박스 상태 토글
    const handleCheckboxChange = (item) => {
        setCheckedProducts((prev) =>
            prev.some((p) => p.cdno === item.cdno)
                ? prev.filter((p) => p.cdno !== item.cdno)
                : [...prev, item]
        );
    };

    // 선택된 상품들의 총 합계 계산
    const totalAmount = checkedProducts.reduce(
        (total, item) => total + (item.product?.price || 0) * item.quantity,
        0
    );

    // 상품 삭제 처리
    const handleDeleteCart = async (cdno) => {
        await onDelete(cdno);
        setCheckedProducts((prev) => prev.filter((item) => item.cdno !== cdno));
    };

    // 수량 업데이트
    const handleUpdateQty = async (cdno, newQuantity) => {
        if (newQuantity < 1) return; // 수량이 1 미만으로 내려가는 것 방지
        await onUpdate(cdno, newQuantity);
    };

    // 구매하기 버튼 클릭
    const handlePurchaseClick = () => {
        const productsToPurchase = checkedProducts.map((item) => ({
            productId: item.product.pno,
            pname: item.product.pname,
            price: item.product.price,
            quantity: item.quantity,
        }));

        if (productsToPurchase.length === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }

        navigate("/mypage/order/create", { state: { products: productsToPurchase } });
    };

    return (
        <div className="container bg-bara_gray_1 min-h-screen pb-48 mt-[10rem]">
            <ul className="mt-4 bg-white py-4">
                {cart.map((item) => (
                    <li key={item.cdno} className="px-8">
                        <div className="flex justify-between py-2">
                            {/* 체크박스와 상품명 */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    onChange={() => handleCheckboxChange(item)}
                                    checked={checkedProducts.some((p) => p.cdno === item.cdno)}
                                />
                                <h3 className="line-clamp-1 w-64">{item.product.pname}</h3>
                            </div>
                            {/* 삭제 버튼 */}
                            <button onClick={() => handleDeleteCart(item.cdno)}>
                                <img src="/images/close.svg" alt="삭제" className="w-4 h-4" />
                            </button>
                        </div>

                        {/* 상품 이미지 및 수량 */}
                        <div className="flex">
                            <div className="p-2 w-28 h-28 bg-bara_gray_4 flex-shrink-0">
                                {item.product?.imageFiles?.length > 0 ? (
                                    <img
                                        src={`/path/to/images/${item.product.imageFiles[0].fileName}`}
                                        alt="상품 이미지"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </div>

                            {/* 상품 가격 및 수량 조작 */}
                            <div className="flex flex-col justify-between px-4 w-full">
                                <p className="text-lg font-bold">{item.product.price.toLocaleString()} 원</p>
                                <p className="text-sm text-gray-500">
                                    총 가격:{" "}
                                    <span className="font-semibold">
                                        {(item.product.price * item.quantity).toLocaleString()} 원
                                    </span>
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <span>수량</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleUpdateQty(item.cdno, item.quantity - 1)}
                                            className="px-2 bg-gray-300 rounded"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleUpdateQty(item.cdno, parseInt(e.target.value, 10) || 1)
                                            }
                                            className="w-16 text-center border rounded"
                                        />
                                        <button
                                            onClick={() => handleUpdateQty(item.cdno, item.quantity + 1)}
                                            className="px-2 bg-gray-300 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />
                    </li>
                ))}
            </ul>

            {/* 결제 버튼 및 합계 */}
            {cart.length > 0 && (
                <div
                    className="fixed bottom-0 left-0 w-full bg-white px-8 py-4 pb-12 shadow-md"
                    style={{ zIndex: 100 }}
                >
                    <button
                        onClick={handlePurchaseClick}
                        disabled={checkedProducts.length === 0}
                        className={`w-full py-4 text-white rounded ${
                            checkedProducts.length === 0 ? "bg-bara_gray_3" : "bg-bara_blue"
                        }`}
                    >
                        {totalAmount > 0
                            ? `${totalAmount.toLocaleString()}원 구매하기`
                            : "구매하기"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartDetailListComponent;
