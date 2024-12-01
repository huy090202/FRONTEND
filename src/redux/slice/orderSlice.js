/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [], // Admin
        ordersByUser: [], // User
        loading: false,
    },
    reducers: {
        // Admin
        fetchOrders(state) {
            state.loading = true;
        },
        fetchOrdersSuccess(state, action) {
            state.loading = false;
            state.orders = action.payload;
        },
        fetchOrdersFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        updateOrderStatus(state) {
            state.loading = true;
        },
        updateOrderStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (!data) {
                toast.error('Dữ liệu trả về không hợp lệ');
                return;
            }
            const order = state.orders.find((item) => item.id === data.id);
            if (order) {
                Object.assign(order, data);
            } else {
                state.orders = [data, ...state.orders];
            }
            toast.success(message);
        },
        updateOrderStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // User
        fetchOrdersByUser(state) {
            state.loading = true;
        },
        fetchOrdersByUserSuccess(state, action) {
            state.loading = false;
            state.ordersByUser = action.payload;
        },
        fetchOrdersByUserFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },
    }
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;