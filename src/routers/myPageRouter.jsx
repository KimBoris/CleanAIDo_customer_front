import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";

const OrderListPage = lazy(() => import("../pages/order/OrderListPage.jsx"));
const OrderCreatePage = lazy(() => import("../pages/order/OrderCreatePage.jsx"));
const LoadingPage = lazy(() => import("../pages/LoadingPage.jsx"));

const Loading = <LoadingPage />;

const myPageRouter = {
    path: "/order",
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderListPage /></Suspense>
        },
        {
            path: "create",
            element: <Suspense fallback={Loading}><OrderCreatePage /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default myPageRouter;