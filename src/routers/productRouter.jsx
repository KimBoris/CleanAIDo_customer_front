import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import ProductIndex from "../pages/product/ProductIndexPage.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";

const ProductList = lazy(() => import("../pages/product/ProductListPage.jsx"));
const ProductRead = lazy(() => import("../pages/product/ProductReadPage.jsx"));

const Loading = <LoadingPage />;

const productRouter = {
    path: "/product",
    element: <Suspense fallback={Loading}><ProductIndex /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductList /></Suspense>
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ProductRead /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true} />
        }
    ]
};

export default productRouter;
