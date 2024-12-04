import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredMaintenances = createSelector(
    [
        (state) => state.maintenance.maintenances.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
    ],
    (maintenances, searchQuery, statusFilter) => {
        return maintenances
            .filter((maintenance) => {
                const fullNameTech = `${maintenance?.user?.lastName} ${maintenance?.user?.firstName}`.toLowerCase();
                const fullNameCustomer = `${maintenance?.appointment?.user?.lastName} ${maintenance?.appointment?.user?.firstName}`.toLowerCase();
                return (
                    !searchQuery ||
                    maintenance.maintenance_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    maintenance?.motor?.motor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    maintenance?.appointment?.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    fullNameTech.includes(searchQuery.toLowerCase()) ||
                    fullNameCustomer.includes(searchQuery.toLowerCase())
                );
            })
            .filter((maintenance) =>
                statusFilter === 'all' || String(maintenance.status) === statusFilter
            );
    }
);

export const selectFilteredMaintenancesByUser = createSelector(
    [
        (state) => state.maintenance.maintenancesByUser.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
    ],
    (maintenancesByUser, searchQuery, statusFilter) => {
        return maintenancesByUser
            .filter((maintenance) => {
                const fullNameTech = `${maintenance?.user?.lastName} ${maintenance?.user?.firstName}`.toLowerCase();
                const fullNameCustomer = `${maintenance?.appointment?.user?.lastName} ${maintenance?.appointment?.user?.firstName}`.toLowerCase();
                return (
                    !searchQuery ||
                    maintenance.maintenance_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    maintenance?.motor?.motor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    maintenance?.appointment?.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    fullNameTech.includes(searchQuery.toLowerCase()) ||
                    fullNameCustomer.includes(searchQuery.toLowerCase())
                );
            })
            .filter((maintenance) =>
                statusFilter === 'all' || String(maintenance.status) === statusFilter
            );
    }
);
