import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import {createBrowserRouter} from "react-router-dom";

const Loading = <LoadingPage></LoadingPage>
const OrderListPage = lazy(() => import("../pages/order/OrderListPage.jsx"))
const OrderCreatePage = lazy(() => import("../pages/order/OrderCreatePage.jsx"))


const myPageRouter = createBrowserRouter([

    {
        path: "/order/list",
        element: <Suspense fallback={Loading}><OrderListPage /></Suspense>,
    },
    {
        path: "/order/create",
        element: <Suspense fallback={Loading}><OrderCreatePage /></Suspense>,
    },
]);

export default myPageRouter;