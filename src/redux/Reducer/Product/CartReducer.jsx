import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteCart, getCartList } from "../../../api/server";


const initialState = {
    cartProductList: [],
    quantity: 0,
    totalPrice: 0,
    
};


// sepete ekleme
export const addToCart = createAsyncThunk(
    "user/addCart",
    async ({email, id}) => {
        var response;
        await addCart(email,id).then((res) => {
            response = res.data;
        }).catch((err) => { 
            response = err.response.data;
        });
        return response;
    }
)
// sepetten kaldirma
export const deleteBasket = createAsyncThunk(
    "user/deleteCart",
        async (id) => {
        var response;
        await deleteCart(id).then((res) => {
            response = res.data;
        }).catch((err) => { 
            response = err.response.data;
        });
        return response;
    } 
)
// sepettekilerin listesini getirme
export const getCartToList = createAsyncThunk(
    "user/getCartList",
    async (email) => {
        var response;
        await getCartList(email).then((res) => {
            response = res.data;
        }).catch((err) => { 
            response = err.response.data;
        });
        return response;
    }
)



export const cartReducer = createSlice({
    name: "cart",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log(action);
        })
            .addCase(getCartToList.fulfilled, (state, action) => {
                state.cartProductList = action.payload;
                
                state.totalPrice = 0;
                  state.cartProductList.forEach((cart) => {
                state.totalPrice += cart.product.price;
                  }) 
                state.quantity = state.cartProductList.length;
                
                console.log(state.cartProductList);
            })
           
            .addCase(deleteBasket, (state, action) => {
                console.log(action);
        })
    }
    
})

export default cartReducer.reducer;