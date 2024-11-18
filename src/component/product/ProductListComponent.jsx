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

    const navigate = useNavigate();
    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('keyword') || '';

    useEffect(() => {
        setQueryValue(keyword)
        setProducts([]); // 검색어 변경 시 기존 제품 리스트 초기화
        setPage(1);
        fetchData();
    }, [keyword]); // keyword가 변경될 때마다 실행

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProductList(page, 10, keyword);
            setProducts((prevProducts) => [...prevProducts, ...data.dtoList]);
            setTotalPages(data.totalPages);
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
        <div className="container mx-auto pl-8 pr-8">
            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    value={queryValue}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요..."
                    className="w-4/5 p-4 mb-0 border-2 py-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2
                    focus:ring-blue-500 "
                />
                <button
                    onClick={handleSearch}
                    className="text-center w-1/5 p-4 py-4 bg-bara_blue text-white rounded-lg hover:bg-bara_blue
                    bg-bara_blue focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    검색
                </button>
            </div>
            {/* 제품 리스트 렌더링 */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4"> {/* `gap-4` 추가 */}
                {products.map((product, index) => (
                    <li key={`${product.pno}--${index}`}
                        className="border-2 bg-white shadow-md rounded-[0.5rem] overflow-hidden hover:shadow-xl transition duration-300 p-2 flex"
                    >
                        <Link to={`/product/read/${product.pno}`} className="flex w-full">
                            <img
                                src={product.fileName || '/images/star_1.svg'}
                                alt={product.pname}
                                className="w-24 h-24 object-cover flex-shrink-0"
                            />
                            <div className="ml-4 flex flex-col justify-center">
                                <h2 className="text-lg font-semibold text-bara_gray_5">{product.pname}</h2>
                                <p className="text-md font-bold text-bara_blue mt-1">{product.price}원</p>
                            </div>
                        </Link>
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
