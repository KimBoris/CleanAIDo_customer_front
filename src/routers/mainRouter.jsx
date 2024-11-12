import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";


const MainPage = lazy(() => import("../pages/MainPage"));
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"))
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage"))
const Loading = <LoadingPage />

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    {
        path: "/product/list",
        element: <Suspense fallback={Loading}><ProductListPage/></Suspense>,
    },
    {
        path: "/product/read/:pno",
        element: <Suspense fallback={Loading}><ProductReadPage/></Suspense>,
    }
])

export default mainRouter;