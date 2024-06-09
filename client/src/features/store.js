import { configureStore } from "@reduxjs/toolkit";
// End Dependencies
import cartReducer from "./cart/cartSlice";
import addressReducer from "./address/addressSlice";
import orderReducer from "./order/orderSlice";
import userReducer from "./user/userSlice";
// End Reducers Import
const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
