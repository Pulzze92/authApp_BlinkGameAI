import authReducer, { authSlice, logout } from "../authSlice";
import { AuthState } from "../../../types/auth";
import { User } from '../../../types/auth';

describe('authSlice reducer', () => {
    const initialState: AuthState = {
        user: null,
        token: null,
        isLoading: false,
        error: null,
    };

    it('should handle logout', () => {
        const state = authReducer(
            { ...initialState, token: 'dummy-token' },
            logout()
        );
        expect(state.token).toBeNull();
        expect(state.user).toBeNull();
    });
});

test('logout action resets auth state', () => {
    const newUser: User = {
        id: 15648,
        username: 'Alex',
        avatar: 'abc123',
        about: 'abcdefg123'
    };
    const previousState: AuthState = {
        user: newUser,
        token: 'abc',
        isLoading: false,
        error: null
    };

    expect(authSlice.reducer(previousState, logout())).toEqual({
        user: null,
        token: null,
        isLoading: false,
        error: null,
    });
});
