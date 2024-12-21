import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.jsx";
import BoardIndex from "../pages/board/BoardIndexPage.jsx";
import {Navigate} from "react-router-dom";

const BoardList = lazy(() => import("../pages/board/BoardListPage.jsx"));
const BoardRead = lazy(() => import("../pages/board/BoardReadPage.jsx"));
const BoardEdit = lazy(() => import("../pages/board/BoardEditPage.jsx"));
const BoardCreate = lazy(() => import("../pages/board/BoardCreatePage.jsx"));
const Loading = <LoadingPage/>;

const boardRouter = {
    path: "/board",
    element: <Suspense fallback={Loading}><BoardIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><BoardList /></Suspense>,
        },
        {
            path: ":bno",
            element: <Suspense fallback={Loading}><BoardRead /></Suspense>
        },
        {
            path: "",
            element: <Navigate to="list" replace={true}/>
        },
        {
            path:"edit/:bno",
            element: <Suspense fallback={Loading}><BoardEdit/></Suspense>
        },
        {
            path:"register",
            element:<Suspense fallback={Loading}><BoardCreate/></Suspense>
        }

    ]
};

export default boardRouter;

