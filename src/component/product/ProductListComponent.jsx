import { Link, useLocation } from "react-router-dom";
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


    const handleInputChange = (e) => {
        setQueryValue(e.target.value);
    };

    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('keyword') || '';

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProductList(page, 10, keyword);
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
            fetchData();
        }
    }, [page, totalPages]);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, loading, page, totalPages]);

    if (loading && products.length === 0) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;
    if (products.length === 0) return <div className="text-center text-xl">No products found</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={queryValue}
                    placeholder="검색어를 입력하세요..."
                    className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <li key={`${product.pno}--${index}`}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        <Link to={`/product/read/${product.pno}`} className="block">
                            <img
                                src={product.fileName || '/images/star_1.svg'}

                                alt={product.pname}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">{product.pname}</h2>
                                <p className="text-lg font-bold text-blue-500 mt-2">{product.price}원</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 로딩 상태 */}
            {products.length === 0 && !loading && <div ref={ref}></div>}
            {loading && <div className="text-center text-xl py-4">Loading more...</div>}
        </div>
    );
};

export default ProductListComponent;
