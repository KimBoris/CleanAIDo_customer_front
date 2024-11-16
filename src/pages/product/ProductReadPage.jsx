import { useState, useEffect } from "react";
import ProductReadComponent from "../../component/product/ProductReadComponent.jsx";
import { useParams, useNavigate } from "react-router-dom";
import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import { addCart, getProductOne } from "../../api/productAPI.js";

function ProductReadPage() {

    return (
        <>
            <NaviBarShop />
            <div className="p-6 bg-gray-50 min-h-screen w-full h-full overflow-y-auto">
                <ProductReadComponent />
            </div>
        </>
    );
}

export default ProductReadPage;
