import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    isLogged: false,
}

export const signInSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isLogged = true

        }
    }
})

export const { login } = signInSlice.actions

export default signInSlice.reducer;