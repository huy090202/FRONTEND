import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { removeToken, setToken } from '~/utils/token';

const initialState = {
    auth: {
        name: '',
        email: '',
        access_token: '',
    },
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleError(state, action) {
            const error = action.payload;
            toast.error(error);
        },
        loginUser: (state) => {
            state.isAuthenticated = false;
        },
        loginUserSuccess: (state, action) => {
            const { data, message } = action.payload;
            state.auth.name = data?.name;
            state.auth.email = data?.email;
            state.auth.access_token = data?.access_token;
            state.isAuthenticated = true;
            setToken('auth', {
                auth: state.auth,
                isAuthenticated: state.isAuthenticated,
            });
            toast.success(message);
        },
        // Khôi phục trạng thái auth từ session storage
        restoreAuthState: (state, action) => {
            const storedAuth = action.payload;
            if (storedAuth) {
                state.auth = storedAuth.auth;
                state.isAuthenticated = storedAuth.isAuthenticated;
            }
        },
        loginUserFailure: (state, action) => {
            state.isAuthenticated = false;
            toast.error(action?.payload);
        },
        logoutUser: (state) => {
            removeToken('auth');
            removeToken('user');
            removeToken('activeId');
            state.auth = initialState.auth;
            state.isAuthenticated = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
