import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import ReviewMyListComponent from "../../component/review/ReviewMyListComponent.jsx";

function ReviewMyListPage() {
    return (
        <div>
            <NaviBarTitle title={"리뷰관리"} path={"/mypage"} />
            <ReviewMyListComponent />
            <TabBarShop />
        </div>
    );
}

export default ReviewMyListPage;