import { useState, useEffect } from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import { useParams, useNavigate } from "react-router-dom";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import { addCart, getProductOne } from "../../api/productAPI.js";

function ProductReadPage() {
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
            <NaviBarShop />
            <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
                <ProductReadComponent products={products} />
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
            </div>
        </>
    );
}

export default ProductReadPage;
