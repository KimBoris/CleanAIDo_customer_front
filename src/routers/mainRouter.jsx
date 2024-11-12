// src/routers/mainRouter.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.jsx";

const MainPage = lazy(() => import("../pages/MainPage"));
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"));
const OrderListPage = lazy(() => import("../pages/order/OrderListPage.jsx"));
const OrderCreatePage = lazy(() => import("../pages/order/OrderCreatePage.jsx"));

const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    {
        path: "/products",
        element: <Suspense fallback={Loading}><ProductListPage /></Suspense>,
    },
    {
        path: "/order/list",
        element: <Suspense fallback={Loading}><OrderListPage /></Suspense>,
    },
    {
        path: "/order/create",
        element: <Suspense fallback={Loading}><OrderCreatePage /></Suspense>,
    },
]);

export default mainRouter;
