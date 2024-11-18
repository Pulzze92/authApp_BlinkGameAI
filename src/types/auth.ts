export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface User {
    data: {
        id: number;
        username: string;
        avatar: string;
        about: string | null;
    }
}

export interface AuthResponse {
    error: string | null;
    token: string | null;
}

export interface RegisterResponse {
    error?: string;
    message?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
