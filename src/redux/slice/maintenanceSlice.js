import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState: {
        isLoading: false,
        maintenancesTech: [],
        maintenances: { data: [], loading: false, totalPages: 0 }, // Admin
        maintenancesByUser: { data: [], loading: false, totalPages: 0 }, // User
        total: 0,
        page: 1,
        limit: 5,
    },
    reducers: {
        // Tech
        fetchMaintenancesByTech(state) {
            state.isLoading = true;
        },
        fetchMaintenancesByTechSuccess(state, action) {
            state.isLoading = false;
            state.maintenancesTech = action.payload;
        },
        fetchMaintenancesByTechFailure(state, action) {
            state.isLoading = false;
            toast.error(action.payload);
        },
        updateMaintenanceByTech(state) {
            state.isLoading = true;
        },
        updateMaintenanceByTechSuccess(state, action) {
            state.isLoading = false;
            const { data, message } = action.payload;
            if (data) {
                const maintenanceIndex = state.maintenancesTech.findIndex((maintenance) => maintenance.id === data.id);
                if (maintenanceIndex !== -1) {
                    state.maintenancesTech[maintenanceIndex] = data;
                } else {
                    state.maintenancesTech = [data, ...state.maintenancesTech];
                }
                toast.success(message);
            }
        },
        updateMaintenanceByTechFailure(state, action) {
            state.isLoading = false;
            toast.error(action.payload);
        },
        updateMaintenanceStatusByTech(state) {
            state.isLoading = true;
        },
        updateMaintenanceStatusByTechSuccess(state, action) {
            state.isLoading = false;
            const { data, message } = action.payload;
            if (data) {
                const maintenanceIndex = state.maintenancesTech.findIndex((maintenance) => maintenance.id === data.id);
                if (maintenanceIndex !== -1) {
                    state.maintenancesTech[maintenanceIndex] = data;
                } else {
                    state.maintenancesTech = [data, ...state.maintenancesTech];
                }
                toast.success(message);
            }
        },
        updateMaintenanceStatusByTechFailure(state, action) {
            state.isLoading = false;
            toast.error(action.payload);
        },

        // Admin
        fetchMaintenances(state, action) {
            state.maintenances.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchMaintenancesSuccess(state, action) {
            state.maintenances.loading = false;
            const { data, total, limit } = action.payload;
            state.maintenances.data = data;
            state.total = total;
            state.maintenances.totalPages = Math.ceil(total / limit);
        },
        fetchMaintenancesFailure(state, action) {
            state.maintenances.loading = false;
            toast.error(action.payload);
        },

        updateMaintenanceStatus(state) {
            state.maintenances.loading = true;
        },
        updateMaintenanceStatusSuccess(state, action) {
            state.maintenances.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const maintenance = state.maintenances.data.findIndex((maint) => maint.id === data.id);
                if (maintenance !== -1) {
                    state.maintenances.data[maintenance] = data;
                } else {
                    state.maintenances.data = [data, ...state.maintenances.data];
                }
                toast.success(message);
            }
        },
        updateMaintenanceStatusFailure(state, action) {
            state.maintenances.loading = false;
            toast.error(action.payload);
        },

        deleteMaintenance(state) {
            state.maintenances.loading = true;
        },
        deleteMaintenanceSuccess(state, action) {
            state.maintenances.loading = false;
            const { id, message } = action.payload;
            state.maintenances.data = state.maintenances.data.filter(maintenance => maintenance.id !== id);
            toast.success(message);
        },
        deleteMaintenanceFailure(state, action) {
            state.maintenances.loading = false;
            toast.error(action.payload);
        },

        // User
        fetchMaintenancesByUser(state, action) {
            state.maintenancesByUser.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchMaintenancesByUserSuccess(state, action) {
            state.maintenancesByUser.loading = false;
            const { data, total, limit } = action.payload;
            state.maintenancesByUser.data = data;
            state.total = total;
            state.maintenancesByUser.totalPages = Math.ceil(total / limit);
        },
        fetchMaintenancesByUserFailure(state, action) {
            state.maintenancesByUser.loading = false;
            toast.error(action.payload);
        },

        deleteMaintenanceByUser(state) {
            state.maintenancesByUser.loading = true;
        },
        deleteMaintenanceByUserSuccess(state, action) {
            state.maintenancesByUser.loading = false;
            const { id, message } = action.payload;
            state.maintenancesByUser.data = state.maintenancesByUser.data.filter(maintenance => maintenance.id !== id);
            toast.success(message);
        },
        deleteMaintenanceByUserFailure(state, action) {
            state.maintenancesByUser.loading = false;
            toast.error(action.payload);
        },
    },
});

export const maintenanceActions = maintenanceSlice.actions;
export default maintenanceSlice.reducer;