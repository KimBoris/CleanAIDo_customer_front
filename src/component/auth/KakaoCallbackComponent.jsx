import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

const KakaoCallbackComponent = () => {
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
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);

                if (status === "NEW_USER") {
                    navigate("/oauth/register", { state: { kakaoUser } });
                } else {
                    setUser(kakaoUser); // 기존 사용자 정보 저장
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
};

export default KakaoCallbackComponent;
