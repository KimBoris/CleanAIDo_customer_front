// import { useState, useEffect } from "react";
// import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
// import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
// import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
// import {getProductOne} from "../../api/productAPI.js";
//
// function ProductReadPage() {
//     const { pno } = useParams();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate(); // navigate 추가
//
//     useEffect(() => {
//         getProductOne(pno)
//             .then(response => {
//                 const productData = response?.data; // 데이터가 없을 경우 undefined를 방지
//                 const productList = Array.isArray(productData) ? productData : [productData];
//                 setProducts(productList);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Error fetching products:', err);
//                 setError('Failed to fetch products');
//                 setLoading(false);
//             });
//
//     }, [pno]);
//
//     const handlePurchaseClick = (product) => {
//         navigate("/order/create", { state: { product } });
//     };
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//
//     return (
//         <>
//             <NaviBarShop />
//             <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
//                 <ProductReadComponent products={products} />
//                 <div className="text-center mt-4">
//                     <button
//                         onClick={() => handlePurchaseClick(products[0])} // 첫 번째 제품 선택
//                         className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                         구매하기
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export default ProductReadPage;
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
// import { fetchProduct } from "../../api/productAPI.js";
// import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
//
// function ProductReadPage() {
//     const { pno } = useParams();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const loadProduct = async () => {
//             try {
//                 const productList = await fetchProduct(pno);
//                 setProducts(productList);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching products:', err);
//                 setError('Failed to fetch products');
//                 setLoading(false);
//             }
//         };
//
//         loadProduct();
//     }, [pno]);
//
//     const handlePurchaseClick = (product) => {
//         navigate("/order/create", { state: { products: [product] } });
//     };
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//
//     return (
//         <>
//             <NaviBarShop />
//             <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
//                 <ProductReadComponent products={products} />
//                 <div className="text-center mt-4">
//                     <button
//                         onClick={() => handlePurchaseClick(products[0])}
//                         className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                         구매하기
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export default ProductReadPage;
import { useState, useEffect } from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import { useParams, useNavigate } from "react-router-dom";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import { getProductOne } from "../../api/productAPI.js";

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

