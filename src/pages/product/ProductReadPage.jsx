import { useState, useEffect } from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";

function ProductReadPage() {
    const { pno } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // navigate 추가

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/product/read/${pno}`)
            .then(response => {
                const productList = Array.isArray(response.data) ? response.data : [response.data];
                setProducts(productList);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, [pno]);

    const handlePurchaseClick = (product) => {
        navigate("/order/create", { state: { product } });
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
