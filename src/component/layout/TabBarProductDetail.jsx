import TabBarMain from "./TabBarMain.jsx";


function TabBarProductDetail() {
    return (

        <>
            <div className="
                    fixed bottom-[6.25rem] left-0 w-full h-[4rem] bg-gray-200 flex justify-around items-center
                    ">
                {/* 원하는 요소들을 여기에 추가하세요 */}
                <button className="flex-1 h-[3rem] flex justify-center border-2 bg-blue-700">
                    <span>구매</span>
                </button>
                <button className="flex-1 h-[3rem] flex justify-center border-2 bg-red-500">
                    <span>장바구니 담기</span>
                </button>
            </div>

            <TabBarMain />
        </>
    );
}

export default TabBarProductDetail;