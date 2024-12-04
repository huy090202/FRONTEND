/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointments: { data: [], loading: false, totalPages: 0 }, // Admin
        appointmentsByUser: { data: [], loading: false, totalPages: 0 }, // User
        total: 0,
        page: 1,
        limit: 5,
    },
    reducers: {
        // Admin
        fetchAppointments(state, action) {
            state.appointments.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchAppointmentsSuccess(state, action) {
            state.appointments.loading = false;
            const { data, total, limit } = action.payload;
            state.appointments.data = data;
            state.total = total;
            state.appointments.totalPages = Math.ceil(total / limit);
        },
        fetchAppointmentsFailure(state, action) {
            state.appointments.loading = false;
            toast.error(action.payload);
        },

        updateAppoimentStatus(state) {
            state.appointments.loading = true;
        },
        updateAppoimentStatusSuccess(state, action) {
            state.appointments.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const appointment = state.appointments.data.findIndex((appoint) => appoint.id === data.id);
                if (appointment !== -1) {
                    // Object.assign(appointment, data);
                    state.appointments.data[appointment] = data;
                } else {
                    state.appointments.data = [data, ...state.appointments.data];
                }
                toast.success(message);
            }
        },
        updateAppoimentStatusFailure(state, action) {
            state.appointments.loading = false;
            toast.error(action.payload);
        },

        deleteAppointment(state) {
            state.appointments.loading = true;
        },
        deleteAppointmentSuccess(state, action) {
            state.appointments.loading = false;
            const { appointmentId, message } = action.payload;
            state.appointments.data = state.appointments.data.filter(appointment => appointment.id !== appointmentId);
            toast.success(message);
        },
        deleteAppointmentFailure(state, action) {
            state.appointments.loading = false;
            toast.error(action.payload);
        },

        // User
        fetchAppointmentsByUser(state, action) {
            state.appointmentsByUser.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchAppointmentsByUserSuccess(state, action) {
            state.appointmentsByUser.loading = false;
            const { data, total, limit } = action.payload;
            state.appointmentsByUser.data = data;
            state.total = total;
            state.appointmentsByUser.totalPages = Math.ceil(total / limit);
        },
        fetchAppointmentsByUserFailure(state, action) {
            state.appointmentsByUser.loading = false;
            toast.error(action.payload);
        },

        deleteAppointmentByUser(state) {
            state.appointmentsByUser.loading = true;
        },
        deleteAppointmentByUserSuccess(state, action) {
            state.appointmentsByUser.loading = false;
            const { appointmentId, message } = action.payload;
            state.appointmentsByUser.data = state.appointmentsByUser.data.filter(appointment => appointment.id !== appointmentId);
            toast.success(message);
        },
        deleteAppointmentByUserFailure(state, action) {
            state.appointmentsByUser.loading = false;
            toast.error(action.payload);
        },
    }
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice.reducer;