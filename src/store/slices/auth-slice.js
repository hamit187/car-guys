import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isLoggedIn: false, token: '', email: '' };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.token = action.payload;
            state.isLoggedIn = !!state.token;
        },
        logout(state){
            state.token = null;
            state.isLoggedIn = !!state.token;
        },
        autoLogin(state){
            state.isLoggedIn = true;
        },giveEmail(state, action){
            state.email = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;