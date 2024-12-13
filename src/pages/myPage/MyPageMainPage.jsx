import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import MyPageComponent from "../../component/myPage/MyPageComponent.jsx";

function MyPageMainPage() {
    return (
        <div>
            <NaviBarTitle title={"마이페이지"} path={"/shop"} />
            <MyPageComponent />
            <TabBarShop/>
        </div>
    );
}

export default MyPageMainPage;