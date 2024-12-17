import {useEffect, useState} from "react";
import {loadImage} from "../../hooks/useIndexedDB.js";
import {useNavigate} from "react-router-dom";

function ChatModalComponent({handleShotClick, callback}) {

    const navigate = useNavigate();

    // 로컬스토리지 데이터
    const baraData = JSON.parse(localStorage.getItem("bara"));
    const solution = baraData.solution;
    const products = baraData.product.split(',');
    const question = baraData.question;

    // indexed db 이미지 데이터
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        loadImage("imgKey")
            .then((image) => {
                setImageSrc(image);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, []);

    const handleAddClick = () => {
        callback();
        handleShotClick();
    }

    const productList = products.map((product, index) => {
        return (
            <div key={index}>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-4 text-bara_sodomy font-bold">{product} 검색</span>
                    <div className="flex items-center justify-between gap-1">
                        <span onClick={() => navigate(`/product/list?keyword=${product}`)}>바로가기</span>
                        <img src="/images/arrow-right-short-link.png" />
                    </div>
                </div>
                <div className="flex items-center justify-between">

                    {/* 얘도 반복될거임 */}
                    <div>
                        <div className="bg-bara_gray_2 w-[5.625rem] h-[5.625rem]"></div>
                        <div className="flex flex-col overflow-hidden">
                            <span
                                className="text-[0.75rem] text-bara_sodomy truncate w-[5.625rem]">한입 100% 구연산ddd</span>
                            <span className="text-[0.75rem] text-bara_gray_5 truncate w-[5.625rem]">3,850원</span>
                        </div>
                    </div>

                </div>
                <hr className="border-bara_gray_2 my-4" />
            </div>
        );
    });

    return (
        <>
            <div className="px-8 w-full min-h-screen bg-bara_gray_1 z-50">
                {/* 닫기 버튼 */}
                <div className="min-h-16 mb-12">
                    <div className="h-[7rem] pt-12 flex items-center justify-between box-border">
                        <img
                            src="/images/close.svg"
                            alt="닫기"
                            className="mt-[1.2rem] w-auto h-auto"
                            onClick={callback}
                        />
                    </div>
                </div>
                
                {/*  컨텐츠  */}
                <div className="text-[0.875rem] mb-4">
                    {/* 고객 질문 */}
                    <div
                        className="
                            w-[10.875rem] h-[10.875rem] rounded-[0.5rem] bg-bara_gray_5 ml-auto overflow-hidden
                            mb-4
                        "
                    >
                        <img src={imageSrc} className="object-cover w-full h-full" />
                    </div>
                    {question &&
                        <div
                            className="py-4 pl-4 pr-8 bg-bara_gray_4 rounded-[0.5rem] text-white ml-auto max-w-max mb-4">
                            <p>{question}</p>
                        </div>
                    }

                    {/* 싹싹바라의 답변 */}
                    <img src="/images/bara_profile.png" className="mb-4"/>
                    <div className="w-full bg-white p-4 text-bara_sodomy rounded-[0.5rem]">
                        <p>안녕하세요. AI 싹싹바라 입니다.</p>
                        <p className="whitespace-pre-wrap break-words font-sans">
                            {solution.replace(/\\n/g, '\n')}
                        </p>
                        <hr className="border-bara_gray_3 my-4"/>

                        {/* 상품 추천 */}
                        <div className="">
                            {productList}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleAddClick}
                    className="w-full py-[1.125rem] bg-bara_blue text-white rounded-[0.5rem] mb-32"
                >
                    다른 질문 하기
                </button>
            </div>
        </>
    );
}

export default ChatModalComponent;