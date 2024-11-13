import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';  // URL에서 파라미터를 읽어오기 위해 useLocation 사용
import { getProductList } from '../../api/productAPI'; // API 함수 import
import ProductListComponent from "../../component/product/ProductListComponent.jsx";
import { useInView } from 'react-intersection-observer';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { search } = useLocation();  // URL에서 쿼리 파라미터를 가져옴
    const observer = useRef();

    // keyword 쿼리 파라미터를 읽어오기
    const getKeywordFromURL = () => {
        const urlParams = new URLSearchParams(search);
        return urlParams.get('keyword') || '';  // keyword 파라미터 값 가져오기
    };

    const fetchData = async () => {
        setLoading(true); // 로딩 시작
        try {
            const keyword = getKeywordFromURL();  // URL에서 가져온 keyword 값을 사용
            console.log("Calling getProductList with keyword:", keyword);
            const data = await getProductList(page, 10, keyword);  // keyword 포함하여 요청
            console.log("Data:", data);
            setProducts((prevProducts) => [...prevProducts, ...data.dtoList]);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page <= totalPages) {
            fetchData();  // 페이지가 바뀔 때마다 데이터 호출
        }
    }, [page]);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);  // 페이지를 하나씩 증가시킴
        }
    }, [inView, loading, page, totalPages]);

    if (loading && products.length === 0) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Product List</h1>
            <ProductListComponent products={products} />
            {products.length > 0 && !loading && (
                <div ref={ref}></div>
            )}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default ProductListPage;
