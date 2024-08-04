import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

// async thunk to get initial Data of cart items and orders placed by user from database
export const getInitialCartOrdersThunk = createAsyncThunk(
  'product/getCartOrders',
  async (_, thunkAPI) => {
    const { userData } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = userData;

    if (isLoggedIn) {
      const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
      return new Promise((resolve) => {
        const unsub = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            thunkAPI.dispatch(setCart(data.cart));
            thunkAPI.dispatch(setMyOrders(data.orders));
          }
        });
        resolve(() => unsub());
      });
    }

    return thunkAPI.getState().cartItem;
  }
);

// Thunk to fetch the initial cart state from Firebase
export const fetchCart = createAsyncThunk(
  "cartList/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const userRef = doc(db, "buybusy-redux", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data().cart || [];
      } else {
        console.error("No such user!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart: ", error);
      return thunkAPI.rejectWithValue("Failed to fetch cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cartList",
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    removeProduct(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    setCart(state, action) {
      return action.payload;
    },
    setMyOrders(state, action) {
      // Handle setting orders if needed, this should be in another slice
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { addProduct, removeProduct, setCart, setMyOrders } = cartSlice.actions;

export const addProductToCart = (userId, product) => async (dispatch) => {
  try {
    const userRef = doc(db, "buybusy-redux", userId);
    await updateDoc(userRef, {
      cart: arrayUnion(product)
    });
    dispatch(addProduct(product));
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};

export const removeProductFromCart = (userId, productId) => async (dispatch) => {
  try {
    const userRef = doc(db, "buybusy-redux", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const currentCart = userSnap.data().cart;
      const productToRemove = currentCart.find(item => item.id === productId);
      await updateDoc(userRef, {
        cart: arrayRemove(productToRemove)
      });
      /* dispatch(removeProduct(productId)); */
    } else {
      console.error("No such user!");
    }
  } catch (error) {
    console.error("Error removing product from cart: ", error);
  }
};

export default cartSlice.reducer;
