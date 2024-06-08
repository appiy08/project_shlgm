import { configureStore } from "@reduxjs/toolkit";
// End Dependencies
import cartReducer from "./features/cart/cartSlice";
import addressReducer from "./features/address/addressSlice";
import orderReducer from "./features/order/orderSlice";
// End Reducers Import
const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});

export default store;
