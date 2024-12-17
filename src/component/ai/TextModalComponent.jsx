import {useCallback, useState} from "react";
import ChatModalComponent from "./ChatModalComponent.jsx";
import {saveImage} from "../../hooks/useIndexedDB.js";
import {getSolution} from "../../api/aiAPI.js";
import AnswerLoadingComponent from "../common/AnswerLoadingComponent.jsx";

function TextModalComponent({handleShotClick, encodedImg, formData, url, callback}) {


    const [isChatModalOpen, setIsChatModalOpen] = useState(false); // 모달 사용 유무
    const [question, setQuestion] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false)

    console.log(formData);

    const handleChange = useCallback((e) => {
        setQuestion(e.target.value);
    }, [])


    // 완료 버튼 이벤트
    const handleClickComplate = async () => {
        setLoading(true)
        // 이미지 form데이터 서버 전송해서 1차 카테고리(키워드), 2차 카테고리(상품) 받기
        // 키워드와 상품, 질문 합쳐서 지피티에 전송하고 답변 받기
        // 키워드와 상품, 답변 로컬스토리지에 저장


        try {
            const startTime = new Date().getTime();
            const res = await getSolution(formData, question);
            console.log("Category:", res.extractedCategory);
            console.log("Solution:", res.solution);
            const object = {
                solution: res.solution.replace(/^\s+/gm, ''),
                product: res.extractedCategory,
                question: question
            }
            // 서버에서 수량 업데이트
            // 로컬스토리지에 객체로 저장
            localStorage.setItem("bara", JSON.stringify(object));

            // indexed db에 이미지 저장
            if (encodedImg) {
                await saveImage("imgKey", encodedImg);
            }
            const endTime = new Date().getTime();
            // 경과 시간 계산
            const elapsedTime = endTime - startTime; // 밀리초 단위
            console.log(`Elapsed time: ${elapsedTime} ms`);
            setLoading(false)
            setIsChatModalOpen(true);

        } catch (error) {
            console.error("Error update quantity:", error);
            setError("Failed to update item. Please try again.");
        }

    }

    // 건너뛰기 버튼 이벤트 - 텍스트 전송 필요 없음
    const handleClickSkip = async () => {

        // 이미지 form데이터 서버 전송해서 1차 카테고리(키워드), 2차 카테고리(상품) 받기
        // 키워드와 상품 합쳐서 지피티에 전송하고 답변 받기
        // 키워드와 상품, 답변 로컬스토리지에 저장

        // 테스트용 객체
        const object = {
            keyword: "세면대",
            solution: `
                세면대 청소를 위한 방법을 알려드릴게요.
                1. 세면대 준비: 먼저 세면대의 물기를 제거하고, 배수구 주변에 있는 머리카락이나 이물질을 제거합니다.
                2. 세정제 도포: 세면대 표면에 세정제를 골고루 뿌려주세요. 배수구 주변과 세면대 안쪽, 특히 물때가 잘 낄 수 있는 모서리 부분에 집중적으로 분사합니다.
                3. 부드러운 솔로 문지르기: 칫솔이나 부드러운 스펀지를 사용해 세면대를 문질러 주세요. 세정제가 충분히 스며들어 오염이 쉽게 제거되도록 합니다. 특히 세면대 가장자리나 수전 주변은 꼼꼼하게 닦아줍니다.
                4. 헹구기: 세정제를 모두 닦아낸 후, 물을 사용해 세면대를 깨끗이 헹굽니다. 남은 세정제가 남지 않도록 여러 번 헹구는 것이 좋습니다.
                5. 물기 제거: 헹군 후에는 마른 수건이나 천으로 세면대 표면의 물기를 닦아줍니다. 이렇게 하면 물 얼룩이 생기는 것을 방지할 수 있어요.
                세면대 청소는 주기적으로 관리해주면 물때와 세균 번식을 막아 깨끗하게 유지할 수 있습니다.
            `.replace(/^\s+/gm, ''), // 줄바꿈 시 문장 앞 공백 제거
            product: "구연산,베이킹소다"
            // question 없이 보낸다
        }

        // 로컬스토리지에 객체로 저장
        localStorage.setItem("bara", JSON.stringify(object));

        // indexed db에 이미지 저장
        if (encodedImg) {
            await saveImage("imgKey", encodedImg);
        }

        setIsChatModalOpen(true);

    }

    if (error) return <div>{error}</div>;

    return (
        <>
            {/* 로딩 상태일 때 AnswerLoadingComponent 표시 */}
            {isLoading ? (
                <AnswerLoadingComponent />
            ) : (
                <>
                    {isChatModalOpen && (
                        <ChatModalComponent
                            handleShotClick={handleShotClick}
                            callback={callback}
                        />
                    )}
                    <div className="px-8 w-full min-h-screen fixed bg-bara_gray_1 z-10">
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

                        <div>
                            {/* 이미지 미리 보기 */}
                            <div className="w-[10.875rem] h-[10.875rem] rounded-[0.5rem] overflow-hidden m-auto mb-12">
                                <img
                                    src={url}
                                    alt="미리보기"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <p className="text-bara_sodomy text-center mb-4">
                                어떤 상황인가요?
                            </p>

                            <input
                                type="text"
                                name="question"
                                value={question}
                                onChange={(e) => handleChange(e)}
                                className="
                                p-4 rounded-[0.5rem] border-2 border-bara_gray_2 w-full mb-4 text-bara_gray_4
                            "
                            />

                            <div className="flex text-white">
                                <button
                                    className="p-4 bg-bara_sky_blue rounded-[0.5rem] w-full mr-4"
                                    onClick={handleClickSkip}
                                >
                                    건너뛰기
                                </button>
                                <button
                                    className="p-4 bg-bara_blue rounded-[0.5rem] w-full disabled:bg-bara_gray_3"
                                    onClick={handleClickComplate}
                                    disabled={!question.trim()}
                                >
                                    완 료
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );

}

export default TextModalComponent;