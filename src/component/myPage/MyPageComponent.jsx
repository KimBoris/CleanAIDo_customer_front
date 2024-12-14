import {Link} from "react-router-dom";
import {getReviewsByCustomer} from "../../api/reviewAPI.js";
import {useEffect, useState} from "react";
import {getFreqProductList} from "../../api/productAPI.js";

function MyPageComponent() {

    const [reviewCount, setReviewCount] = useState([]);
    const [freqProduct, setFreqProduct] = useState([]);

    const fetchReviewCount = async () => {
        getReviewsByCustomer().then((res) => {
            console.log(res);
            setReviewCount(res.totalCount);
        })
    }

    const fetchListFreqProdcut = async () => {
        getFreqProductList(1, 5).then((res) => {
            console.log(res);
            setFreqProduct(res.dtoList);
        })
    }

    useEffect(() => {
        fetchReviewCount();
        fetchListFreqProdcut();
    }, []);

    return (
        <div>
            <div className="pb-40 text-bara_sodomy mt-[9rem] bg-bara_gray_1">
                <div className="px-8 pt-8 text-[1.2rem] pb-4">
                    {/* 사용자 이름 데이터 넣어야 함!!!! */}
                    <b>박소영</b>님, 반갑습니다!
                </div>
                <div className="bg-white py-4 px-8 mb-4">
                    {/* 대시보드 */}
                    <div
                        className="bg-bara_gray_1 rounded-[0.5rem] w-full h-28 flex justify-between items-center p-8 relative">
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.5rem]">2.3m</p>
                            <p>총결제액</p>
                        </div>

                        {/* 세로선 */}
                        <div
                            className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-bara_gray_3"></div>

                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.5rem]">42</p>
                            <p>총구매수</p>
                        </div>

                        {/* 세로선 */}
                        <div
                            className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-[1px] bg-bara_gray_3"></div>

                        <div className="flex flex-col items-center">
                            <p className="font-bold text-[1.5rem]">{reviewCount}</p>
                            <p>후기작성</p>
                        </div>
                    </div>


                    {/* 메뉴 */}
                    <div className="flex justify-between mt-8">
                        <Link to="order/list">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_order_list.svg" className="w-[2.25rem]"/>
                                <span>주문내역</span>
                            </div>
                        </Link>
                        <Link to="">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_wish_list.svg" className="w-[2.25rem]"/>
                                <span>찜한목록</span>
                            </div>
                        </Link>
                        <Link to="review/list">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_review_list.svg" className="w-[2.25rem]"/>
                                <span>리뷰관리</span>
                            </div>
                        </Link>
                        <Link to="">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <img src="/images/my_edit_info.svg" className="w-[2.25rem]"/>
                                <span>정보수정</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-8">
                    <h3 className="text-[1.2rem] font-bold">자주 구매한 상품</h3>
                    <hr className="my-4 border-bara_gray_3"/>
                    <div className="flex flex-wrap max-w-full overflow-x-auto">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                {freqProduct.map((product) => (
                                    <>
                                        <Link to={`/product/read/${product.pno}`} className="flex w-full">
                                            <div key={product.pno} className="w-40 flex-shrink-0 flex flex-col">
                                                <div className="w-40 h-40 bg-bara_gray_3 flex-shrink-0">
                                                    <img src={product.fileName} alt={product.pname}
                                                         className="w-full h-full object-cover"/>
                                                </div>
                                                <div className="mt-2">
                                                    <h4 className="">{product.pname}</h4>
                                                    <p className="text-bara_blue text-[1.2rem] font-bold">{product.price}원</p>
                                                    {product.reviewCount > 0 && (
                                                        <div className="flex items-center -mt-0">
                                                            <img src={`/images/star_${product.score}.svg`} />
                                                            <span className="ml-1 text-md text-bara_gray_4">({product.reviewCount})</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageComponent;