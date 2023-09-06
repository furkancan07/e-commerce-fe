import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment, getCommentList } from "../../../api/server";


const initialState = {
    commentList: [],
    status : "404"
};
// yorum ekle

export const createComment = createAsyncThunk(
    "user/addComment",
    async ({ email, id, body }) => {
        var response;
        await addComment(email, id, body).then((res) => {
            response = res.data;
         }).
            catch((err) => {
                response = err.response.data;
            })
        return response;
    }
)
// yorumları getir
export const getComments = createAsyncThunk(
    "user/getComment",
    async (id) => {
        var response;
        await getCommentList(id).then((res) => {
            response = res.data;
         }).
            catch((err) => {
                response = err.response.data;
            })
        return response;
    }
)
// yorum sil
export const deleteToComment = createAsyncThunk(
    "user/deleteComment",
    async (id) => {
        var response;
        await deleteComment(id).then((res) => {
            response = res.data;
         }).
            catch((err) => {
                response = err.response.data;
            })
        return response;
    }
)


export const commentReducer = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createComment.fulfilled, (state, action) => { 
            console.log(action.payload);
            if (action.payload === "Yorum Eklendi") {
                state.status=200
            }
            else {
                state.status=400
            }
            console.log(state.status)
        })
            .addCase(getComments.fulfilled, (state, action) => { 
                
                state.commentList = action.payload.reverse();
               
            })
            .addCase(deleteToComment.fulfilled, (state, action) => {
                console.log(action.payload);
                
        })
    }
})
export default commentReducer.reducer;