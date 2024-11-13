import {useState, useEffect} from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import TabBarProductDetail from "../../component/layout/TabBarProductDetail.jsx";

function ProductReadPage() {
    const {pno} = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/product/read/${pno}`)
            .then(response => {
                console.log('API response:', response.data); // 응답 확인
                // 응답이 배열이 아니라 객체인 경우, 배열로 변환
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <NaviBarShop></NaviBarShop>
            <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
                {/*<h1 className="text-3xl font-bold mb-4"></h1>*/}
                <ProductReadComponent products={products}/>
                <TabBarProductDetail/>
                <TabBarShop></TabBarShop>

            </div>
        </>
    );
}

export default ProductReadPage;
