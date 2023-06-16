import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import authSliceReducer from "./slice/authSlice";

const store = configureStore({
    reducer : {
        cart: cartReducer,
        auth: authSliceReducer,
    },
});
export default store;