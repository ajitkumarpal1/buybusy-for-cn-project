import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

export const homeItamSlice = createSlice({
    name: 'homeItem',
    initialState,
    reducers: {
        setItam(state,action){
            state.data = [...action.payload]
        }
    }
})