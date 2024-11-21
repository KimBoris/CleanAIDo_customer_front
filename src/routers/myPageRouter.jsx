import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import orderRouter from "./myPage/orderRouter.jsx";

const MyIndex = lazy(() => import("../pages/MyPage.jsx"));

const Loading = <LoadingPage />;

const myPageRouter = {
    path: "/mypage",
    element: <Suspense fallback={Loading}><MyIndex /></Suspense>,
    children: [
        orderRouter,
    //  마이페이지에 들어갈 메뉴들 추가
    ]
};

export default myPageRouter;