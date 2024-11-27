import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.jsx";
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
    <div className="font-sans">
        <RouterProvider router={mainRouter}></RouterProvider>
        <App />
    </div>


)
