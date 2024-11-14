import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function CartDetailListComponent({ cart }) {
    const navigate = useNavigate();
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleCheckboxChange = (item) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.some(product => product.product.pno === item.product.pno)) {
                // 이미 선택된 경우 배열에서 제거
                return prevCheckedProducts.filter(product => product.product.pno !== item.product.pno);
            } else {
                // 선택되지 않은 경우 배열에 추가
                return [...prevCheckedProducts, item];
            }
        });
    };

    const handlePurchaseClick = () => {
        console.log("Selected products for purchase:", checkedProducts);
        navigate("/order/create", { state: { products: checkedProducts } });
    };

    return (
        <div>
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.cdno} className="cart-item">
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(item)}
                            checked={checkedProducts.some(product => product.product.pno === item.product.pno)}
                        />
                        <p>
                            {item.product.imageFiles && item.product.imageFiles.length > 0
                                ? item.product.imageFiles[0].fileName
                                : "No Image"}
                        </p>
                        <h3>{item.product.pname}</h3>
                        <p>Price: {item.product.price.toLocaleString()} 원</p>
                        <p>Quantity: {item.quantity}개</p>
                    </li>
                ))}
            </ul>
            <div className="total-amount">
                <h4>선택한 상품 총 합계: {checkedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString()} 원</h4>
            </div>
            <button onClick={handlePurchaseClick} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                구매하기
            </button>
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
};

export default CartDetailListComponent;