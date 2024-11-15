import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";

const ProductListPage = lazy(() => import("../pages/product/ProductListPage.jsx"));
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage.jsx"));
const LoadingPage = lazy(() => import("../pages/LoadingPage.jsx"));

const Loading = <LoadingPage />;

const productRouter = {
    path: "/product",
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductListPage /></Suspense>
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ProductReadPage /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default productRouter;
