import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";

function OrderCreatePage() {
    const { state } = useLocation();
    const product = state?.product;

    const [form, setForm] = useState({
        customerId: '',
        phoneNumber: '',
        deliveryAddress: '',
        deliveryMessage: '',
        totalPrice: product ? product.price : '',
        productId: product ? product.id : '' // 상품 ID 추가
    });

    const [successMessage, setSuccessMessage] = useState('');
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
            const response = await axios.post('http://localhost:8080/api/v1/order/create', {
                ...form,
                productNumber: product ? product.pno : null // 선택된 상품의 번호를 추가
            });
            setSuccessMessage(`Order created successfully! Order ID: ${response.data.orderNumber}`);
            setErrorMessage('');
            setForm({
                customerId: '',
                phoneNumber: '',
                deliveryAddress: '',
                deliveryMessage: '',
                totalPrice: ''
            });
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response);
                setErrorMessage(`Failed to create order: ${error.response.data.message}`);
            } else {
                console.error("Error message:", error.message);
                setErrorMessage('Failed to create order. Please try again later.');
            }
            setSuccessMessage('');
        }
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
                {product && (
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-bara_sodomy mb-6">
                        <h2 className="text-xl font-semibold mb-2">선택한 상품</h2>
                        <p className="font-medium">상품명: {product.pname}</p>
                        <p className="text-gray-600">가격: {product.price}원</p>
                    </div>
                )}

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
                        <div>
                            <label className="block font-medium">총 가격</label>
                            <input
                                type="number"
                                name="totalPrice"
                                value={form.totalPrice}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bara_blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            주문하기
                        </button>
                    </form>

                    {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
                    {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
                </div>
            </div>

            <TabBarShop />
        </div>
    );
}

export default OrderCreatePage;
