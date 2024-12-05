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

// Số lượng đơn bảo dưỡng đang kiểm tra xe
export const totalMaintenancesChecking = createSelector(
    [(state) => state.maintenance.maintenances.data || []],
    (maintenances) =>
        maintenances.filter(maintenance => maintenance.status === "Kiểm tra xe").length
);

// Số lượng đơn bảo dưỡng đang bảo dưỡng
export const totalMaintenancesMaintaining = createSelector(
    [(state) => state.maintenance.maintenances.data || []],
    (maintenances) =>
        maintenances.filter(maintenance => maintenance.status === "Đang bảo dưỡng").length
);

// Số lượng đơn bảo dưỡng hoàn thành bảo dưỡng
export const totalMaintenancesCompleted = createSelector(
    [(state) => state.maintenance.maintenances.data || []],
    (maintenances) =>
        maintenances.filter(maintenance => maintenance.status === "Hoàn thành bảo dưỡng").length
);

// Số lượng đơn bảo dưỡng đã hủy
export const totalMaintenancesCanceled = createSelector(
    [(state) => state.maintenance.maintenances.data || []],
    (maintenances) =>
        maintenances.filter(maintenance => maintenance.status === "Đã hủy").length
);