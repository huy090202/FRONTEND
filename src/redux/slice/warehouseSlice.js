/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        warehouses: [], // User
        warehousesAdmin: [], // Admin
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
        loading: false,
    },
    reducers: {
        // Lấy danh sách nhà kho - User
        fetchWarehouses(state) {
            state.loading = true;
        },
        fetchWarehousesSuccess(state, action) {
            state.loading = false;
            state.warehouses = action.payload;
        },
        fetchWarehousesFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách nhà kho - Admin
        fetchWarehousesAdmin(state, action) {
            state.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchWarehousesAdminSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.warehousesAdmin = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchWarehousesAdminFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Tạo nhà kho
        createWarehouse(state) {
            state.loading = true;
        },
        createWarehouseSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.warehousesAdmin = [data, ...state.warehousesAdmin];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createWarehouseFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật nhà kho
        updateWarehouse(state) {
            state.loading = true;
        },
        updateWarehouseSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.warehousesAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.warehousesAdmin[index] = data;
                } else {
                    state.warehousesAdmin = [data, ...state.warehousesAdmin];
                }
                toast.success(message);
            }
        },
        updateWarehouseFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Xóa nhà kho
        deleteWarehouse(state) {
            state.loading = true;
        },
        deleteWarehouseSuccess(state, action) {
            state.loading = false;
            const { id, message } = action.payload;
            state.warehousesAdmin = state.warehousesAdmin.filter((item) => item.id !== id);
            toast.success(message);
        },
        deleteWarehouseFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái nhà kho
        updateWarehouseStatus(state) {
            state.loading = true;
        },
        updateWarehouseStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.warehousesAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.warehousesAdmin[index] = data;
                } else {
                    state.warehousesAdmin = [data, ...state.warehousesAdmin];
                }
                toast.success(message);
            }
        },
        updateWarehouseStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },
    }
});

export const warehouseActions = warehouseSlice.actions;
export default warehouseSlice.reducer;