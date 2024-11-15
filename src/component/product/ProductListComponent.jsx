import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductList } from '../../api/productAPI';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import './ProductListComponent.css';
import { Link } from 'react-router-dom';

const ProductListComponent = () => {
    const [products, setProducts] = useState([]);  // 제품 리스트 상태
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [error, setError] = useState(null);  // 에러 상태
    const [page, setPage] = useState(1);  // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1);  // 전체 페이지 수 상태

    const { search } = useLocation();  // 현재 URL의 쿼리 파라미터

    // keyword 쿼리 파라미터를 읽어오기
    const getKeywordFromURL = () => {
        const urlParams = new URLSearchParams(search);
        return urlParams.get('keyword') || '';  // 쿼리 파라미터에서 keyword 값을 가져옴
    };

    // 데이터를 가져오는 함수
    const fetchData = async () => {
        setLoading(true); // 로딩 시작
        try {
            const keyword = getKeywordFromURL();  // URL에서 가져온 keyword 값 사용
            console.log("Calling getProductList with keyword:", keyword);
            const data = await getProductList(page, 10, keyword);  // keyword 포함하여 요청
            console.log("Data:", data);
            setProducts((prevProducts) => [...prevProducts, ...data.dtoList]);  // 기존 제품 리스트에 새로운 데이터 추가
            setTotalPages(data.totalPages);  // 전체 페이지 수 설정
        } catch (error) {
            setError('Failed to fetch products');  // 에러 처리
        } finally {
            setLoading(false);  // 로딩 완료
        }
    };

    // 페이지가 변경될 때마다 데이터를 가져오는 useEffect
    useEffect(() => {
        if (page <= totalPages) {
            fetchData();  // 페이지가 바뀔 때마다 데이터 호출
        }
    }, [page, totalPages]);

    // 페이지가 뷰포트에 들어왔을 때, 다음 페이지로 이동하는 useInView 훅
    const { ref, inView } = useInView({
        triggerOnce: false,  // 한 번만 트리거하지 않고 계속 트리거
        threshold: 0,  // 요소가 보이면 즉시 트리거
    });

    // 뷰포트에 들어왔을 때, 페이지를 증가시키는 useEffect
    useEffect(() => {
        if (inView && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);  // 페이지를 증가시킴
        }
    }, [inView, loading, page, totalPages]);

    if (loading && products.length === 0) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <ul className="product-list">
                {products.map((product) => (
                    <li className="product-item" key={product.pno}>
                        <Link to={`/product/read/${product.pno}`} className="product-link">
                            <img
                                src={product.fileName || '/images/star_1.svg'}
                                className="product-thumbnail"
                                alt={product.pname}
                            />
                            <div className="product-info">
                                <h2 className="product-name">{product.pname}</h2>
                                <p className="product-price">{product.price}원</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {products.length === 0 && !loading && <div ref={ref}></div>}
            {loading && <div>Loading more...</div>}
        </div>
    );
};

export default ProductListComponent;
