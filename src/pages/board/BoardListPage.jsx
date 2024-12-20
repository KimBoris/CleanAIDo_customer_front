import BoardListComponent from '../../component/board/BoardListComponent.jsx';
import TabBarShop from "../../component/layout/TabBarShop.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

const BoardListPage = () => {
    return (
        <div>
            <NaviBarTitle title={""} path={-1}  />
            <BoardListComponent />
            <TabBarShop></TabBarShop>
        </div>
    );
};

export default BoardListPage;
