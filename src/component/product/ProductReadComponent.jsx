import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addCart, getProductOne } from "../../api/productAPI.js";
import CarouselComponent from "../common/CarouselComponent.jsx";
import ReviewByProductComponent from "../review/ReviewByProductComponent.jsx";

function ProductReadComponent() {
    const { pno } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectQnt, setSelectQnt] = useState(false);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    // 상품 정보 불러오기
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result = await getProductOne(pno);
                setProduct(result);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [pno]);

    // 장바구니 추가
    const handleAddCartClick = async () => {
        try {
            await addCart(pno, qty); // customerId 제거
            setShowModal(true);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };

    // 구매하기 버튼
    const handlePurchaseClick = () => {
        const productToPurchase = {
            productId: product.pno,
            pname: product.pname,
            price: product.price,
            quantity: qty,
            thumFileNames: product.thumFileNames,
        };
        navigate("/mypage/order/create", { state: { products: [productToPurchase] } });
    };

    const handleMoveCartClick = () => navigate("/cart");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="pb-40 text-bara_sodomy mt-[9rem]">
            <div>
                <div key={product.pno} className="grid grid-cols-1 md:grid-cols-2 mb-4">
                    {/* 이미지 캐러셀 */}
                    <div className="w-full aspect-square bg-bara_gray_3 overflow-hidden">
                        <CarouselComponent images={product.thumFileNames} />
                    </div>

                    {/* 상품 정보 */}
                    <div className="mb-4 bg-white px-8 py-8">
                        <h2 className="text-[1.2rem]">{product.pname}</h2>
                        <p className="text-2xl font-semibold text-bara_blue">
                            {product.price.toLocaleString()} 원
                        </p>
                    </div>

                    {/* 상세 이미지 */}
                    <div className="bg-white px-8 py-8 mb-4">
                        <h3 className="text-[1.2rem] font-bold">상품 정보</h3>
                        {product.detailFileNames.map((fileName, index) => (
                            <img key={index} src={fileName} alt="상세 이미지" />
                        ))}
                    </div>

                    {/* 리뷰 */}
                    <div className="bg-white px-8 py-8">
                        <h3 className="text-[1.2rem] font-bold">리뷰</h3>
                        <ReviewByProductComponent pno={pno} />
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 w-full bg-white px-8 py-4 shadow-md flex justify-between">
                <button
                    onClick={() => setSelectQnt(true)}
                    className="w-full py-4 bg-bara_blue text-white rounded"
                >
                    구매하기
                </button>
            </div>

            {/* 수량 체크 및 장바구니 추가, 구매하기 */}
            {selectQnt && (
                <div
                    className="fixed bottom-0 left-0 w-full bg-white text-bara_sodomy px-8"
                    style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    {/* 닫기 버튼 */}
                    <img
                        src="/images/close.svg"
                        className="ml-auto w-4 mt-8 cursor-pointer"
                        onClick={() => setSelectQnt(false)}
                        alt="close"
                    />

                    {/* 수량 선택 */}
                    <div>
                        <div className="bg-bara_gray_1 flex p-4 mt-4 justify-between">
                            <span>수량</span>
                            <div>
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="px-2 bg-bara_gray_2"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || 1)))}
                                    className="w-8 text-center"
                                />
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="px-2 bg-bara_gray_2"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <hr className="border-bara_gray_2 my-4" />

                        {/* 총 수량 및 가격 */}
                        <div className="flex justify-between mb-4 font-bold">
                            <span>총 {qty}개</span>
                            <span>{product.price * qty}원</span>
                        </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex gap-4 mb-12">
                        <button
                            onClick={() => handleAddCartClick(product.pno, qty)}
                            className="w-full bg-bara_sky_blue py-4 text-white rounded-[0.5rem]"
                        >
                            장바구니에 담기
                        </button>
                        <button
                            onClick={() => handlePurchaseClick(product, qty)}
                            className="w-full bg-bara_blue py-4 text-white rounded-[0.5rem]"
                        >
                            구매하기
                        </button>
                    </div>
                </div>
            )}


            {/* 모달 디자인 */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-lg font-bold mb-4">장바구니에 담았습니다!</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={handleMoveCartClick}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                            >
                                장바구니로 가기
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductReadComponent;
