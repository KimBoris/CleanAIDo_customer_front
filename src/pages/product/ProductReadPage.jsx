import { useState, useEffect } from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import { useParams, useNavigate } from "react-router-dom";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import {addCart, getProductOne} from "../../api/productAPI.js";

function ProductReadPage() {
    const { pno } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productData = await getProductOne(pno);
                const productList = Array.isArray(productData) ? productData : [productData]; // 배열로 변환
                setProducts(productList);
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
                console.log(data)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
                setLoading(false);
            });
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
                    <button
                        onClick={() => handleAddCartClick(products[0].pno)} // 첫 번째 제품 선택
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        장바구니에 담기
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductReadPage;
