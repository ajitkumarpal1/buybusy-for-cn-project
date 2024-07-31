import { configureStore } from "@reduxjs/toolkit";
import { homeItamSlice } from "./reducer/homeredux";

export const store = configureStore(
    {
        reducer:{
            homeItam: homeItamSlice.reducer
        }
    }
)