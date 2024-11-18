import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginRequest, AuthResponse, RegisterRequest, RegisterResponse, User } from '../../types/auth';
import { api } from "../../services/api";
import { AxiosResponse } from "axios";

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

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterRequest) => {
        const response = await api.post<RegisterResponse>('register', credentials);
        return response.data;
    }
)

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchProfile',
    async () => {
        const response = await api.get<User>('/about');
        return response.data;
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
