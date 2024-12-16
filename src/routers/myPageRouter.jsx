import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import orderRouter from "./myPage/orderRouter.jsx";
import reviewRouter from "./myPage/reviewRouter.jsx";

const MyIndex = lazy(() => import("../pages/myPage/MyPageIndexPage.jsx"));
const MyMain = lazy(() => import("../pages/myPage/MyPageMainPage.jsx"));

const Loading = <LoadingPage />;

const myPageRouter = {
    path: "/mypage",
    element: <Suspense fallback={Loading}><MyIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Suspense fallback={Loading}><MyMain /></Suspense>,
        },
        orderRouter,
        reviewRouter,
    //  마이페이지에 들어갈 메뉴들 추가
    ]
};

export default myPageRouter;