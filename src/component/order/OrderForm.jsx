import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderForm = ({ onSubmit, customerInfo, productInfo }) => {
    const [customerId, setCustomerId] = useState(customerInfo.customerId || '');
    const [phoneNumber, setPhoneNumber] = useState(customerInfo.phoneNumber || '');
    const [deliveryAddress, setDeliveryAddress] = useState(customerInfo.address || '');
    const [deliveryMessage, setDeliveryMessage] = useState('');
    const [productId, setProductId] = useState(productInfo.productId || '');
    const [totalPrice, setTotalPrice] = useState(productInfo.totalPrice || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseDTO = {
            customerId,
            phoneNumber,
            deliveryAddress,
            deliveryMessage,
            totalPrice: parseInt(totalPrice, 10),
            orderDetails: [{ productId: parseInt(productId, 10), quantity: 1 }]
        };

        onSubmit(purchaseDTO);
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <label>고객 ID:</label>
            <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                readOnly
            />

            <label>전화번호:</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                readOnly
            />

            <label>주소:</label>
            <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                readOnly
            />

            <label>배송 메시지:</label>
            <input
                type="text"
                value={deliveryMessage}
                onChange={(e) => setDeliveryMessage(e.target.value)}
            />

            <label>상품 번호:</label>
            <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                readOnly
            />

            <label>총 가격:</label>
            <input
                type="text"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                readOnly
            />

            <button type="submit">주문하기</button>
        </form>
    );
};

OrderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    customerInfo: PropTypes.shape({
        customerId: PropTypes.string,
        phoneNumber: PropTypes.string,
        address: PropTypes.string
    }).isRequired,
    productInfo: PropTypes.shape({
        productId: PropTypes.string,
        totalPrice: PropTypes.number
    }).isRequired,
};

export default OrderForm;
