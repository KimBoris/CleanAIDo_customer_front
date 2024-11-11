import TabBarMain from "../component/layout/TabBarMain.jsx";
import NaviBarMain from "../component/layout/NaviBarMain.jsx";
import {useRef, useState} from "react";

function MainPage() {

    const fileInputRef = useRef(null); // 파일 입력 참조
    const cameraInputRef = useRef(null); // 파일 입력 참조
    const [previewUrl, setPreviewUrl] = useState(null);

    // 사진 촬영 이벤트
    const handleShotClick = () => {
        cameraInputRef.current.click();
    }

    // 사진 선택 이벤트
    const handleSelectClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            // 미리보기용 이미지 url
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            console.log("image file data:", file);
            console.log(url)

            // 서버 전송용 파일 데이터
            const formData = new FormData();
            formData.append("image", file);

            /*

            크로마db 또는 엘라스틱서치 서버에 파일 전송하는 코드 필요함

             */
        }

    };

    return (
        <div className="bg-bara_gray_1 min-h-screen flex flex-col pb-40">
            {/* 상단 섹션 */}
            <div
                className="bg-bara_blue w-full h-[30rem] bg-[url('/images/bara-back.png')] bg-cover pl-8 pr-8"
            >
                {/* 네비게이션바 */}
                <NaviBarMain />

                {/* 컨텐츠 */}
                <div className="pt-4">
                    <p className="text-white text-[2.8rem] font-sans font-light">
                        <span className="font-sans font-medium">AI 싹싹바라</span>의<br/>
                        청소 솔루션이<br/>
                        필요하신가요?<br/>
                    </p>
                    <img src="/images/arrow-bottom.svg" alt="화살표" className="pl-2 pt-3" />
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
                            style={{ display: "none" }}
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

                <div className="w-full h-24 bg-bara_light_blue rounded-[0.5rem] shadow-lg p-4 text-bara_sodomy mt-4">
                </div>
            </div>

            {/* !!! 지워야 함 !!! */}
            {/* 이미지 나오는지 테스트용 */}
            {previewUrl && (
                <img src={previewUrl} alt="미리보기" className="mt-4 w-full max-w-xs" />
            )}
            {/* 이미지 나오는지 테스트용 */}

            {/*  탭바  */}
            <TabBarMain/>
        </div>
    );
}

export default MainPage;