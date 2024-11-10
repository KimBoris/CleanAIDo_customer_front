
function TabBar() {
    return (
        <div className="
                fixed bottom-0 left-0 w-full h-[6.25rem] bg-white text-bara_sodomy flex justify-around items-start
                ">
            <button className="flex-1 flex justify-center pt-[1.1rem]">
                <img src="/images/list.png" alt="카테고리"/>
            </button>
            <button className="flex-1 flex justify-center pt-4">
                <img src="/images/search.png" alt="검색"/>
            </button>
            <button className="w-16 h-16 flex justify-center items-center bg-bara_blue rounded-full">
                <img src="/images/shop-window.png" alt="쇼핑몰"/>
            </button>
            <button className="flex-1 flex justify-center pt-4">
                <img src="/images/cart-dash.png" alt="장바구니"/>
            </button>
            <button className="flex-1 flex justify-center pt-[1.1rem]">
                <img src="/images/person.png" alt="마이페이지"/>
            </button>
        </div>
    );
}

export default TabBar;