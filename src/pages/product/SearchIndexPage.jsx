import {Link, Outlet} from "react-router-dom";

function SearchIndexPage() {
    return (
        <>
            <div>Todo Index Page</div>

            <div>
                <Link to='/product/list'></Link>
                <Link to='/product/read/:pno'></Link>
            </div>

            <div>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default SearchIndexPage;