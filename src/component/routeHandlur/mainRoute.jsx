import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../home/Home";
import { Layout } from "../layout/layout";
import { Login } from "../login/login";
import { Signup } from "../singup/signup";
import HomeItems from "../homeItems/homeItems";
import Cart from "../cart/cart";
import { PageNotFound } from "../404/404";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSessionThunk } from "../../redux/reducer/userReducer";
import { Profile } from "../profile/profile";
import { Orders } from "../orders/orders";
import { getInitialCartOrdersThunk } from "../../redux/reducer/cartItemredicer";


const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <><HomeItems /><Home /></>
                },
                {
                    path: "cart",
                    element: <Cart />
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path: "*",
                    element: <PageNotFound />
                },
                {
                    path:"orders",
                    element: <Orders />
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
);

export const AppRout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function login() {
            try {
                const userData = JSON.parse(window.localStorage.getItem("user"));
                if (userData) {
                    await dispatch(createSessionThunk({ email: userData.email, password: userData.password }));
                    await dispatch(getInitialCartOrdersThunk())
                }
            } catch (error) {
                console.log("Error during auto-login:", error);
            }
        }

        login();
    }, [dispatch]);

    return (
        <RouterProvider router={routes} />
    );
};
