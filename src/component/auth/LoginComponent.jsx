import React from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        const clientId = "bd7725f821010811fbfbb131b8f9985d"; // REST API 키
        const redirectUri = "cleanaido-customer-1708095652.ap-northeast-2.elb.amazonaws.com/oauth/kakao/callback"; // Redirect URI
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 이동
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-bara_gray_1">
            {/* 로그인 박스 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                {/* 로고 */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/images/cleanaido_logo_sm.svg"
                        alt="CleanAI하니 로고"
                        className="w-40"
                    />
                </div>

                {/* 제목 */}
                <h2 className="text-bara_sodomy text-2xl font-medium mb-4">
                    청소AI하니에 오신 것을 환영합니다!
                </h2>

                {/* 설명 */}
                <p className="text-bara_gray_5 mb-8 text-sm">
                    로그인 후 맞춤형 청소 솔루션을 받아보세요.
                </p>

                {/* 카카오 로그인 버튼 */}
                <button
                    onClick={handleKakaoLogin}
                    className="w-full py-3 bg-yellow-400 text-white font-medium rounded-lg shadow hover:bg-yellow-500 transition duration-300"
                >
                    카카오로 로그인하기
                </button>

                {/* 회원가입 버튼 */}
                <button
                    onClick={handleKakaoLogin}
                    className="w-full py-3 mt-4 bg-bara_blue text-white font-medium rounded-lg shadow hover:bg-bara_sky_blue transition duration-300"
                >
                    카카오로 회원가입하기
                </button>
            </div>
        </div>
    );
};

export default LoginComponent;
