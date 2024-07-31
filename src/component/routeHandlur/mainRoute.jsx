import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import { Home } from "../home/Home";
import { Layout } from "../layout/layout";
import { Login } from "../login/login";
import { Signup } from "../singup/signup";
import HomeItems from "../homeItems/homeItems";

const routs = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <><HomeItems /><Home /></>
                }   
            ]
        }, 
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        }
    ]
)

export const AppRout = () => {
    return (
        <>
            <RouterProvider router={routs} />
        </>)
}
