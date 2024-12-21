import BoardReadComponent from "../../component/board/BoardReadComponent.jsx";
import NaviBarTitle from "../../component/layout/NaviBarTitle.jsx";

function BoardReadPage() {

    return (
        <>
            <NaviBarTitle title={"게시판 조회"} path={-1} />
            <div className="bg-bara_gray_1 min-h-screen w-full overflow-y-auto">
                <BoardReadComponent />
            </div>
        </>
    );
}

export default BoardReadPage;
