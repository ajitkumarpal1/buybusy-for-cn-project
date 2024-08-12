import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const setHomeItemThunk = createAsyncThunk(
  "home/setItem",
  async (res, thunkAPI) => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log("Ajit",response)
      return response.data; // Return only the data
    } catch (error) {
      // Handle rejection and return a rejected value with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const homeItemSlice = createSlice({
  name: 'homeItem',
  initialState,
  reducers: {
    setItems(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setHomeItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setHomeItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setHomeItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setItems } = homeItemSlice.actions;
export default homeItemSlice.reducer;
