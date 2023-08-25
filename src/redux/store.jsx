import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducer/Product/ProductReducer";
import AdminReducer, { adminReducer } from "./Reducer/Admin/AdminReducer";

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        admin : AdminReducer,
    }
});
export default store;