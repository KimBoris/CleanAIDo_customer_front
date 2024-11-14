import { Outlet} from "react-router-dom";


function ProductIndexPage() {
    return (
        <>
            <div></div>

            <div className='flex items-center justify-center gap-3 border-2 rounded-2xl h-1/4 bg-blue-500'>

            </div>

            <div>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default ProductIndexPage;