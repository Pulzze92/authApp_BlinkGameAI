import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {AuthState, LoginRequest, AuthResponse, RegisterRequest, RegisterResponse} from '../../types/auth';
import { api } from "../../services/api";
import {AxiosResponse} from "axios";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
            async (credentials: LoginRequest) => {
                const response: AxiosResponse<AuthResponse> = await api.post<AuthResponse>('login', credentials);
                return response.data;
            }
)

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterRequest) => {
        const response: AxiosResponse<RegisterResponse> = await api.post<RegisterResponse>('register', credentials);
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
