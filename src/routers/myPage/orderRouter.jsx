import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage.jsx";

const OrderIndex = lazy(() => import("../../pages/order/OrderIndexPage.jsx"));
const OrderList = lazy(() => import("../../pages/order/OrderListPage.jsx"));
const OrderCreate = lazy(() => import("../../pages/order/OrderCreatePage.jsx"));
const OrderComplete = lazy(() =>import("../../pages/order/OrderCompletePage.jsx"))

const Loading = <LoadingPage />;

const OrderRouter = {
    path: "order",
    element: <Suspense fallback={Loading}><OrderIndex /></Suspense>,
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
            path: "complete",
            element: <Suspense fallback={Loading}><OrderComplete /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default OrderRouter;