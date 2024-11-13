import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/orderApi';
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";

function OrderCreatePage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const [form, setForm] = useState({
        customerId: '',
        phoneNumber: '',
        deliveryAddress: '',
        deliveryMessage: '',
        totalPrice: product ? product.price : '',
        productId: product ? product.pno : '',
        orderDetails: product ? [{ productId: product.pno, quantity: 1 }] : []
    });

    const [orderCompleted, setOrderCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOrder(form); // orderApi.js의 createOrder 사용
            setOrderCompleted(true);
            setErrorMessage('');
            // 폼 초기화
            setForm({
                customerId: '',
                phoneNumber: '',
                deliveryAddress: '',
                deliveryMessage: '',
                totalPrice: product ? product.price : '',
                productId: product ? product.pno : '',
                orderDetails: product ? [{ productId: product.pno, quantity: 1 }] : []
            });
        } catch (error) {
            console.error("Error response:", error.response || error);
            setErrorMessage(error.response?.data?.message || 'Failed to create order. Please try again later.');
        }
    };

    const goToOrderList = () => {
        navigate('/order/list');
    };

    const goToProductList = () => {
        navigate('/product/list');
    };

    return (
        <div className="bg-bara_gray_1 min-h-screen flex flex-col">
            <div className="bg-bara_blue w-full h-[30rem] bg-cover pl-8 pr-8">
                <NaviBarShop />

                <div className="pt-4">
                    <p className="text-white text-[2.8rem] font-sans font-light">
                        <span className="font-sans font-medium">주문 생성</span> 페이지
                    </p>
                </div>
            </div>

            <div className="pl-8 pr-8 mt-10 flex flex-col items-center">
                {orderCompleted ? (
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center text-bara_sodomy">
                        <h2 className="text-2xl font-semibold mb-4">주문이 완료되었습니다!</h2>
                        <div className="mt-6 space-x-4">
                            <button
                                onClick={goToOrderList}
                                className="bg-bara_blue text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                주문 내역 보러 가기
                            </button>
                            <button
                                onClick={goToProductList}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700"
                            >
                                상품 리스트 보러 가기
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-bara_sodomy">
                        <h2 className="text-xl font-semibold mb-4">주문 정보를 입력해주세요</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">고객 ID</label>
                                <input
                                    type="text"
                                    name="customerId"
                                    value={form.customerId}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">전화번호</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">주소</label>
                                <input
                                    type="text"
                                    name="deliveryAddress"
                                    value={form.deliveryAddress}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">배송 메시지</label>
                                <input
                                    type="text"
                                    name="deliveryMessage"
                                    value={form.deliveryMessage}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-bara_blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                주문하기
                            </button>
                        </form>

                        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderCreatePage;
