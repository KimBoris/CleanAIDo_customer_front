import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import useAuthStore from "../../store/authStore";
import RegisterComponent from "../../component/auth/RegisterComponent";

function RegisterPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAccessToken, setRefreshToken, setUser } = useAuthStore();

    const kakaoUser = location.state?.kakaoUser;

    const handleRegister = async (formData) => {
        try {
            const { accessToken, refreshToken, user } = await registerUser(formData);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUser(user);
            navigate("/"); // 메인 페이지로 이동
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return <RegisterComponent kakaoUser={kakaoUser} onRegister={handleRegister} />;
}

export default RegisterPage;
