/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const partSlice = createSlice({
    name: 'part',
    initialState: {
        parts: [], // Public
        partPrivates: [], // Private
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

        updatePart(state, action) {
            state.loading = true;
        },
        updatePartSuccess(state, action) {
            const { data, message } = action.payload;
            state.loading = false;
            if (data) {
                const index = state.parts.findIndex((part) => part.id === data.id);
                if (index !== -1) {
                    state.parts[index] = data;
                    toast.success(message);
                } else {
                    toast.error('Linh kiện không tồn tại');
                }
            }
        },
        updatePartFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        }
    },
})

export const partActions = partSlice.actions;
export default partSlice.reducer;