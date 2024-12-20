import { Outlet} from "react-router-dom";


function BoardIndexPage() {
    return (
        <>
            <div>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default BoardIndexPage;