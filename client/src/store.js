import { configureStore } from "@reduxjs/toolkit";
// End Dependencies
import cartReducer from "./features/cart/cartSlice";
import addressReducer from "./features/address/addressSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;
