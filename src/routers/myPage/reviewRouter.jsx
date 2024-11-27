import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage.jsx";

const ReviewIndex = lazy(() => import("../../pages/review/ReviewIndexPage.jsx"));
const ReviewMyList = lazy(() => import("../../pages/review/ReviewMyListPage.jsx"));
const ReviewRegister = lazy(() => import("../../pages/review/ReviewRegisterPage.jsx"));

const Loading = <LoadingPage />;

const OrderRouter = {
    path: "review",
    element: <Suspense fallback={Loading}><ReviewIndex /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ReviewMyList/></Suspense>
        },
        {
            path: "register",
            element: <Suspense fallback={Loading}><ReviewRegister/></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default OrderRouter;