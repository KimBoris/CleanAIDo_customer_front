import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/productAPI.js";
import { useInView } from "react-intersection-observer";

const ProductListComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [queryValue, setQueryValue] = useState('');
    // const [reviewCount, setReviewCount] = useState();

    const navigate = useNavigate();
    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('keyword') || '';
    const type = new URLSearchParams(search).get('type') || '';

    useEffect(() => {
        setQueryValue(keyword)
        setProducts([]); // 검색어 변경 시 기존 제품 리스트 초기화
        setPage(1);
        fetchData();
    }, [keyword]); // keyword가 변경될 때마다 실행

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProductList(page, 10, keyword, type);
            setProducts((prevProducts) => [...prevProducts, ...data.dtoList]);
            setTotalPages(data.totalPages);
            // setReviewCount(data.reviewCount)

            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQueryValue(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/product/list?keyword=${queryValue}`);
    };

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    //inview = true
    //loading = false
    //page < totalPage = true
    useEffect(() => {
        console.log('inView = ', inView);
        if (inView && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, loading, page, totalPages]);

    if (loading && products.length === 0) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;
    if (products.length === 0) return <div className="text-center text-xl">No products found</div>;

    return (
        <div className="container bg-bara_gray_1 min-h-screen pb-40">
            <div className="flex gap-4 items-center justify-between w-full px-8 pb-4 bg-white">
                <input
                    type="text"
                    value={queryValue}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요..."
                    className="w-full px-4 mb-0 border-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2
                    focus:ring-blue-500 "
                />
                <img
                    src="/images/search.png"
                    onClick={handleSearch}
                />
            </div>
            {/* 제품 리스트 렌더링 */}
            <ul className="bg-white px-8 py-4 mt-4">
                {products.map((product, index) => (
                    <li key={`${product.pno}--${index}`}>
                        <Link to={`/product/read/${product.pno}`} className="flex w-full">

                            <img
                                src={`/images/${product.fileName}`}
                                className="w-24 h-24 object-cover flex-shrink-0"
                            />
                            <div className="ml-4">
                                <h2 className="text-bara_sodomy line-clamp-3">{product.pname}</h2>
                                <p className="font-bold text-[1.2rem] text-bara_blue mt-1">{product.price.toLocaleString()}원</p>
                                {product.reviewCount > 0 && (
                                    <div className="flex items-center -mt-0">
                                        <img src={`/images/star_${product.score}.svg`} />
                                        <span className="ml-1 text-md text-bara_gray_4">({product.reviewCount})</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                        <hr className="my-4" />
                    </li>
                ))}
            </ul>

            {/* 로딩 상태 */}
            {products.length === 0 && !loading && <div ref={ref} className="h-10 bg-transparent"></div>}
            {loading && <div className="text-center text-xl py-4">Loading more...</div>}
        </div>
    );
};

export default ProductListComponent;