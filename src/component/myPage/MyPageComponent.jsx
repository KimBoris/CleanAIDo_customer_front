import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewsByCustomer } from "../../api/reviewAPI.js";
import { getFreqProductList } from "../../api/productAPI.js";
import { fetchOrders } from "../../api/OrderAPI.js";
import { fetchCustomerInfo } from "../../api/customerAPI.js";

function MyPageComponent() {
    const [reviewCount, setReviewCount] = useState(0);
    const [freqProduct, setFreqProduct] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerName, setCustomerName] = useState("사용자"); // 기본값 설정
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태

    // 고객 정보 가져오기
    useEffect(() => {
        const loadCustomerInfo = async () => {
            try {
                const data = await fetchCustomerInfo(); // API 호출
                setCustomerName(data.customerName); // 사용자 이름 설정
            } catch (error) {
                console.error("Error fetching customer info:", error);
                setErrorMessage("고객 정보를 불러오는 데 실패했습니다.");
            }
        };

        loadCustomerInfo();
    }, []);

    // 리뷰 개수 가져오기
    const fetchReviewCount = async () => {
        try {
            const res = await getReviewsByCustomer();
            setReviewCount(res.totalCount);
        } catch (error) {
            console.error("리뷰 개수 가져오기 실패:", error);
        }
    };

    // 자주 구매한 상품 가져오기
    const fetchListFreqProduct = async () => {
        try {
            const res = await getFreqProductList(1, 5);
            setFreqProduct(res.dtoList);
        } catch (error) {
            console.error("자주 구매한 상품 가져오기 실패:", error);
        }
    };

    // 주문 개수 및 총 금액 가져오기
    const fetchOrderCount = async () => {
        try {
            const res = await fetchOrders();
            setOrderCount(res.data.length);

            const total = res.data.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalPrice(total);
        } catch (error) {
            console.error("주문 개수 가져오기 실패:", error);
        }
    };

    // 데이터 불러오기
    useEffect(() => {
        fetchReviewCount();
        fetchListFreqProduct();
        fetchOrderCount();
    }, []);

    return (
        <div>
            <div className="pb-40 text-bara_sodomy mt-[9rem] bg-bara_gray_1">
                {/* 고객 이름 */}
                <div className="px-8 pt-8 text-[1.2rem] pb-4">
                    {errorMessage ? (
                        <span className="text-red-500">{errorMessage}</span>
                    ) : (
                        <b>{customerName}</b>
                    )}
                    님, 반갑습니다!
                </div>

                {/* 대시보드 */}
                <div className="bg-white py-4 px-8 mb-4">
                    <div className="bg-bara_gray_1 rounded-[0.5rem] w-full h-28 flex justify-between items-center p-8 relative">
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.2rem]">
                                {
                                    totalPrice >= 10000?
                                        <span>{Math.floor(totalPrice/10000)}만원</span>
                                        :
                                        <span>{totalPrice}원</span>
                                }
                            </p>
                            <p className="text-[0.9rem]">총결제액</p>
                        </div>

                        {/* 세로선 */}
                        <div
                            className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-bara_gray_3"></div>

                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.2rem]">{orderCount}건</p>
                            <p className="text-[0.9rem]">총구매수</p>
                        </div>

                        {/* 세로선 */}
                        <div
                            className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-bara_gray_3"></div>

                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.2rem]">{reviewCount}건</p>
                            <p className="text-[0.9rem]">후기작성</p>
                        </div>
                    </div>


                    {/* 메뉴 */}
                    <div className="flex justify-between mt-8">
                        <Link to="order/list">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_order_list.svg" className="w-[2.25rem]"/>
                                <span>주문내역</span>
                            </div>
                        </Link>
                        <Link to="">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_wish_list.svg" className="w-[2.25rem]"/>
                                <span>찜한목록</span>
                            </div>
                        </Link>
                        <Link to="review/list">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_review_list.svg" className="w-[2.25rem]"/>
                                <span>리뷰관리</span>
                            </div>
                        </Link>
                        <Link to="">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_edit_info.svg" className="w-[2.25rem]"/>
                                <span>정보수정</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-8">
                    <h3 className="text-[1.2rem] font-bold">자주 구매한 상품</h3>
                    <hr className="my-4 border-bara_gray_3"/>
                    <div className="flex flex-wrap max-w-full overflow-x-auto">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                {freqProduct.map((product) => (
                                    <>
                                        <Link to={`/product/read/${product.pno}`} className="flex w-full">
                                            <div key={product.pno} className="w-40 flex-shrink-0 flex flex-col">
                                                <div className="w-40 h-40 bg-bara_gray_3 flex-shrink-0">
                                                    <img src={product.fileName} alt={product.pname}
                                                         className="w-full h-full object-cover"/>
                                                </div>
                                                <div className="mt-2">
                                                    <h4 className="">{product.pname}</h4>
                                                    <p className="text-bara_blue text-[1.2rem] font-bold">{product.price.toLocaleString()}원</p>
                                                    {product.reviewCount > 0 && (
                                                        <div className="flex items-center -mt-0">
                                                            <img src={`/images/star_${product.score}.svg`} />
                                                            <span className="ml-1 text-md text-bara_gray_4">({product.reviewCount})</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageComponent;