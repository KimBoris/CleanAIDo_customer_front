import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { preParePayment } from '../../api/orderAPI.js';
import useOrderStore from '../../store/useOrderStore.js';

const OrderCreateComponent = () => {
    const { state } = useLocation();

    // 상품 정보 초기화
    const products = state?.products || [];
    const productInfo = products.map((item) => ({
        productId: item.productId || 0,
        pname: item.pname || 'Unknown',
        price: item.price || 0,
        quantity: item.quantity || 1,
        thumFileNames: item.thumFileNames || '/images/star_1.svg',
    }));

    // 사용자 정보 상태
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryMessage, setDeliveryMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 총 가격 계산
    const totalPrice = productInfo.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
    );

    // 고객 정보 가져오기
    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                const response = await axios.get(
                    'http://10.10.10.151:8080/api/v1/customer/info',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    }
                );

                const { customerId, customerName, phoneNumber, address } = response.data;
                setCustomerId(customerId);
                setCustomerName(customerName);
                setPhoneNumber(phoneNumber);
                setDeliveryAddress(address);
            } catch (error) {
                console.error('Error fetching customer info:', error);
                setErrorMessage('고객 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchCustomerInfo();
    }, []);

    // 주문 처리
    const handleClickPay = async () => {
        const orderDetails = productInfo.map((item) => ({
            productId: item.productId || 0,
            quantity: item.quantity || 0,
            price: item.price || 0,
            thumFileNames: item.thumFileNames || ['기본이미지.jpg'],
        }));

        const purchaseDTO = {
            customerId,
            customerName,
            phoneNumber,
            deliveryAddress,
            deliveryMessage,
            totalPrice,
            orderDetails,
        };

        try {
            useOrderStore.getState().setPurchaseDTO(purchaseDTO);
            await handlePayReady(totalPrice);
        } catch (error) {
            const errorMsg = error.response?.data?.message || '주문 생성에 실패했습니다.';
            setErrorMessage(errorMsg);
        }
    };

    const handlePayReady = async (price) => {
        try {
            const res = await preParePayment(price);
            const redirectUrl = res.data.next_redirect_mobile_url;
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('결제 준비 중 오류:', error);
        }
    };

    return (
        <div className="bg-bara_gray_1 min-h-screen pt-4 pb-40 mt-[9rem]">
            <div className="bg-white px-8 py-6 text-bara_sodomy mb-4">
                <h3 className="text-[1.2rem] font-bold">배송지</h3>
                <hr className="my-4 border-bara_gray_3" />

                {/* 고객 정보 입력 */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-bara_sodomy font-medium mb-2">수령인</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                            placeholder="수령인 이름"
                        />
                    </div>
                    <div>
                        <label className="block text-bara_sodomy font-medium mb-2">휴대폰</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                            placeholder="휴대폰 번호"
                        />
                    </div>
                    <div>
                        <label className="block text-bara_sodomy font-medium mb-2">주소지</label>
                        <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                            placeholder="배송 주소"
                        />
                    </div>
                    <div>
                        <label className="block text-bara_sodomy font-medium mb-2">배송 메시지</label>
                        <input
                            type="text"
                            value={deliveryMessage}
                            onChange={(e) => setDeliveryMessage(e.target.value)}
                            className="w-full border border-bara_gray-3 rounded-[0.5rem] p-4 text-bara_sodomy"
                            placeholder="배송 메시지"
                        />
                    </div>
                </div>
            </div>

            {/* 주문 상품 목록 */}
            <div className="bg-white px-8 py-6 text-bara_sodomy mb-4">
                <h3 className="text-[1.2rem] font-bold">주문 상품</h3>
                <hr className="my-4 border-bara_gray_3" />
                <div className="space-y-4">
                    {productInfo.map((item, index) => (
                        <div key={index} className="flex items-center shadow-sm">
                            <div className="bg-bara_gray_4 w-20 h-20 overflow-hidden mr-4">
                                <img
                                    src={`/images/${item.thumFileNames[0]}`}
                                    alt={item.thumFileNames[0] || '상품 이미지'}
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-sm font-medium line-clamp-1">{item.pname}</p>
                                <p className="text-sm text-bara_gray-5">
                                    {item.price.toLocaleString()}원 | {item.quantity}개
                                </p>
                                <p className="text-sm font-bold">
                                    {(item.price * item.quantity).toLocaleString()}원
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 결제 정보 */}
            <div className="bg-white px-8 py-6 text-bara_sodomy">
                <div className="flex justify-between">
                    <h3 className="text-[1.2rem] font-bold">결제 금액</h3>
                    <div className="text-bara_blue text-[1.2rem] font-bold">
                        {totalPrice.toLocaleString()}원
                    </div>
                </div>
                <hr className="my-4 border-bara_gray_3" />
                <div className="flex justify-between mb-2">
                    <div>상품 금액</div>
                    <div>{totalPrice.toLocaleString()}원</div>
                </div>
                <div className="flex justify-between">
                    <div>배송비</div>
                    <div>무료 배송</div>
                </div>
            </div>

            {/* 결제 버튼 */}
            <div
                className="fixed bottom-0 left-0 w-full bg-white text-bara_sodomy px-8"
                style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
            >
                <button
                    onClick={handleClickPay}
                    className="w-full bg-bara_blue text-white py-4 rounded-[0.5rem] mt-4 mb-12"
                >
                    {totalPrice.toLocaleString()}원 결제하기
                </button>
            </div>
        </div>
    );
};

export default OrderCreateComponent;
