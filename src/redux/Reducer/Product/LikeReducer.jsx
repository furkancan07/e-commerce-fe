import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLikeList, minusLike, plusLike } from "../../../api/server";

const initialState = {
    likeList: [],
};
// like atma
export const addLike = createAsyncThunk(
    "like/addLike",
    async ({ id, email }) => {
        var response;
        await plusLike(id, email).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// like geri alma
export const removeLike = createAsyncThunk(
    "like/removeLike",
    async (id) => {
        var response;
        await minusLike(id).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// like listesini getirme
export const getLikes = createAsyncThunk(
    "like/getLikeList",
    async (email) => {
        var response;
        await getLikeList(email).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)


export const likeReducer = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addLike.fulfilled, (state, action) => { console.log(action.payload)})
            .addCase(removeLike.fulfilled, (state, action) => {console.log(action.payload) })
            .addCase(getLikes.fulfilled, (state, action) => {
                console.log(action.payload)
                state.likeList = action.payload.reverse();
            })
        
        
    }
})
export default likeReducer.reducer;