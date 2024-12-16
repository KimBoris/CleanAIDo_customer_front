import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        const clientId = "bd7725f821010811fbfbb131b8f9985d"; // REST API 키
        const redirectUri = "http://localhost:5173/oauth/kakao/callback"; // Redirect URI
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 이동
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-bara_gray_1 via-white to-bara_gray_2">
            {/* 메인 컨테이너 */}
            <div className="flex flex-col items-center w-full max-w-md p-8 space-y-8">
                {/* 타이틀 로고 */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/cleanaido_logo_sm.svg"
                        alt="청소 AI 하니 로고"
                        className="w-40"
                    />
                </div>

                {/* 설명 */}
                <p className="text-bara_gray_5 text-sm leading-6 text-center">
                    <span className="font-bold">AI 싹싹바라</span>가<br />
                    적재적소에 추천해주는 청소용품
                </p>

                {/* 메인 이미지 */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/baras.png"
                        alt="청소 AI 하니 캐릭터"
                        className="w-48"
                    />
                </div>

                {/* 카카오 로그인 버튼 */}
                <button
                    onClick={handleKakaoLogin}
                    className="w-full flex items-center justify-center py-3 text-bara_sodomy font-medium rounded-lg bg-yellow-400 hover:bg-yellow-500 transition duration-300"
                >
                    <img
                        src="/images/kakao_icon.png"
                        alt="카카오 아이콘"
                        className="w-5 h-5 mr-2"
                    />
                    카카오 계정으로 로그인
                </button>
            </div>
        </div>
    );
};

export default LoginComponent;
