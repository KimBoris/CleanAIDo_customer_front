
import { createBrowserRouter } from "react-router-dom";
import {lazy, Suspense} from "react";
import productRouter from "./productRouter.jsx";
import myPageRouter from "./myPageRouter.jsx";
import cartRouter from "./cartRouter.jsx";
import SearchIndex from "../pages/SearchIndexPage.jsx";
import authRouter from "./authRouter.jsx";
import ProtectedRoute from "../component/ProtectedRoute.jsx"
import categoryRouter from "./categoryRouter.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";

const MainPage = lazy(() => import("../pages/MainPage"));
const ShopMain = lazy(() => import("../pages/ShopMainPage.jsx"));

const Loading = <LoadingPage />;


const mainRouter = createBrowserRouter([
    // 인증 필요 없는 경로
    authRouter,

    {
        element: <ProtectedRoute />, // ProtectedRoute 적용
        children: [
            {
                path: "/",
                element: <Suspense fallback={Loading}><MainPage /></Suspense>,
            },
            {
                path: "/search",
                element: <Suspense fallback={Loading}><SearchIndex /></Suspense>,
            },
            {
                path: "/shop",
                element: <Suspense fallback={Loading}><ShopMain></ShopMain></Suspense>
            },
            productRouter, // 상품 라우터
            cartRouter,    // 장바구니 라우터
            myPageRouter,  // 마이페이지 라우터
            categoryRouter,
        ],
    },

    {
        path: "*",
        element: <div>404 Not Found</div>, // Fallback 경로
    },
]);

export default mainRouter;
