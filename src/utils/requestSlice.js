import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const removeId = action.payload
            const newArray = state.filter(req => {
                if (req._id !== removeId) return req
            })

            return newArray

        },
        clearRequests: (state) => null

    }
})

export const { addRequests, removeRequest, clearRequests } = requestSlice.actions
export default requestSlice.reducer