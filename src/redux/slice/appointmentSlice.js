/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointments: [], // Admin
        appointmentsByUser: [], // User
        loading: false,
    },
    reducers: {
        // Admin
        fetchAppointments(state) {
            state.loading = true;
        },
        fetchAppointmentsSuccess(state, action) {
            state.loading = false;
            state.appointments = action.payload;
        },
        fetchAppointmentsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        updateAppoimentStatus(state) {
            state.loading = true;
        },
        updateAppoimentStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const appointment = state.appointments.findIndex((appoint) => appoint.id === data.id);
                if (appointment !== -1) {
                    // Object.assign(appointment, data);
                    state.appointments[appointment] = data;
                } else {
                    state.appointments = [data, ...state.appointments];
                }
                toast.success(message);
            }
        },
        updateAppoimentStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        deleteAppointment(state) {
            state.loading = true;
        },
        deleteAppointmentSuccess(state, action) {
            state.loading = false;
            const appointmentId = action.payload;
            state.appointments = state.appointments.filter(appointment => appointment.id !== appointmentId);
            toast.success('Xóa lịch hẹn thành công');
        },
        deleteAppointmentFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // User
        fetchAppointmentsByUser(state) {
            state.loading = true;
        },
        fetchAppointmentsByUserSuccess(state, action) {
            state.loading = false;
            state.appointmentsByUser = action.payload;
        },
        fetchAppointmentsByUserFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        }
    }
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice.reducer;