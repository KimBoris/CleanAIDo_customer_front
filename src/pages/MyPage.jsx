import {Outlet} from "react-router-dom";
import NaviBarTitle from "../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../component/layout/TabBarShop.jsx";

function MyPage() {
    return (
        <div>
            <NaviBarTitle title={"마이페이지"} path={"/shop"} />
            <Outlet />
            <TabBarShop />
        </div>
    );
}

export default MyPage;