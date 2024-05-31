import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        // token: null,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            // state.token = action.payload.token;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoggedIn = false;
            // state.token = null;
            state.error = action.payload.error;
        },
        login: (state, action) => {
            state = action.payload;
        }
    },
});

export const { loginSuccess, loginFailure, login } = authenticationSlice.actions;
export default authenticationSlice.reducer;