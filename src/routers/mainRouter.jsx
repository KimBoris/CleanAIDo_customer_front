import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import myPageRouter from "./myPageRouter.jsx";
import productRouter from "./productRouter.jsx";



const MainPage = lazy(() => import("../pages/MainPage"));
// const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage.jsx"))
// const ProductListPage = lazy(() => import("../pages/product/ProductListPage.jsx"));
// const OrderListPage = lazy(() => import("../pages/order/OrderListPage.jsx"));
// const OrderCreatePage = lazy(() => import("../pages/order/OrderCreatePage.jsx"));
const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    myPageRouter,
    productRouter,

]);

export default mainRouter;