import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { removeAuth, setAuth } from '~/utils/token';

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        address: '',
        gender: '',
        role: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleError(state, action) {
            const error = action.payload;
            toast.error(error);
        },
        getUser: (state) => {
            state.user = initialState.user;
        },
        getUserSuccess: (state, action) => {
            state.user = { ...action.payload };
            setAuth('user', state.user);
        },
        updateUser: (state, action) => {
            state.user = { ...action.payload.data };
        },
        updateUserSuccess: (state, action) => {
            state.user = { ...action.payload.data };
            setAuth('user', state.user);
            toast.success(action.payload.message);
        },
        updateUserFailure: (state, action) => {
            toast.error(action.payload);
        },
        changePassword: (state, action) => {
            state.user = { ...action.payload.data };
        },
        changePasswordSuccess: (state, action) => {
            state.user = { ...action.payload.data };
            toast.success(action.payload.message);
        },
        logoutUser: (state) => {
            removeAuth('user');
            state.user = initialState.user;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
