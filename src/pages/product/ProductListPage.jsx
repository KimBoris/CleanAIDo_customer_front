import  { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListComponent from "../../component/product/ProductListComponent.jsx";


const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 오류 상태 추가

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/product/list')
            .then(response => {
                setProducts(response.data.dtoList);
                setLoading(false); // 로딩 완료
                console.log(response.data);
                console.log(response.data.dtoList);
            })
            .catch(error => {
                console.error('There was an error fetching the products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false); // 로딩 완료
            });
    }, []);

    if (loading) return <div>Loading...</div>; // 로딩 메시지
    if (error) return <div>{error}</div>; // 오류 메시지 표시

    return (
        <div>
            <h1>Product List</h1>
            <ProductListComponent products={products} />
        </div>
    );
};

export default ProductListPage;