/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setToken } from '~/utils/token';

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
        getUser: (state) => { },
        getUserSuccess: (state, action) => {
            state.user = { ...action.payload };
            setToken('user', state.user);
        },
        // Khôi phục trạng thái user từ session storage
        restoreUserState: (state, action) => {
            const storedUser = action.payload;
            if (storedUser) {
                state.user = storedUser;
            }
        },
        updateUser: (state, action) => {
            state.user = { ...action.payload.data };
        },
        updateUserSuccess: (state, action) => {
            state.user = { ...action.payload.data };
            setToken('user', state.user);
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
        changePasswordFailure: (state, action) => {
            toast.error(action.payload);
        }
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
