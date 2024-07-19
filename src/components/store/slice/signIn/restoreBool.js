import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isRestored: false,
}

export const restoreSlice = createSlice({
    name: 'restore',
    initialState,
    reducers: {
        sendKey: (state) => {
            state.isRestored = true
        },
        veryfyKey: (state) => {
            state.isRestored = false
        },

    }
})

export const {sendKey, veryfyKey } = restoreSlice.actions

export default restoreSlice.reducer;