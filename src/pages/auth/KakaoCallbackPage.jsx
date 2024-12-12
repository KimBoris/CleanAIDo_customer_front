import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/authAPI.js";
import useAuthStore from "../../store/authStore";

function KakaoCallbackPage() {
    const navigate = useNavigate();
    const { setAccessToken, setRefreshToken, setUser } = useAuthStore();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            console.error("Authorization code is missing.");
            navigate("/oauth/login");
            return;
        }

        kakaoLogin(code)
            .then(({ status, kakaoUser, accessToken, refreshToken }) => {
                if (status === "NEW_USER") {
                    // 신규 사용자: 회원가입 페이지로 이동
                    navigate("/oauth/register", { state: { kakaoUser } });
                } else {
                    // 기존 사용자: 로그인 처리
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setUser(kakaoUser);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("카카오 로그인 실패:", error);
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
                navigate("/oauth/login");
            });
    }, [navigate, setAccessToken, setRefreshToken, setUser]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>로그인 중입니다...</p>
        </div>
    );
}

export default KakaoCallbackPage;
