import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getCategoryProduct, getSearchProducts } from "../../../api/server";

const initialState = {
  productList: [],
  error: {
    validationErrors: {
title: null,
    description: null,
    categoryName : null,
    },
    
  },
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
// ürün ekleme
export const addProduct = createAsyncThunk(
    "admin/addProduct",
    async ({username,body}) => {
        var response;
        await createProduct(username, body).
            then((res) => {
              response = res.data;
              console.log(username);
             })
            .catch((err) => {
              response = err.response.data;
              
        })
        return response;
    }
)
// ürün güncelleme
// ürün silme
// ürün arama 

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
  reducers: {
    clearError: (state) => {
      state.error={
    validationErrors: {
title: null,
    description: null,
    categoryName : null,
    },
    
  }
    }
  },
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
      .addCase(addProduct.fulfilled, (state, action) => {
        state.error = action.payload;
        console.log(state.error)
        if (action.payload === 200) {
          state.status = 200;
        } else {
          state.status = "error";
        }
        console.log(state.status);
        
        
    })

  },
});
export const { clearError } = productReducer.actions;

export default productReducer.reducer;