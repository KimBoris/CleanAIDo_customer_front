import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.jsx";

createRoot(document.getElementById('root')).render(
    <div className="font-sans">
        <RouterProvider router={mainRouter}></RouterProvider>
    </div>


)
