import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginRequest, AuthResponse } from '../../types/auth';
import { api } from "../../services/api";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
            async (credentials: LoginRequest) => {
                const response = await api.post<AuthResponse>('login', credentials);
                return response.data;
            }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
