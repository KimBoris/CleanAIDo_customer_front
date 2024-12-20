
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import BoardEditComponent from "../../component/board/BoardEditComponent.jsx";

const BoardListPage = () => {
    return (
        <div>
            <NaviBarTitle title={""} path={-1}  />
            <BoardEditComponent />
            <TabBarShop></TabBarShop>
        </div>
    );
};

export default BoardListPage;
