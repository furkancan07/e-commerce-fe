import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryProduct, getSearchProducts } from "../../../api/server";

const initialState = {
  productList: [],
  searchProduct: [],
   status: "idle", 
};

export const getCategoryProductList = createAsyncThunk(
  "product/fetchProducts",
  
  async (category) => {
    try {
      const response = await getCategoryProduct(category);
    return response.data;
    }
    catch (err) {
      throw err;
    }
    
  }
);
export const getSearchProductList = createAsyncThunk(
  "product/searchProduct",
  
  async (value) => {
    try {
      const response = await getSearchProducts(value);
      
      return response.data;
    }
    catch (err) {
      throw err;
    }
  }
)

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryProductList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCategoryProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
       
        state.productList = action.payload;
      })
      .addCase(getCategoryProductList.rejected, (state) => {
        state.status = "failed";
      })
    .addCase(getSearchProductList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getSearchProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
      })
      .addCase(getSearchProductList.rejected, (state) => {
        state.status = "failed";
      })

  },
});

export default productReducer.reducer;