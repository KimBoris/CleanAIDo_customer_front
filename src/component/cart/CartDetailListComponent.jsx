import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './CartDetailListComponent.css';

function CartDetailListComponent({ cart, onDelete }) {
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
        const productsToPurchase = checkedProducts.map(item => ({
            productId: item.product.pno,
            pname: item.product.pname,
            price: item.product.price,
            quantity: item.quantity
        }));

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

    return (
        <div className="cart-container">
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.cdno} className="cart-item">
                        <div className="cart-item-details">
                            <input
                                type="checkbox"
                                className="cart-item-checkbox"
                                onChange={() => handleCheckboxChange(item)}
                                checked={checkedProducts.some(checkedItem => checkedItem.product === item.product)}
                            />
                            <div className="cart-item-image">
                                <p>
                                    {item.product.imageFiles && item.product.imageFiles.length > 0 && item.product.imageFiles[0].fileName
                                        ? <img src={`path/to/images/${item.product.imageFiles[0].fileName}`} alt={item.product.pname} />
                                        : <span className="no-image">No Image</span>}
                                </p>
                            </div>
                            <div className="cart-item-info">
                                <h3 className="cart-item-name">{item.product.pname}</h3>
                                <p className="cart-item-price">Price: {item.product.price.toLocaleString()} 원</p>
                                <p className="cart-item-quantity">{item.quantity}개</p>
                            </div>
                            <button onClick={() => handleDeleteCart(item.cdno)}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-amount-container">
                <h4 className="total-amount">총 합계: {totalAmount.toLocaleString()} 원</h4>
            </div>
            <button className="purchase-button" onClick={handlePurchaseClick} disabled={checkedProducts.length === 0}>구매하기</button>
        </div>
    );
}

CartDetailListComponent.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            cdno: PropTypes.number.isRequired,
            product: PropTypes.shape({
                pname: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                imageFiles: PropTypes.arrayOf(
                    PropTypes.shape({
                        ord: PropTypes.number,
                        fileName: PropTypes.string,
                        type: PropTypes.bool,
                    })
                ),
            }).isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired, // 삭제 처리 함수 prop 타입 정의
};

export default CartDetailListComponent;
