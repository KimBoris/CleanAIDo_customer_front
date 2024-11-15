import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";

const Cart = lazy(() => import("../pages/cart/CartPage.jsx"));

const Loading = <LoadingPage />;

const productRouter = {
    path: "/cart",
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: "",
            element: <Suspense fallback={Loading}><Cart/></Suspense>
        },
        {
            path: "",
            element: <Navigate to="cart" replace={true} />
        }
    ]
};

export default productRouter;
