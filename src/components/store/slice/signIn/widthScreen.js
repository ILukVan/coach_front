import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    width: window.screen.width

}

export const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        screenWidth: (state) => {
            state.width = window.screen.width
        },

    }
})

export const { screenWidth } = screenSlice.actions

export default screenSlice.reducer;