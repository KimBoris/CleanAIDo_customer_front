import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addCart, getProductOne} from "../../api/productAPI.js";
import CarouselComponent from "../common/CarouselComponent.jsx";
import ReviewByProductComponent from "../review/ReviewByProductComponent.jsx";

function ProductReadComponent() {

    const { pno } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const [selectQnt, setSelectQnt] = useState(false);
    const [qnt, setQnt] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                await getProductOne(pno).then(result => {
                    setProduct(result);
                    setLoading(false);
                })
                console.log("====================Product List ==================")
                console.log(product);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product');
                setLoading(false);
            }
        };

        loadProduct();
    }, [pno]);


    const handlePurchaseClick = (product) => {
        navigate("/order/create", { state: { products: [product] } });
    };

    const handleAddCartClick = (pno) => {
        setLoading(true);
        addCart(pno)
            .then(data => {
                console.log(data);
                setLoading(false);
                setShowModal(true); // 모달 표시
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
                setLoading(false);
            });
    };

    const handleMoveCartClick = () => {
        navigate("/cart");
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    // 수량 증감
    const handleIncrease = () => {
        setQnt(prevQnt => prevQnt + 1); // 수량 증가
    };

    const handleDecrease = () => {
        setQnt(prevQnt => (prevQnt > 1 ? prevQnt - 1 : 1)); // 수량 감소 (최소값 1 유지)
    };

    const handleQntChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // 최소값 1 유지
        setQnt(value);
    };


    return (
        <div className="pb-40 text-bara_sodomy">
            <div>
                <div key={product.pno} className="grid grid-cols-1 md:grid-cols-2 mb-4">
                    <div className="w-full aspect-square bg-bara_gray_3">
                            <CarouselComponent images={product.fileName}/>
                    </div>

                    {/* 별점, 상품명, 가격 */}
                    <div className="mb-4 bg-white px-8 py-8">
                        <img src='/images/star_1.svg' className='ml-auto w-28'
                             alt="Star rating"/>
                        <h2 className="text-[1.2rem]">{product.pname}</h2>
                        <hr className="my-4 border-bara_gray_3" />
                        <p className="text-2xl font-semibold text-bara_blue">{product.price} 원</p>
                    </div>

                    {/* 상세 이미지 */}
                    <div className="bg-white px-8 py-8 mb-4">
                        <h3 className="text-[1.2rem] font-bold">상품 정보</h3>
                        <hr className="my-4 border-bara_gray_3"/>
                        <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                             alt="Detail Image 1"/>
                        <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                             alt="Detail Image 2"/>
                        <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                             alt="Detail Image 3"/>
                    </div>

                    {/* 리뷰 */}
                    <div className="bg-white px-8 py-8">
                        <h3 className="text-[1.2rem] font-bold">리뷰</h3>
                        <hr className="my-4 border-bara_gray_3"/>
                        <ReviewByProductComponent pno={pno}/>
                    </div>

                </div>
            </div>

            <div
                className="
                    fixed bottom-0 left-0 w-full h-28 bg-white text-bara_sodomy flex justify-around items-start px-8
                "
                style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
            >
                <button
                    onClick={() => setSelectQnt(true)}
                    className="w-full py-4 bg-bara_blue text-white rounded-[0.5rem] mt-4"
                >
                    구매하기
                </button>
            </div>


            {/*수량 체크 및 장바구니 추가, 구매하기*/}
            {selectQnt &&
                <div
                    className="fixed bottom-0 left-0 w-full bg-white text-bara_sodomy px-8"
                    style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    <img src="/images/close.svg" className="ml-auto w-4 mt-8" onClick={() => setSelectQnt(false)} />
                    <div>
                        <div className="bg-bara_gray_1 flex p-4 mt-4 justify-between">
                            <span>수량</span>
                            <div>
                                <button onClick={handleDecrease} className="px-2 bg-bara_gray_2">-</button>
                                <input
                                    onChange={handleQntChange}
                                    value={qnt}
                                    type="number"
                                    className="w-8 text-center"
                                />
                                <button onClick={handleIncrease} className="px-2 bg-bara_gray_2">+</button>
                            </div>
                        </div>
                        <hr className="border-bara_gray_2 my-4" />
                        <div className="flex justify-between mb-4 font-bold">
                            <span>총 {qnt}개</span>
                            <span>{product.price * qnt}원</span>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="flex gap-4 mb-12">
                        <button
                            onClick={() => handleAddCartClick(product.pno)}
                            className="w-full bg-bara_sky_blue py-4 text-white rounded-[0.5rem]"
                        >
                            장바구니에 담기
                        </button>
                        <button
                            onClick={() => handlePurchaseClick(product)}
                            className="w-full bg-bara_blue py-4 text-white rounded-[0.5rem]"
                        >
                            구매하기
                        </button>
                    </div>

                </div>
            }

            {/* 모달 */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
                    <h2 className="text-xl font-bold text-center">장바구니에 담았습니다</h2>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={() => handleMoveCartClick()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                            >
                                장바구니로 가기
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
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
