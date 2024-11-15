import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";

const CartPage = lazy(() => import("../component/cart/CartPageComponent.jsx"));
const LoadingPage = lazy(() => import("../pages/LoadingPage.jsx"));

const Loading = <LoadingPage />;

const productRouter = {
    path: "/cart",
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: "",
            element: <Suspense fallback={Loading}><CartPage /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="cart" replace={true} />
        }
    ]
};

export default productRouter;
