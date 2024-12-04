import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredAppointments = createSelector(
    [
        (state) => state.appointment.appointments.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
    ],
    (appointments, searchQuery, statusFilter) => {
        return appointments
            .filter((appointment) => {
                const fullName = `${appointment?.user?.lastName} ${appointment?.user?.firstName}`.toLowerCase();
                return (
                    !searchQuery ||
                    appointment?.motor?.motor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    appointment?.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    fullName.includes(searchQuery.toLowerCase())
                );
            })
            .filter((appointment) =>
                statusFilter === 'all' || String(appointment.status) === statusFilter
            );
    }
);

export const selectFilteredAppointmentsUser = createSelector(
    [
        (state) => state.appointment.appointmentsByUser.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
    ],
    (appointments, searchQuery, statusFilter) => {
        return appointments
            .filter((appointment) => {
                const fullName = `${appointment?.user?.lastName} ${appointment?.user?.firstName}`.toLowerCase();
                return (
                    !searchQuery ||
                    appointment?.motor?.motor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    appointment?.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    fullName.includes(searchQuery.toLowerCase())
                );
            })
            .filter((appointment) =>
                statusFilter === 'all' || String(appointment.status) === statusFilter
            );
    }
);
