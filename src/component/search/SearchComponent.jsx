import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
    const [query, setQuery] = useState('');


    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-6 border-2 border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">상품 검색</h1>
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요..."
                    className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus
                    :ring-blue-500"
                />

                <Link
                    to={`/product/list?keyword=${query}`}
                    className="text-center w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                    검색
                </Link>
            </div>

            {query && <p className="mt-4 text-center text-gray-700">검색어: {query}</p>}
        </div>
    );
};

export default SearchComponent;
