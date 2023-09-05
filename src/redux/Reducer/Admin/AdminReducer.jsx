import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin, createProduct } from "../../../api/server";

const initialState = {
    username: null,
    isLogin : false,
    error: {
        
 username: null,
        password : null
    },

}



// giriş
export const aLogin = createAsyncThunk(
    "admin/aLogin",
    async (creds) => {
        var response;
        await adminLogin(creds).then((res) => {
            response = res.data;
            
        }).catch((err) => {
            response = err.response.data;
         });
        return response;
        
    }
)


export const adminReducer = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = {
                username: null,
                password : null,
                }
                
        },
        aLogout: (state) => {
            state.isLogin = false;
            localStorage.removeItem("isLogin");
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(aLogin.fulfilled, (state, action) => {
             
            state.username = action.meta.arg.username;
            localStorage.setItem("username", state.username);
            state.error = action.payload;
            const err = state.error;
            if (state.error == 200) {
                state.isLogin = true;
                localStorage.setItem("isLogin", "true");
            }
            else {
                state.isLogin = false;
                state.error = err.validationErrors;
               
            }
            console.log(state.isLogin);
        })
       
    }
});
export const { clearError,aLogout } = adminReducer.actions; 
export default adminReducer.reducer;