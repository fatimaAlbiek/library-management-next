import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },

        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const { login, setUser, logout } = authSlice.actions;

export default authSlice.reducer;