import SearchComponent from "../component/search/SearchComponent.jsx";
import TabBarShop from "../component/layout/TabBarShop.jsx";
import NaviBarTitle from "../component/layout/NaviBarTitle.jsx";

function SearchIndexPage() {
    return (
        <>
            <NaviBarTitle/>
            <div className="bg-bara_gray_1 min-h-screen w-full overflow-y-auto">
                <SearchComponent></SearchComponent>
            </div>
            <TabBarShop></TabBarShop>

        </>
    );
}

export default SearchIndexPage;