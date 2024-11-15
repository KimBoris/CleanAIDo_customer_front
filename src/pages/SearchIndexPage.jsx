import SearchComponent from "../component/search/SearchComponent.jsx";
import NaviBarShop from "../component/layout/NaviBarShop.jsx";
import TabBarShop from "../component/layout/TabBarShop.jsx";

function SearchIndexPage() {
    return (
        <>
            <NaviBarShop></NaviBarShop>
            <SearchComponent></SearchComponent>
            <TabBarShop></TabBarShop>

        </>
    );
}

export default SearchIndexPage;