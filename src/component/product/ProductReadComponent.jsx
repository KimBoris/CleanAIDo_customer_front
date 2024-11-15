import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addCart, getProductOne} from "../../api/productAPI.js";

function ProductReadComponent() {

    const { pno } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productData = await getProductOne(pno);
                const productList = Array.isArray(productData) ? productData : [productData]; // 배열로 변환
                setProducts(productList);
                console.log("====================Product List ==================")
                console.log(productList)
                setLoading(false);
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

    return (
        <>
            <div>
                {products.map((product) => (
                    <div key={product.pno} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Carousel images={product.fileName || ['/images/star_1.svg']}/>
                        </div>

                        <div className="flex justify-between m-0">
                            <h2 className="text-xl break-words">{product.pname}</h2>
                            <img src='../../../public/images/star_5.svg' className='ml-2 object-contain h-full'
                                 alt="Star rating"/>
                        </div>

                        <p className="text-2xl font-semibold">{product.price} 원</p>

                        <hr/>
                        <div>
                            <h2 className="text-3xl font-medium p-2">상세 이미지</h2>
                            <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                                 alt="Detail Image 1"/>
                            <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                                 alt="Detail Image 2"/>
                            <img src={product.fileName || "/images/M1.png"} className="w-full h-auto"
                                 alt="Detail Image 3"/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={() => handlePurchaseClick(products[0])} // 첫 번째 제품 선택
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-colors"
                >
                    구매하기
                </button>
                <button
                    onClick={() => handleAddCartClick(products[0].pno)} // 첫 번째 제품 선택
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-colors ml-4"
                >
                    장바구니에 담기
                </button>
            </div>

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
        </>
    );
}

export default ProductReadComponent;
