import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducer/Product/ProductReducer";

export const store = configureStore({
    reducer: {
        product : ProductReducer,
    }
});
export default store;