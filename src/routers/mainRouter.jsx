import { createBrowserRouter } from "react-router-dom";
import {lazy, startTransition, Suspense} from "react";
import productRouter from "./productRouter.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";
import myPageRouter from "./myPageRouter.jsx";
import cartRouter from "./cartRouter.jsx";
import SearchIndexPage from "../pages/SearchIndexPage.jsx";

const MainPage = lazy(() => import("../pages/MainPage"));

const Loading = <LoadingPage />;


const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    {
        path: "/search",
        element: <Suspense fallback={Loading}><SearchIndexPage></SearchIndexPage></Suspense>
    },
    productRouter,
    myPageRouter,
    cartRouter
]);

export default mainRouter;
