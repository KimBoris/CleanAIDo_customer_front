import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CartDetailListComponent( {cart, onDelete, onUpdate} ) {
    const navigate = useNavigate();

    // 선택된 상품들을 저장하는 상태
    const [checkedProducts, setCheckedProducts] = useState([]);

    // 선택된 상품들의 총 합계 계산
    const totalAmount = checkedProducts.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    // 체크박스 변경 처리 함수
    const handleCheckboxChange = (item) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.some(checkedItem => checkedItem.product === item.product)) {
                // 이미 선택된 경우 배열에서 제거
                return prevCheckedProducts.filter(checkedItem => checkedItem.product !== item.product);
            } else {
                // 선택되지 않은 경우 배열에 추가
                return [...prevCheckedProducts, item];
            }
        });
    };

    // '구매하기' 버튼 클릭 시 선택된 상품 정보와 함께 이동
    const handlePurchaseClick = () => {
        const productsToPurchase = checkedProducts.map(item => {
            if (!item.product || !item.product.pno) {
                console.error("Invalid product in cart:", item);
                alert("유효하지 않은 상품이 선택되었습니다.");
                return null;
            }
            return {
                productId: item.product.pno,
                pname: item.product.pname,
                price: item.product.price,
                quantity: item.quantity,
            };
        }).filter(product => product !== null); // 유효하지 않은 상품 제거

        if (productsToPurchase.length === 0) {
            alert("선택된 상품이 유효하지 않습니다.");
            return;
        }

        navigate("/order/create", { state: { products: productsToPurchase } });
    };


    // 상품 삭제 처리 함수
    const handleDeleteCart = async (cdno) => {
        try {
            await onDelete(cdno); // CartPage에서 전달받은 onDelete 함수 호출 (deleteCart API 포함)
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    }

    const handleUpdateQty = async (cdno, quantity) => {
        try {
            await onUpdate(cdno, quantity); // CartPage에서 전달받은 onDelete 함수 호출
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    }
    const handleMinusQty = async (cdno, quantity) => {
        if (quantity > 1) {
            await handleUpdateQty(cdno, --quantity)
        }
    }
    const handlePlusQty = async (cdno, quantity) => {
        await handleUpdateQty(cdno, ++quantity)
    }

    return (
        <div className="cart-container">
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.cdno} className="cart-item">
                        <div className="cart-item-details">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        className="cart-item-checkbox"
                                        onChange={() => handleCheckboxChange(item)}
                                        checked={checkedProducts.some(checkedItem => checkedItem.product === item.product)}
                                    />
                                    <h3 className="text-lg font-semibold truncate">{item.product.pname}</h3>
                                </div>
                                <button
                                    className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                    onClick={() => handleDeleteCart(item.cdno)}
                                >
                                    X
                                </button>
                            </div>
                            <div className="flex items-center py-3">
                                <div className="cart-item-image p-2">
                                    <p>
                                        {item.product.imageFiles && item.product.imageFiles.length > 0 && item.product.imageFiles[0].fileName
                                            ? <img src={`path/to/images/${item.product.imageFiles[0].fileName}`}
                                                   alt={item.product.pname}/>
                                            : <span className="no-image">No Image</span>}
                                    </p>
                                </div>
                                <p className="cart-item-price">Price: {item.product.price.toLocaleString()} 원</p>
                            </div>
                            <div className="flex items-center py-1 border-2 border-black-500 max-w-30">
                                <button
                                    className="w-6"
                                    onClick={() => handleMinusQty(item.cdno, item.quantity)}>-</button>
                                <p className="cart-item-quantity">{item.quantity}개</p>
                                <button
                                    className="w-6"
                                    onClick={() => handlePlusQty(item.cdno, item.quantity)}>+</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-amount-container">
                <h4 className="total-amount">총 합계: {totalAmount.toLocaleString()} 원</h4>
            </div>
            <button className="purchase-button" onClick={handlePurchaseClick}
                    disabled={checkedProducts.length === 0}>구매하기
            </button>
        </div>
    );
}

export default CartDetailListComponent;
