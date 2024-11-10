import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";


const MainPage = lazy(() => import("../pages/MainPage"));

const Loading = <LoadingPage />

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
])

export default mainRouter;