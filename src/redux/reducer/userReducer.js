import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = { userList: [], isLoggedIn: false, userLoggedIn: null };

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (data, thunkAPI) => {
    try {
      const storedUser = JSON.parse(window.localStorage.getItem("user"));

      if (storedUser && storedUser.email === data.email) {
        thunkAPI.dispatch(setLoggedIn(true));
        thunkAPI.dispatch(setUserLoggedIn(storedUser));
        toast.success("Sign In Successfully!!!");
        return storedUser;
      }

      const q = query(
        collection(db, "buybusy-redux"),
        where("email", "==", data.email),
        where("password", "==", data.password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Wrong Username/Password, Try Again");
        return thunkAPI.rejectWithValue("Wrong Username/Password");
      }

      const userData = querySnapshot.docs[0].data();
      userData.id = querySnapshot.docs[0].id;
      console.log("userData", userData);

      thunkAPI.dispatch(setLoggedIn(true));
      thunkAPI.dispatch(setUserLoggedIn(userData));
      window.localStorage.setItem("token", true);
      window.localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Sign In Successfully!!!");
      return userData;
    } catch (error) {
      toast.error("Failed to sign in: " + error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// AsyncThunk for creating a new user in the database
export const createUserThunk = createAsyncThunk(
  "auth/createUser",
  async (data, thunkAPI) => {
    try {
      const q = query(collection(db, "buybusy-redux"), where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return thunkAPI.rejectWithValue("Email address already in use!");
      }

      const docRef = await addDoc(collection(db, "buybusy-redux"), {
        name: data.name,
        email: data.email,
        password: data.password,
        cart: [],
        orders: []
      });

      return { ...data, id: docRef.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define action creators for setting login state and user data
const setLoggedIn = (isLoggedIn) => ({
  type: 'auth/setLoggedIn',
  payload: isLoggedIn,
});

const setUserLoggedIn = (user) => ({
  type: 'auth/setUserLoggedIn',
  payload: user,
});

export const clearUserSession = createAsyncThunk(
  "auth/clearSession",
  async (_, thunkAPI) => {
    try {
      // Clear localStorage
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");

      // Notify user
      toast.success("Logged out successfully");

      // Clear state
      thunkAPI.dispatch(clearSession());
    } catch (error) {
      toast.error("Failed to log out: " + error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const clearSession = () => ({
  type: 'auth/clearSession',
});

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        console.error("User creation failed: ", action.payload);
      })
      .addCase(createSessionThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userLoggedIn = action.payload;
      })
      .addCase(createSessionThunk.rejected, (state, action) => {
        console.error("User sign-in failed: ", action.payload);
      })
      .addCase(clearUserSession.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userLoggedIn = null;
      });
  }
});

export default userReducer.reducer;
