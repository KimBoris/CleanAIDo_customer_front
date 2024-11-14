import {Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import ProductIndexPage from "../pages/product/ProductIndexPage.jsx";

const ProductListPage = lazy(() => import("../pages/product/ProductListPage"));
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage.jsx"));
const Loading = lazy(() => import("../pages/LoadingPage.jsx"));

const productRouter ={
    path: "/product",
    element: <Suspense fallback={Loading}><ProductIndexPage/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductListPage/></Suspense>
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ProductReadPage/></Suspense>
        },
        {
            path: "",
            element:<Navigate to='list' replace={true}></Navigate>
        }
    ]
}


export default productRouter;