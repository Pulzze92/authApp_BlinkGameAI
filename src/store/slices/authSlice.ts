import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    username: string | null;
}

const initialState: AuthState = {
    token: null,
    username: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        logout(state) {
            state.token = null;
            state.username = null;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
