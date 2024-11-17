/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const motorSlice = createSlice({
    name: 'motor',
    initialState: {
        motors: [],
        motorTemps: [],
        loading: false,
    },
    reducers: {
        handleError(state, action) {
            const error = action.payload;
            toast.error(error);
        },

        // Slice của xe chính
        fetchMotors(state) {
            state.loading = true;
        },
        fetchMotorsSuccess(state, action) {
            state.loading = false;
            state.motors = action.payload;
        },
        fetchMotorsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        addMotor(state, action) {
            state.loading = true;
        },
        addMotorSuccess(state, action) {
            state.loading = false;
            state.motorTemps.push(action.payload);
        },

        // Slice của xe tạm
        fetchMotorTemps(state) {
            state.loading = true;
        },
        fetchMotorTempsSuccess(state, action) {
            state.loading = false;
            state.motorTemps = action.payload;
        },
        fetchMotorTempsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        addMotorTemp(state, action) {
            state.loading = true;
        },
        addMotorTempSuccess(state, action) {
            state.loading = false;
            state.motorTemps.push(action.payload);
        },
    },
});

export const motorActions = motorSlice.actions;
export default motorSlice.reducer;
