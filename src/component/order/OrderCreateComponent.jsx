import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {preParePayment} from '../../api/orderAPI.js';
import useOrderStore from "../../store/useOrderStore.js";

const OrderCreateComponent = () => {
    const {state} = useLocation();

    // 상품 정보 초기화
    const products = state?.products || [];
    const productInfo = products.map((item) => ({
        productId: item.productId || 0,
        pname: item.pname || "Unknown",
        price: item.price || 0,
        quantity: item.quantity || 1,
        thumFileNames: item.thumFileNames|| "/images/star_1.svg",
    }));

    // 사용자 입력 상태
    const [customerId, setCustomerId] = useState('customer0@aaa.com'); // 고객 ID 추가
    const [customerName, setCustomerName] = useState('customer0'); // 고객 이름
    const [phoneNumber, setPhoneNumber] = useState('010-3267-2442');
    const [deliveryAddress, setDeliveryAddress] = useState('부산광역시 부산진구 양정동');
    const [deliveryMessage, setDeliveryMessage] = useState('아이가 친절해');
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
            thumFileNames: item.thumFileNames || ["기본이미지.jpg"],
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
            // 올바른 Zustand 상태 업데이트 방법
            useOrderStore.getState().setPurchaseDTO(purchaseDTO);

            // 콘솔로 상태 확인
            console.log('현재 스토어 상태:', useOrderStore.getState());
            console.dir(useOrderStore.getState())
            alert("잠깐 정지")

            await handlePayReady(totalPrice);
        } catch (error) {
            const errorMsg = error.response?.data?.message || '주문 생성에 실패했습니다. 다시 시도해주세요.';
            setErrorMessage(errorMsg);
        }
    };

    const handlePayReady = async (price) => {
        try {
            const res = await preParePayment(price); // 비동기 호출 처리
            console.log(res);
            const redirectUrl = res.data.next_redirect_mobile_url; // 모바일 결제 URL
            window.location.href = redirectUrl; // 외부 URL로 리디렉션
        } catch (error) {
            console.error("결제 준비 중 오류:", error);
        }
    };

    return (
        <div className="bg-bara_gray_1 min-h-screen px-1 py-6 flex justify-center">
            <div className="w-full max-w-lg bg-white  shadow-md px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-semibold text-bara_sodomy mb-6 text-center">주문 정보를 입력해주세요</h2>

                        {/* 상품 정보 표시 */}

                        {/* 고객 정보 입력 */}
                        <div className="space-y-4">
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

                            <div className="mb-6 ">
                                <h3 className="text-lg font-medium text-bara_sodomy mb-4">선택한 상품</h3>
                                <div className="space-y-4">
                                    {productInfo.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center border border-bara_gray-3 rounded-[0.5rem] p-4 py-4 shadow-sm"
                                        >

                                            <img
                                                src={`/images/${item.thumFileNames[0]}`} // 상품 이미지
                                                alt={item.thumFileNames[0] || '상품 이미지'}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div className="flex flex-col flex-1">
                                                <p className="text-sm font-medium text-bara_sodomy line-clamp-2">{item.pname || '상품명 없음'}</p>
                                                <p className="text-sm text-bara_gray-5">
                                                    {item.price?.toLocaleString() || 0}원 x {item.quantity || 0}개
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-bara_sodomy">
                                                {(item.price * item.quantity).toLocaleString()}원
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-lg font-medium text-bara_sodomy mt-6">
                                    총 가격: <span className="text-bara_blue">{totalPrice.toLocaleString()}원</span>
                                </p>
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bara_blue text-white py-4 rounded-[0.5rem] text-sm font-medium mt-4"
                        >
                            결제하기
                        </button>

                    </form>

                {errorMessage && (
                    <div className="text-center mt-4 text-bara_pink">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default OrderCreateComponent;
