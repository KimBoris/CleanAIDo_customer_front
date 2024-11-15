import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderCreateComponent = ({ onSubmit, customerInfo, productInfo }) => {
    const [customerId, setCustomerId] = useState(customerInfo.customerId || '');
    const [phoneNumber, setPhoneNumber] = useState(customerInfo.phoneNumber || '');
    const [deliveryAddress, setDeliveryAddress] = useState(customerInfo.address || '');
    const [deliveryMessage, setDeliveryMessage] = useState('');

    // productInfo 배열의 상품 정보를 기반으로 총 가격 계산
    const totalPrice = productInfo.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 주문할 각 상품의 정보를 orderDetails 배열로 생성
        const orderDetails = productInfo.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const purchaseDTO = {
            customerId,
            phoneNumber,
            deliveryAddress,
            deliveryMessage,
            totalPrice,
            orderDetails
        };

        onSubmit(purchaseDTO); // 전달된 onSubmit 함수 호출
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <label>고객 ID:</label>
            <input type="text" value={customerId} readOnly />

            <label>전화번호:</label>
            <input type="text" value={phoneNumber} readOnly />

            <label>주소:</label>
            <input type="text" value={deliveryAddress} readOnly />

            <label>배송 메시지:</label>
            <input
                type="text"
                value={deliveryMessage}
                onChange={(e) => setDeliveryMessage(e.target.value)}
            />

            <label>선택한 상품:</label>
            <ul>
                {productInfo.map((item, index) => (
                    <li key={index}>
                        {item.productName} - {item.price.toLocaleString()}원 x {item.quantity}개
                    </li>
                ))}
            </ul>

            <label>총 가격:</label>
            <input type="text" value={totalPrice.toLocaleString()} readOnly />

            <button type="submit">주문하기</button>
        </form>
    );
};

OrderCreateComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    customerInfo: PropTypes.shape({
        customerId: PropTypes.string,
        phoneNumber: PropTypes.string,
        address: PropTypes.string
    }).isRequired,
    productInfo: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired
        })
    ).isRequired,
};

export default OrderCreateComponent;
