import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed", 
    initialState: null,
    reducers: {
        addData: (state, action) => action.payload
    }
})

export const {addData} = feedSlice.actions

export default feedSlice.reducer