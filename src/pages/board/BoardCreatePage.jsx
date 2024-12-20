
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";
import BoardCreate from "../../component/board/BoardCreateComponent.jsx";

const BoardListPage = () => {
    return (
        <div>
            <NaviBarTitle title={""} path={-1}  />
            <BoardCreate />
            <TabBarShop></TabBarShop>
        </div>
    );
};

export default BoardListPage;
