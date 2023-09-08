import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, userLogin } from "../../../api/server";

const initialState = {
    email: null,
    username : null,
    userIsLogin: false,
    status: null,
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
            localStorage.removeItem("userIsLogin");
            localStorage.removeItem("email");
        }  ,
        clearError: (state) => {
            state.error = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.email = action.meta.arg.email;
            state.error = action.payload;
            console.log(state.error);
            if (state.error?.status == 200) {
                localStorage.setItem("userIsLogin", "true");
                localStorage.setItem("email", state.email);
                state.userIsLogin = true;
                
            } else {
                state.userIsLogin = false;
            }
        }).addCase(userCreate.fulfilled, (state, action) => {
         state.email = action.meta.arg.email;
            state.error = action.payload;
            console.log(state.error);
               if (state.error == 200) {
                   state.status = 200;
            } else {
                   state.status = 404;
            }
            console.log(state.status);
    })
}    
});
export const { logout,clearError } = userReducer.actions;
export default userReducer.reducer;