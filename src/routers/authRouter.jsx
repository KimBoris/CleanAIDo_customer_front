import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.jsx";

const LoginPage = lazy(() => import("../pages/auth/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage.jsx"));
const KakaoCallbackPage = lazy(() => import("../pages/auth/KakaoCallbackPage.jsx"));

const Loading = <LoadingPage />;

const authRouter = {
    path: "/oauth",
    children: [
        {
            path: "login",
            element: <Suspense fallback={Loading}><LoginPage /></Suspense>,
        },
        {
            path: "register",
            element: <Suspense fallback={Loading}><RegisterPage /></Suspense>,
        },
        {
            path: "kakao/callback",
            element: <Suspense fallback={Loading}><KakaoCallbackPage /></Suspense>,
        },
        {
            path: "",
            element: <Navigate to="login" replace={true} />,
        },
    ],
};

export default authRouter;
