import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './CartDetailListComponent.css'; // Assuming you have a CSS file for styling

function CartDetailListComponent({ cart }) {
    const navigate = useNavigate();

    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    // State for selected products
    const [checkedProducts, setCheckedProducts] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (item) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.includes(item.product)) {
                // Remove from array if already selected
                return prevCheckedProducts.filter(product => product !== item.product);
            } else {
                // Add to array if not already selected
                return [...prevCheckedProducts, item.product];
            }
        });
    };

    const handlePurchaseClick = () => {
        console.log(checkedProducts);
        navigate("/order/create", { state: { product: checkedProducts } });
    };

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
                                checked={checkedProducts.includes(item.product)}
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
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-amount-container">
                <h4 className="total-amount">총 합계: {totalAmount.toLocaleString()} 원</h4>
            </div>
            <button className="purchase-button" onClick={handlePurchaseClick}>구매하기</button>
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
                        fileName: PropTypes.string, // isRequired removed
                        type: PropTypes.bool,
                    })
                ), // imageFiles is an array of objects
            }).isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CartDetailListComponent;
