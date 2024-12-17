import ChatButton from "../component/common/ChatButton.jsx";
import {Outlet} from "react-router-dom";
import ChatModalComponent from "../component/ai/ChatModalComponent.jsx";
import {useRef, useState} from "react";
import useImageUpload from "../hooks/useImageUpload.js";

function LayoutPage() {

    const fileInputRef = useRef(null); // 파일 입력 참조
    const cameraInputRef = useRef(null); // 카메라 참조

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 사용 유무

    const {handleShotClick, handleFileChange} = useImageUpload(fileInputRef, cameraInputRef)

    const handleClickButtom = () => {
        setIsModalOpen(true);
    }

    // 모달 닫기
    const closeCallback = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            {/* 공통으로 보여줄 ChatButton */}
            <div>
                {!isModalOpen && (
                    <div onClick={handleClickButtom}>
                        <ChatButton/>
                    </div>
                )}


            </div>

            {/* 하위 라우팅 컴포넌트가 렌더링될 영역 */}
            {isModalOpen == true ? (
                <div className="z-100">
                    <ChatModalComponent handleShotClick={handleShotClick} callback={closeCallback}/>

                    <input
                        type="file"
                        ref={cameraInputRef}
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        style={{display: "none"}}
                    />
                </div>
                ):
                (
                    <Outlet/>

            )}

        </div>
    );
}

export default LayoutPage;