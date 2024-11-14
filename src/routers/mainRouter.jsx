import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import productRouter from "./productRouter.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";
import myPageRouter from "./myPageRouter.jsx";

const MainPage = lazy(() => import("../pages/MainPage"));

const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    productRouter,
    myPageRouter
]);

export default mainRouter;
