import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    name: string | null;
};

const initialState: AuthState = {
    token: null,
    name: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (
            state,
            action: PayloadAction<{ token: string; name: string }>
        ) => {
            state.token = action.payload.token;
            state.name = action.payload.name;
        },
        logout: (state) => {
            state.token = null;
            state.name = null;
        }
    }
});

export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;