import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducer/Product/ProductReducer";
import AdminReducer, { adminReducer } from "./Reducer/Admin/AdminReducer";
import UserReducer from "./Reducer/User/UserReducer";
import CartReducer from "./Reducer/Product/CartReducer";

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        admin: AdminReducer,
        user: UserReducer,
        cart : CartReducer,
    }
});
export default store;