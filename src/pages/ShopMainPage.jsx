import NaviBarShop from "../component/layout/NaviBarShop.jsx";
import TabBarShop from "../component/layout/TabBarShop.jsx";
import { Carousel } from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {getProductSuggestList} from "../api/productAPI.js";
import {Link} from "react-router-dom";

function ShopMainPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        const data = await getProductSuggestList().then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <NaviBarShop />
            <div className="bg-bara_gray_1 min-h-screen w-full pb-48 overflow-y-auto text-bara_sodomy">
                {/* 배너 */}
                <div className="bg-bara_sky_blue w-full h-80 mb-4">
                    <Carousel>
                        <img
                            src="/images/ad/배너1.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="/images/ad/배너2.png"
                            alt="image 2"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>
                </div>
                {/*  //배너  */}
                {/*  추천상품  */}
                <div className="bg-white p-8">
                    <h3 className="text-[1.2rem] font-bold">추천 상품</h3>
                    <hr className="my-4 border-bara_gray_3"/>

                    {loading && <div>Loading.....</div>}
                    
                    <div className="flex flex-wrap max-w-full overflow-x-auto">
                        <div className="flex flex-col gap-4">
                            {/* 첫 번째 행 */}
                            <div className="flex gap-4">
                                {products.slice(0, 5).map((product) => (
                                    <>
                                        <Link to={`/product/read/${product.pno}`} className="flex w-full">
                                            <div key={product.pno} className="w-40 flex-shrink-0 flex flex-col">
                                                <div className="w-40 h-40 bg-bara_gray_3 flex-shrink-0">
                                                    <img src={product.fileName} alt={product.pname}
                                                         className="w-full h-full object-cover"/>
                                                </div>
                                                <div className="mt-2">
                                                    <h4 className="">{product.pname}</h4>
                                                    <p className="text-bara_blue text-[1.2rem] font-bold">{product.price.toLocaleString()}원</p>
                                                    {product.reviewCount > 0 && (
                                                        <div className="flex items-center -mt-0">
                                                            <img src={`/images/star_${product.score}.svg`}/>
                                                            <span
                                                                className="ml-1 text-md text-bara_gray_4">({product.reviewCount})</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                            </div>

                            {/* 두 번째 행 */}
                            <div className="flex gap-4">
                                {products.slice(5).map((product) => (
                                    <div key={product.pno} className="w-40 flex-shrink-0 flex flex-col">
                                        <div className="w-40 h-40 bg-bara_gray_3 flex-shrink-0">
                                            <img src={product.fileName} alt={product.pname}
                                                 className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="">{product.pname}</h4>
                                            <p className="text-bara_blue text-[1.2rem] font-bold">{product.price.toLocaleString()}원</p>
                                            {product.reviewCount > 0 && (
                                                <div className="flex items-center -mt-0">
                                                    <img src={`/images/star_${product.score}.svg`}/>
                                                    <span className="ml-1 text-md text-bara_gray_4">({product.reviewCount})</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/*
        "pno": 37,
        "pname": "아무거나",
        "price": 1000,
        "pstatus": "selling",
        "fileName": null,
        "reviewCount": 0,
        "score": 0,
        "category": "기타청소도구"
            */}
            </div>

            <TabBarShop/>
        </>
    );
}

export default ShopMainPage;