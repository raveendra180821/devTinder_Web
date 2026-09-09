import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => action.payload,
        clearUser: (state) => null

    }
})

export const { addUser, clearUser } = userSlice.actions

export default userSlice.reducer