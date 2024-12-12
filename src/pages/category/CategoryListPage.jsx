// import {Outlet} from "react-router-dom";
//
//
//
// function CategoryListPage() {
//     return (
//         <div>
//             <Outlet></Outlet>
//         </div>
//     );
// }
//
// export default CategoryListPage;

import NaviBarShop from "../../component/layout/NaviBarShop.jsx";
import CategoryListComponent from "../../component/category/CategoryListComponent.jsx";
import TabBarShop from "../../component/layout/TabBarShop.jsx";


 const CategoryListPage = () => {
     return (
         <div>
             <NaviBarShop/>
             <CategoryListComponent/>
             <TabBarShop/>
         </div>
     );
 };

 export default CategoryListPage;
