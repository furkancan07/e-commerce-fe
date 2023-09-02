import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, userLogin } from "../../../api/server";

const initialState = {
    email: null,
    username : null,
    userIsLogin: false,
    error: {
        email: null,
        password : null,
    }   
};
// giriş
export const loginUser = createAsyncThunk(
    "user/login",
    async (creds) => {
        var response;
        await userLogin(creds).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// kayıt,
export const userCreate = createAsyncThunk(
    "user/create",
    async (body) => {
        var response;
        await createUser(body).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
     }

)
// şifremi unuttum
export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.userIsLogin = false;
      }  
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.email = action.meta.arg.email;
            state.error = action.payload;
            console.log(state.error);
            if (state.error?.status == 200) {
                state.userIsLogin = true;
            } else {
                state.userIsLogin = false;
            }
    })
}    
});
export const { logout } = userReducer.actions;
export default userReducer.reducer;