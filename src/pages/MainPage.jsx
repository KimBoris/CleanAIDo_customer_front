import TabBar from "../component/layout/TabBar.jsx";
import NaviBar from "../component/layout/NaviBar.jsx";

function MainPage() {
    return (
        <div className="bg-bara_gray_1 min-h-screen flex flex-col">
            {/* 상단 섹션 */}
            <div
                className="bg-bara_blue w-full h-[30rem] bg-[url('/images/bara-back.png')] bg-cover pl-8 pr-8"
            >
                {/* 네비게이션바 */}
                <NaviBar />

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
                    <div className="
                        w-[10.8rem] h-32 bg-bara_light_sky_blue rounded-[0.5rem] mr-4 text-bara_sodomy p-4 shadow-lg
                        flex flex-col justify-between
                    ">
                        <div>
                            <p>직접 찍어서 올리기</p>
                            <p className="text-[1.2rem] font-medium">사진 촬영</p>
                        </div>

                        <img src="/images/camera.svg" alt="사진 촬영" className="ml-auto mt-auto self-end mb-0"/>
                    </div>

                    {/*  사진선택  */}
                    <div className="
                        w-[10.8rem] h-32 bg-white rounded-[0.5rem] text-bara_gray_5 p-4 shadow-lg
                        flex flex-col justify-between
                    ">
                        <div>
                            <p>앨범에서 선택하기</p>
                            <p className="text-[1.2rem] font-medium">사진 선택</p>
                        </div>
                        <img src="/images/image.svg" alt="사진 선택" className="ml-auto mt-auto self-end mb-0"/>
                    </div>
                </div>
            </div>

            {/* 하단 섹션 */}
            <div className="pl-8 pr-8 mt-20">
                {/* 팁 게시판 바로가기 */}
                <div className="w-full h-24 bg-white rounded-[0.5rem] shadow-lg p-4 text-bara_sodomy">
                    <div>
                        <p>청소 꿀팁을 알고싶다면</p>
                        <p className="text-[1.2rem] font-medium">팁 게시판 바로가기</p>
                    </div>
                    <img src="/images/arrow-right-short.svg" alt="사진 선택" className="ml-auto mt-auto self-end mb-0"/>
                </div>

                <div className="w-full h-24 bg-bara_light_blue rounded-[0.5rem] shadow-lg p-4 text-bara_sodomy mt-4">
                    <p>끝내주는 청소</p>
                    <p className="text-[1.2rem] font-medium">오늘의 욕실청소 특가</p>
                </div>
            </div>

            {/*  탭바  */}
            <TabBar/>
        </div>
    );
}

export default MainPage;