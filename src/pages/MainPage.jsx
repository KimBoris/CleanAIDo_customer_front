import TabBarMain from "../component/layout/TabBarMain.jsx";
import NaviBarMain from "../component/layout/NaviBarMain.jsx";
import {useEffect, useRef, useState} from "react";
import TextModalComponent from "../component/ai/TextModalComponent.jsx";

function MainPage() {

    const fileInputRef = useRef(null); // 파일 입력 참조
    const cameraInputRef = useRef(null); // 카메라 참조

    // 파일 상태
    const [previewUrl, setPreviewUrl] = useState(null); // 미리보기용 url
    const [formData, setFormData] = useState(new FormData()); // 서버전송용
    const [encodedImage, setEncodedImage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 사용 유무

    // 사진 촬영 이벤트
    const handleShotClick = () => {
        cameraInputRef.current.click();
    }

    // 사진 선택 이벤트
    const handleSelectClick = () => {
        fileInputRef.current.click();
    }

    // 파일 업로드 이벤트
    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            // 미리보기용 이미지 url
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            console.log("image file data:", file);
            console.log(url)

            // 서버 전송용 파일 데이터
            const updatedFormData = new FormData();
            updatedFormData.append("image", file);
            setFormData(updatedFormData);

            // 이미지 파일 Base64 인코딩
            const reader = new FileReader();
            reader.onloadend = () => {
                setEncodedImage(reader.result);
                console.log("Encoded image data:", reader.result);
            };
            reader.readAsDataURL(file);

        }

    };

    // 파일 url 존재 유무에 따른 모달 띄우기
    useEffect(() => {
        setIsModalOpen(!!previewUrl);
    }, [previewUrl]);

    // 모달 닫기
    const closeCallback = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            {/* ai모달(닫기 이벤트 넘겨줌) */}
            {isModalOpen &&
                <TextModalComponent
                    handleShotClick={handleShotClick}
                    encodedImg={encodedImage}
                    formData={formData}
                    url={previewUrl}
                    callback={closeCallback}
                />
            }

            <div className={`bg-bara_gray_1 min-h-screen flex flex-col pb-40 ${isModalOpen ? 'hidden' : ''}`}>

                {/* 상단 섹션 */}
                <div
                    className="bg-bara_blue w-full h-[30rem] bg-[url('/images/bara-back.png')] bg-cover pl-8 pr-8"
                >
                    {/* 네비게이션바 */}
                    <NaviBarMain/>

                    {/* 컨텐츠 */}
                    <div className="pt-4">
                        <p className="text-white text-[2.8rem] font-sans font-light">
                            <span className="font-sans font-medium">AI 싹싹바라</span>의<br/>
                            청소 솔루션이<br/>
                            필요하신가요?<br/>
                        </p>
                        <img src="/images/arrow-bottom.svg" alt="화살표" className="pl-2 pt-3"/>
                    </div>

                    {/*  사진촬영, 사진선택  */}
                    <div className="flex font-sans mt-4">
                        {/*  사진촬영  */}
                        <div
                            onClick={handleShotClick}
                            className="
                            w-[10.8rem] h-32 bg-bara_light_sky_blue rounded-[0.5rem] mr-4 text-bara_sodomy p-4 shadow-lg
                            flex flex-col justify-between
                        "
                        >
                            <div>
                                <p className="text-[0.875rem]">직접 찍어서 올리기</p>
                                <p className="text-[1.2rem] font-medium">사진 촬영</p>
                            </div>

                            <img src="/images/camera.svg" alt="사진 촬영" className="ml-auto mt-auto self-end mb-0"/>

                            {/* 촬영한 사진 파일 처리용 input */}
                            <input
                                type="file"
                                ref={cameraInputRef}
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                style={{display: "none"}}
                            />
                        </div>

                        {/*  사진선택  */}
                        <div
                            onClick={handleSelectClick}
                            className="
                            w-[10.8rem] h-32 bg-white rounded-[0.5rem] text-bara_gray_5 p-4 shadow-lg
                            flex flex-col justify-between
                        "
                        >
                            <div>
                                <p className="text-[0.875rem]">앨범에서 선택하기</p>
                                <p className="text-[1.2rem] font-medium">사진 선택</p>
                            </div>
                            <img src="/images/image.svg" alt="사진 선택" className="ml-auto mt-auto self-end mb-0"/>

                            {/* 선택한 사진 파일 처리용 input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{display: "none"}}
                            />
                        </div>
                    </div>
                </div>

                {/* 하단 섹션 */}
                <div className="pl-8 pr-8 mt-20">
                    {/* 팁 게시판 바로가기 */}
                    <div className="w-full h-24 bg-white rounded-[0.5rem] shadow-lg p-4 text-bara_gray_5">
                        <div>
                            <p className="text-[0.875rem]">청소 꿀팁을 알고싶다면</p>
                            <p className="text-[1.2rem] font-medium">팁 게시판 바로가기</p>
                        </div>
                        <img src="/images/arrow-right-short.svg" alt="사진 선택" className="ml-auto mt-auto self-end mb-0"/>
                    </div>

                    <div
                        className="w-full h-24 bg-bara_light_blue rounded-[0.5rem] shadow-lg p-4 text-bara_sodomy mt-4">
                    </div>
                </div>

                {/*  탭바  */}
                <TabBarMain/>
            </div>
        </>

    );
}

export default MainPage;