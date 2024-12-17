import {useState, useEffect, useRef} from "react";
import useImageUpload from "../../hooks/useImageUpload.js";
import ChatModalComponent from "../ai/ChatModalComponent.jsx";

function ChatButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem("bara");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    // 조건에 따라 버튼 표시 (parsedData가 유효할 경우)
                    setIsVisible(!!parsedData);
                } catch (e) {
                    console.error("Error parsing localStorage data:", e);
                    setIsVisible(false);
                }
            } else {
                setIsVisible(false);
            }
        };

        checkLocalStorage();
    }, []);

    // const fileInputRef = useRef(null); // 파일 입력 참조
    // const cameraInputRef = useRef(null); // 카메라 참조
    //
    // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 사용 유무
    //
    // const {handleShotClick, handleFileChange} = useImageUpload(fileInputRef, cameraInputRef)
    //
    // const handleClickButtom = () => {
    //     setIsModalOpen(true);
    // }
    //
    // // 모달 닫기
    // const closeCallback = () => {
    //     setIsModalOpen(false);
    // }

    return (
        <>
            {/*{isModalOpen && (*/}
            {/*    <div className="z-100">*/}
            {/*        <ChatModalComponent handleShotClick={handleShotClick} callback={closeCallback}/>*/}

            {/*        <input*/}
            {/*            type="file"*/}
            {/*            ref={cameraInputRef}*/}
            {/*            accept="image/*"*/}
            {/*            capture="environment"*/}
            {/*            onChange={handleFileChange}*/}
            {/*            style={{display: "none"}}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

            {isVisible && (
                <div className="fixed bottom-28 right-0 z-99">
                    <img src="/images/chat_button.svg" className="w-[6.25rem]" alt="Chat" />
                </div>
            )}

        </>
    );
}

export default ChatButton;