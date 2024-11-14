import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import { getProductOne } from "../../api/productAPI.js";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";

function ProductReadPage() {
    const { pno } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductOne(pno);
                setProducts([productData]); // products 배열에 데이터 추가
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [pno]);

    const handlePurchaseClick = (product) => {
        navigate("/order/create", { state: { products: [product] } });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <NaviBarShop />
            <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
                <ProductReadComponent products={products} />
                <div className="text-center mt-4">
                    <button
                        onClick={() => handlePurchaseClick(products[0])} // 첫 번째 제품 선택
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        구매하기
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductReadPage;
