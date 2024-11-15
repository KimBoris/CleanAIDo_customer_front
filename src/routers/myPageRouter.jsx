import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";

const OrderList = lazy(() => import("../pages/order/OrderListPage.jsx"));
const OrderCreate = lazy(() => import("../pages/order/OrderCreatePage.jsx"));

const Loading = <LoadingPage />;

const myPageRouter = {
    path: "/order",
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderList/></Suspense>
        },
        {
            path: "create",
            element: <Suspense fallback={Loading}><OrderCreate /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default myPageRouter;