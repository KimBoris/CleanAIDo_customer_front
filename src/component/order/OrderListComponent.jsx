import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import OrderCreateComponent from '../../component/order/OrderCreateComponent';

const OrderCreatePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const customerInfo = state?.customerInfo || { customerId: '', phoneNumber: '', address: '' };
    const productInfo = state?.productInfo || { productId: '', totalPrice: 0 };

    const [orderCompleted, setOrderCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOrderSubmit = async (purchaseDTO) => {
        try {
            await axios.post('http://localhost:8080/api/v1/order/create', purchaseDTO);
            setOrderCompleted(true);
            setErrorMessage('');
        } catch (error) {
            console.error("Error response:", error.response);
            setErrorMessage('Failed to create order. Please try again later.');
        }
    };

    const goToOrderList = () => navigate('/order/list');
    const goToProductList = () => navigate('/product/list');

    return (
        <div className="bg-bara_gray_1 min-h-screen flex flex-col">
            <h1>주문 생성 페이지</h1>

            {orderCompleted ? (
                <div className="order-complete-message">
                    <h2>주문이 완료되었습니다!</h2>
                    <button onClick={goToOrderList}>주문 내역 보러 가기</button>
                    <button onClick={goToProductList}>상품 리스트 보러 가기</button>
                </div>
            ) : (
                <OrderCreateComponent
                    onSubmit={handleOrderSubmit}
                    customerInfo={customerInfo}
                    productInfo={productInfo}
                />
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default OrderCreatePage;
