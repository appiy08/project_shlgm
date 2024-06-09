import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  addToCartAPI,
  getCartAPI,
  removeCartItemAPI,
} from "../../lib/actions/purchase";

export const addToCart = createAsyncThunk("cart/addToCart", async (values) => {
  const response = await addToCartAPI(values);
  return response;
});

export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async (userId) => {
    const response = await getCartAPI(userId);
    return response;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (userId) => {
    const response = await removeCartItemAPI(userId);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(...get(action, "payload.data.items", []));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.items", []);
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = get(action, "payload.data.items", []);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
