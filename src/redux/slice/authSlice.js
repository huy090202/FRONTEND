import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { removeAuth, setAuth } from '~/utils/token';

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
            setAuth('auth', {
                auth: state.auth,
                isAuthenticated: state.isAuthenticated,
            });
            toast.success(message);
        },
        loginUserFailure: (state, action) => {
            state.isAuthenticated = false;
            toast.error(action?.payload);
        },
        logoutUser: (state) => {
            removeAuth('auth');
            state.auth = initialState.auth;
            state.isAuthenticated = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
