import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("accessToken"); // JWT를 로컬 스토리지에서 가져옴

    if (!token) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        return <Navigate to="/oauth/login" replace />; // 로그인 페이지로 리다이렉트
    }

    return <Outlet />; // 인증된 사용자는 자식 컴포넌트 렌더링
};

export default ProtectedRoute;
