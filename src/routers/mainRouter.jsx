import { createBrowserRouter } from "react-router-dom";
import {lazy, Suspense} from "react";
import productRouter from "./productRouter.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";
import myPageRouter from "./myPageRouter.jsx";
import cartRouter from "./cartRouter.jsx";
import SearchIndex from "../pages/SearchIndexPage.jsx";

const MainPage = lazy(() => import("../pages/MainPage"));
const ShopMain = lazy(() => import("../pages/ShopMainPage.jsx"));

const Loading = <LoadingPage />;


const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    {
        path: "/search",
        element: <Suspense fallback={Loading}><SearchIndex></SearchIndex></Suspense>
    },
    {
        path: "/shop",
        element: <Suspense fallback={Loading}><ShopMain></ShopMain></Suspense>
    },
    productRouter,
    cartRouter,
    myPageRouter,
]);

export default mainRouter;
