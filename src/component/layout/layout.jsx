import Navbar from "../newBar/navBar";
import HomeItems from "../homeItems/homeItems";
import { Outlet } from "react-router-dom";

export const Layout = ()=>(
    <>
    <div className="bg-blue-900 min-h-screen min-w-full absolute">
        <Navbar />
        <div className="bg-blue-600 mt-5 p-4 shadow-lg shadow-blue-950 sm:rounded-none md:m-6 md:rounded-3xl lg:m-10 min-h-60">
        
            <Outlet />
            
        </div>
    </div>
        
    </>
)