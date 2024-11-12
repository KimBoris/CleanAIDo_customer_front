import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderForm = ({ onSubmit }) => {
    const [customerId, setCustomerId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryMessage, setDeliveryMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [productId, setProductId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseDTO = {
            customerId,
            phoneNumber,
            deliveryAddress,
            deliveryMessage,
            totalPrice: parseInt(totalPrice, 10),
            productId: parseInt(productId, 10)  // 추가된 부분
        };

        onSubmit(purchaseDTO);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product ID:</label>
                <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

OrderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default OrderForm;
