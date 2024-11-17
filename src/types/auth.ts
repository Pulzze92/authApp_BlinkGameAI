export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface User {
    id: number;
    username: string;
    avatar: string;
    about: string;
}

export interface AuthResponse {
    token: string;
    error: string | null;
    message: string;
}

export interface RegisterResponse extends AuthResponse {}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
