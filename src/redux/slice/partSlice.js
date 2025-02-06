/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const partSlice = createSlice({
    name: 'part',
    initialState: {
        parts: [], // Public
        partPrivates: [], // Private
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
        loading: false,
    },
    reducers: {
        // Lấy danh sách linh kiện - Public <=> active = true
        fetchParts(state) {
            state.loading = true;
        },
        fetchPartsSuccess(state, action) {
            state.loading = false;
            state.parts = action.payload;
        },
        fetchPartsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách linh kiện - Private
        fetchPartPrivates(state, action) {
            state.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchPartPrivatesSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.partPrivates = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchPartPrivatesFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Tạo linh kiện
        createPart(state) {
            state.loading = true;
        },
        createPartSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.partPrivates = [data, ...state.partPrivates];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createPartFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật linh kiện
        updatePart(state, action) {
            state.loading = true;
        },
        updatePartSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.partPrivates.findIndex((part) => part.id === data.id);
                if (index !== -1) {
                    state.partPrivates[index] = data;
                } else {
                    state.partPrivates = [data, ...state.partPrivates];
                }
                toast.success(message);
            }
        },
        updatePartFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Xóa linh kiện
        deletePart(state) {
            state.loading = true;
        },
        deletePartSuccess(state, action) {
            state.loading = false;
            const { id, message } = action.payload;
            state.partPrivates = state.partPrivates.filter((part) => part.id !== id);
            toast.success(message);
        },
        deletePartFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái linh kiện
        updatePartStatus(state) {
            state.loading = true;
        },
        updatePartStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.partPrivates.findIndex((part) => part.id === data.id);
                if (index !== -1) {
                    state.partPrivates[index] = data;
                } else {
                    state.partPrivates = [data, ...state.partPrivates];
                }
                toast.success(message);
            }
        },
        updatePartStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        }
    },
})

export const partActions = partSlice.actions;
export default partSlice.reducer;