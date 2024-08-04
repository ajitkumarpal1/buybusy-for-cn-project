import { configureStore } from "@reduxjs/toolkit";
import homeItamRedux from "./reducer/homereducer";
import cartItemRedux from "./reducer/cartItemredicer";
import userReducer from "./reducer/userReducer";
export const store = configureStore(
    {
        reducer:{
            homeItam: homeItamRedux,
            cartItem: cartItemRedux,
            userData:userReducer
        }
    }
)