import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Share from "../../layout/Share";
import LoadingComponent from "../common/LoadingComponent";
import { getProductList } from "../../apis/productApi";

const ProductList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialPage = queryParams.get("page") || 1;
    const initialType = queryParams.get("type") || "";
    const initialKeyword = queryParams.get("keyword") || "";

    const [role, setRole] = useState("ROLE_ADMIN"); // 예시: 실제 역할은 인증에서 가져오세요.
    const [productList, setProductList] = useState({
        dtoList: [],
        pageNumList: [],
        pageRequestDTO: {
            page: 0,
            size: 10,
        },
    });
    const [selectedOption, setSelectedOption] = useState(initialType);
    const [keyword, setKeyword] = useState(initialKeyword);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProductList = async (page, type = "", keyword = "") => {
        setIsLoading(true);
        const data = await getProductList(page || 1, 10, type, keyword);
        setProductList(data);
        setIsLoading(false);
    };

    const handleSearch = () => {
        const query = { page: 1, type: selectedOption, keyword };
        const queryString = new URLSearchParams(query).toString();
        navigate(`/product/list?${queryString}`);
        fetchProductList(1, selectedOption, keyword);
    };

    const handleClickPage = (pageNum) => {
        const query = { page: pageNum, type: selectedOption, keyword };
        const queryString = new URLSearchParams(query).toString();
        navigate(`/product/list?${queryString}`);
        fetchProductList(pageNum, selectedOption, keyword);
    };

    const goToEditPage = (pno) => {
        navigate(`/product/read/${pno}`);
    };

    useEffect(() => {
        fetchProductList(initialPage, initialType, initialKeyword);
    }, [initialPage, initialType, initialKeyword]);

    return (
        <div>
            {/* 탭 메뉴 */}
            <div className="d-sm-flex align-items-center justify-content-between border-bottom mb-4">
                <div className="ms-auto">
                    <Share />
                </div>
            </div>
            <div>
                {/* 로딩창 */}
                {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <LoadingComponent />
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title"></h4>
                            <p className="card-description"></p>
                            <div className="form-group d-flex justify-content-end">
                                {/* 검색창 */}
                                <div className="input-group w-auto">
                                    <select
                                        style={{ height: "36px" }}
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            ------
                                        </option>
                                        <option value="pcode">코드</option>
                                        <option value="pname">제품명</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={keyword}
                                        placeholder="검색어를 입력하세요"
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="btn btn-primary text-light px-2 py-1"
                                        type="button"
                                        style={{ height: "36px" }}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>품번</th>
                                        {role === "ROLE_ADMIN" && (
                                            <th style={{ width: "10%" }}>스토어명</th>
                                        )}
                                        <th style={{ width: "10%" }}>제품명</th>
                                        <th style={{ width: "10%" }}>가격</th>
                                        <th style={{ width: "10%" }}>수량</th>
                                        <th style={{ width: "10%" }}>판매상태</th>
                                        <th style={{ width: "40%" }}>등록일/수정일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {productList.dtoList.map((product) => (
                                        <tr
                                            key={product.pno}
                                            className="pe-auto cursor-pointer"
                                            onClick={() => goToEditPage(product.pno)}
                                        >
                                            {role === "ROLE_ADMIN" && (
                                                <td>{product.storeName}</td>
                                            )}
                                            <td className="cursor-pointer">{product.pcode}</td>
                                            <td>{product.pname}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.pstatus}</td>
                                            <td>
                                                {product.createdAt} / {product.updatedAt}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* 페이지네이션 */}
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        {productList.prev && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary py-3 px-3"
                                                onClick={() => handleClickPage(productList.prevPage)}
                                            >
                                                이전
                                            </button>
                                        )}
                                        {productList.pageNumList.map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                className="btn btn-outline-secondary py-3 px-3"
                                                onClick={() => handleClickPage(page)}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        {productList.next && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary py-3 px-3"
                                                onClick={() => handleClickPage(productList.nextPage)}
                                            >
                                                다음
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
