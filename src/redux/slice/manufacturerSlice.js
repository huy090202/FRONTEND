/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const manufacturerSlice = createSlice({
    name: 'manufacturer',
    initialState: {
        manufacturers: [], // User
        manufacturersAdmin: [], // Admin
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
        loading: false,
    },
    reducers: {
        // Lấy danh sách nhà sản xuất - User
        fetchManufacturers(state) {
            state.loading = true;
        },
        fetchManufacturersSuccess(state, action) {
            state.loading = false;
            state.manufacturers = action.payload;
        },
        fetchManufacturersFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách nhà sản xuất - Admin
        fetchManufacturersAdmin(state, action) {
            state.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchManufacturersAdminSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.manufacturersAdmin = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchManufacturersAdminFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Tạo nhà sản xuất
        createManufacturer(state) {
            state.loading = true;
        },
        createManufacturerSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.manufacturersAdmin = [data, ...state.manufacturersAdmin];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createManufacturerFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật nhà sản xuất
        updateManufacturer(state) {
            state.loading = true;
        },
        updateManufacturerSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.manufacturersAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.manufacturersAdmin[index] = data;
                } else {
                    state.manufacturersAdmin = [data, ...state.manufacturersAdmin];
                }
                toast.success(message);
            }
        },
        updateManufacturerFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Xóa nhà sản xuất
        deleteManufacturer(state) {
            state.loading = true;
        },
        deleteManufacturerSuccess(state, action) {
            state.loading = false;
            const { id, message } = action.payload;
            state.manufacturersAdmin = state.manufacturersAdmin.filter((item) => item.id !== id);
            toast.success(message);
        },
        deleteManufacturerFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái nhà sản xuất
        updateManufacturerStatus(state) {
            state.loading = true;
        },
        updateManufacturerStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.manufacturersAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.manufacturersAdmin[index] = data;
                } else {
                    state.manufacturersAdmin = [data, ...state.manufacturersAdmin];
                }
                toast.success(message);
            }
        },
        updateManufacturerStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },
    }
});

export const manufacturerActions = manufacturerSlice.actions;
export default manufacturerSlice.reducer;