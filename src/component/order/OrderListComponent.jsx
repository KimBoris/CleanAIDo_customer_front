import { useState, useEffect } from "react";
import { fetchOrders, updateOrderStatus } from "../../api/OrderAPI";
import { useNavigate } from "react-router-dom";

const OrderListComponent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // 주문 목록 불러오기
    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await fetchOrders();
            setOrders(
                response.data.map((order) => ({
                    orderNumber: order.orderNumber,
                    orderDate: new Date(order.orderDate).toLocaleDateString(),
                    totalPrice: order.totalPrice,
                    orderStatus: order.orderStatus,
                    orderDetails: order.orderDetails.map((detail) => ({
                        productId: detail.productId,
                        productName: detail.productName,
                        productImage:
                            detail.productImage || "/images/default-product.png",
                        quantity: detail.quantity,
                        price: detail.price,
                    })),
                }))
            );
        } catch (error) {
            console.error("Error loading orders:", error);
            setError("주문 정보를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 상태 변경 처리
    const handleStatusChange = async (orderNumber, status) => {
        try {
            await updateOrderStatus(orderNumber, status);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderNumber === orderNumber
                        ? { ...order, orderStatus: status }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("상태 변경에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 리뷰 작성 버튼
    const handleClickReview = (orderDetails) => {
        const productNumbers = orderDetails.map(detail => Number(detail.productId));
        console.log(productNumbers);
        navigate("/mypage/review/register", { state: { productNumbers } });
    };

    // 고객 정보 가져오고 주문 목록 불러오기
    useEffect(() => {
        const initializeData = async () => {
            await loadOrders(); // 고객 정보 가져오기
        };
        initializeData();
    }, []);

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;
    if (orders.length === 0) return <div className="text-center text-xl">No orders found</div>;

    return (
        <div className="bg-bara_gray_1 min-h-screen pt-4 pb-40 mt-[9rem]">
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li key={order.orderNumber} className="bg-white px-8 py-6">
                        {/* 주문 상태 및 날짜 */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-bara_gray_4 text-[0.8rem]">
                                {order.orderDate || "날짜 없음"}
                            </p>
                            <p className="text-bara_sodomy text-[0.8rem]">
                                {order.orderStatus || "상태 없음"}
                            </p>
                        </div>

                        {/* 주문 세부사항 */}
                        {order.orderDetails.map((detail) => (
                            <div key={detail.productId} className="flex items-center mb-4">
                                <div className="w-20 h-20 flex-shrink-0 mr-4 bg-bara_gray_4">
                                    <img
                                        src={`https://bucket-cleanaido.s3.ap-northeast-2.amazonaws.com/${detail.productImage[0]}`}
                                        alt={detail.productName || "상품 이미지"}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-bara_sodomy mb-1">
                                        {detail.productName || "상품명 없음"}
                                    </h3>
                                    <p className="text-bara_gray_5 mb-1 text-[0.8rem]">
                                        수량: {detail.quantity || 0}개
                                    </p>
                                    <p className="text-bara_blue font-bold mb-1">
                                        {(detail.price || 0).toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* 상태 변경 버튼 */}
                        <div className="flex space-x-2 mb-2">
                            <button
                                onClick={() => handleStatusChange(order.orderNumber, "교환")}
                                className="w-full px-4 py-2 bg-white border-bara_blue border text-bara_sodomy rounded-[0.5rem]"
                            >
                                교환
                            </button>
                            <button
                                onClick={() => handleStatusChange(order.orderNumber, "환불")}
                                className="w-full px-4 py-2 bg-white border-bara_blue border text-bara_sodomy rounded-[0.5rem]"
                            >
                                환불
                            </button>
                            <button
                                onClick={() => handleStatusChange(order.orderNumber, "취소")}
                                className="w-full px-4 py-2 bg-white border-bara_blue border text-bara_sodomy rounded-[0.5rem]"
                            >
                                취소
                            </button>
                        </div>
                        {order.orderStatus == "배송완료" && (
                            <button
                                onClick={() => handleClickReview(order.orderDetails)}
                                className="bg-bara_blue text-white w-full py-4 rounded-[0.5rem]"
                            >
                                리뷰 작성
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderListComponent;

