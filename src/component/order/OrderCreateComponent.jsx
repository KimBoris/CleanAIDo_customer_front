import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../../api/orderAPI.js';

const OrderCreateComponent = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    // 상품 정보 초기화
    const products = state?.products || [];
    const productInfo = products.map((item) => ({
        productId: item.pno || item.product?.pno,
        pname: item.pname || item.product?.pname,
        price: item.price || item.product?.price,
        quantity: item.quantity || 1,
    }));

    // 사용자 입력 상태
    const [customerId, setCustomerId] = useState(''); // 고객 ID 추가
    const [customerName, setCustomerName] = useState(''); // 고객 이름
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryMessage, setDeliveryMessage] = useState('');
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 총 가격 계산
    const totalPrice = productInfo.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
    );

    // 주문 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderDetails = productInfo.map((item) => ({
            productId: item.productId || 0,
            quantity: item.quantity || 0,
            price: item.price || 0,
        }));

        // 주문 생성 요청에 customerId와 customerName 둘 다 전달
        const purchaseDTO = {
            customerId, // 고객 ID 전달
            customerName, // 고객 이름 전달
            phoneNumber,
            deliveryAddress,
            deliveryMessage,
            totalPrice,
            orderDetails,
        };

        try {
            await createOrder(purchaseDTO);
            setOrderCompleted(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message || '주문 생성에 실패했습니다. 다시 시도해주세요.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="bg-bara_gray_1 min-h-screen px-1 py-6 flex justify-center">
            <div className="w-full max-w-lg bg-white rounded-[0.5rem] shadow-md px-8 py-6">
                <h2 className="text-xl font-medium text-bara_sodomy mb-4">주문 정보를 입력해주세요</h2>

                {/* 상품 정보 표시 */}
                <div className="mb-4">
                    <p className="text-lg font-medium text-bara_sodomy mb-2">선택한 상품:</p>
                    <ul className="list-disc list-inside text-bara_gray-5">
                        {productInfo.map((item, index) => (
                            <li key={index}>
                                {item.pname || '상품명 없음'} - {item.price?.toLocaleString() || 0}원 x{' '}
                                {item.quantity || 0}개
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg font-medium text-bara_sodomy mt-4">
                        총 가격: {totalPrice.toLocaleString()}원
                    </p>
                </div>

                {!orderCompleted && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 고객 ID 입력 */}
                        <div>
                            <label className="block text-bara_sodomy font-medium mb-2">고객 ID</label>
                            <input
                                type="text"
                                name="customerId"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                                placeholder="고객 ID를 입력하세요"
                                required
                            />
                        </div>
                        {/* 고객 이름 입력 */}
                        <div>
                            <label className="block text-bara_sodomy font-medium mb-2">고객 이름</label>
                            <input
                                type="text"
                                name="customerName"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                                placeholder="고객 이름을 입력하세요"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-bara_sodomy font-medium mb-2">전화번호</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                                placeholder="전화번호를 입력하세요"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-bara_sodomy font-medium mb-2">주소</label>
                            <input
                                type="text"
                                name="deliveryAddress"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                                placeholder="주소를 입력하세요"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-bara_sodomy font-medium mb-2">배송 메시지</label>
                            <input
                                type="text"
                                name="deliveryMessage"
                                value={deliveryMessage}
                                onChange={(e) => setDeliveryMessage(e.target.value)}
                                className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                                placeholder="배송 메시지를 입력하세요"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bara_blue text-white py-4 rounded-[0.5rem] text-sm font-medium"
                        >
                            주문하기
                        </button>
                    </form>
                )}

                {orderCompleted && (
                    <div className="text-center mt-6">
                        <p className="text-bara_gray-5 font-medium mb-4">주문이 성공적으로 완료되었습니다!</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/order/list')}
                                className="w-full py-4 bg-bara_light_blue text-white rounded-[0.5rem] text-sm font-medium"
                            >
                                주문 내역 보러가기
                            </button>
                            <button
                                onClick={() => navigate('/product/list')}
                                className="w-full py-4 bg-bara_sky_blue text-white rounded-[0.5rem] text-sm font-medium"
                            >
                                상품 보러가기
                            </button>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="text-center mt-4 text-bara_pink">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default OrderCreateComponent;
