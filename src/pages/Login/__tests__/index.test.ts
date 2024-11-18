import { login } from '../../../store/slices/authSlice';
import { api } from '../../../services/api';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../store/slices/authSlice';

jest.mock('../../../services/api'); // Мок для API

describe('login thunk', () => {
    it('dispatches actions on successful login', async () => {
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: { token: 'dummy-token', message: 'Successfully login' },
        });

        const store = configureStore({
            reducer: { auth: authReducer },
        });

        await store.dispatch(
            login({ username: 'test', password: 'password' })
        );

        const state = store.getState().auth;
        expect(state.token).toEqual('dummy-token');
        expect(state.error).toBeNull();
    });
});
