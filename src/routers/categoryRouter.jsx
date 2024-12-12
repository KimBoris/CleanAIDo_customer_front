import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import {Navigate} from "react-router-dom";

const IndexPage = lazy(() => import("../pages/category/CategoryIndexPage.jsx"));
const CategoryList = lazy(() => import("../pages/category/CategoryListPage.jsx"));

const Loading = <LoadingPage/>;

const categoryRouter = {
    path: "/category",
    element: <Suspense fallback={Loading}><IndexPage/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><CategoryList/></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true}/>
        }
    ]
};

export default categoryRouter;
