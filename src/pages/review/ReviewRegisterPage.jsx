import ReviewRegisterComponent from "../../component/review/ReviewRegisterComponent.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

function ReviewRegisterPage() {
    return (
        <>
            <NaviBarTitle title={"리뷰 작성"} path={"/mypage/order/list"} />
            <ReviewRegisterComponent />
        </>
    );
}

export default ReviewRegisterPage;