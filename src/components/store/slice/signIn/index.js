import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: JSON.parse(localStorage.getItem("tokens")) ? jwtDecode(JSON.parse(localStorage.getItem("tokens")).token) : {},
    isLogged: false,
}

export const signInSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {
        login: (state) => {
            const token = jwtDecode(JSON.parse(localStorage.getItem("tokens")).token)
            state.user = token
            state.isLogged = true
        },
        logout: (state) => {
            state.user = {}
            state.isLogged = false
        },
        profile: (state, action) => {
            state.user = action.payload
            state.isLogged = true
        },
    }
})

export const { login, logout, profile } = signInSlice.actions

export default signInSlice.reducer;