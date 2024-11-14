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
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage.jsx"))
const ProductListPage = lazy(() => import("../pages/product/ProductListPage.jsx"));
const OrderListPage = lazy(() => import("../pages/order/OrderListPage.jsx"));
const OrderCreatePage = lazy(() => import("../pages/order/OrderCreatePage.jsx"));
const CartPage = lazy(() => import("../pages/cart/CartPage.jsx"));

const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    myPageRouter,
    productRouter,

    {
        path: "/product/list",
        element: <Suspense fallback={Loading}><ProductListPage/></Suspense>,
    },
    {
        path: "/product/read/:pno",
        element: <Suspense fallback={Loading}><ProductReadPage/></Suspense>,
    },
    {
        path: "/order/list",
        element: <Suspense fallback={Loading}><OrderListPage /></Suspense>,
    },
    {
        path: "/order/create",
        element: <Suspense fallback={Loading}><OrderCreatePage /></Suspense>,
    },
    {
        path: "/cart",
        element: <Suspense fallback={Loading}><CartPage /></Suspense>,
    },
]);

export default mainRouter;