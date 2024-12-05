/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: { data: [], loading: false, totalPages: 0 }, // Admin
        ordersByUser: { data: [], loading: false, totalPages: 0 }, // User
        total: 0,
        page: 1,
        limit: 5,
    },
    reducers: {
        // Admin
        fetchOrders(state, action) {
            state.orders.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchOrdersSuccess(state, action) {
            state.orders.loading = false;
            const { data, total, limit } = action.payload;
            state.orders.data = data;
            state.total = total;
            state.orders.totalPages = Math.ceil(total / limit);
        },
        fetchOrdersFailure(state, action) {
            state.orders.loading = false;
            toast.error(action.payload);
        },

        updateOrderStatus(state) {
            state.orders.loading = true;
        },
        updateOrderStatusSuccess(state, action) {
            state.orders.loading = false;
            const { data, message } = action.payload;
            if (!data) {
                toast.error('Dữ liệu trả về không hợp lệ');
                return;
            }
            const order = state.orders.data.findIndex((item) => item.id === data.id);
            if (order !== -1) {
                state.orders.data[order] = data;
            } else {
                state.orders.data = [data, ...state.orders.data];
            }
            toast.success(message);
        },
        updateOrderStatusFailure(state, action) {
            state.orders.loading = false;
            toast.error(action.payload);
        },

        updatePaymentStatus(state) {
            state.orders.loading = true;
        },
        updatePaymentStatusSuccess(state, action) {
            state.orders.loading = false;
            const { data, message } = action.payload;
            if (!data) {
                toast.error('Dữ liệu trả về không hợp lệ');
                return;
            }
            const order = state.orders.data.findIndex((item) => item.order_code === data.order_code);
            if (order !== -1) {
                state.orders.data[order] = data;
            } else {
                state.orders.data = [data, ...state.orders.data];
            }
            toast.success(message);
        },
        updatePaymentStatusFailure(state, action) {
            state.orders.loading = false;
            toast.error(action.payload);
        },

        deleteOrder(state) {
            state.orders.loading = true;
        },
        deleteOrderSuccess(state, action) {
            state.orders.loading = false;
            const { code, message } = action.payload;
            state.orders.data = state.orders.data.filter((item) => item.order_code !== code);
            toast.success(message);
        },
        deleteOrderFailure(state, action) {
            state.orders.loading = false;
            toast.error(action.payload);
        },

        // User
        fetchOrdersByUser(state, action) {
            state.ordersByUser.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchOrdersByUserSuccess(state, action) {
            state.ordersByUser.loading = false;
            const { data, total, limit } = action.payload;
            state.ordersByUser.data = data;
            state.total = total;
            state.ordersByUser.totalPages = Math.ceil(total / limit);
        },
        fetchOrdersByUserFailure(state, action) {
            state.ordersByUser.loading = false;
            toast.error(action.payload);
        },

        deleteOrderUser(state) {
            state.ordersByUser.loading = true;
        },
        deleteOrderUserSuccess(state, action) {
            state.ordersByUser.loading = false;
            const { code, message } = action.payload;
            state.ordersByUser.data = state.ordersByUser.data.filter((item) => item.order_code !== code);
            toast.success(message);
        },
        deleteOrderUserFailure(state, action) {
            state.ordersByUser.loading = false;
            toast.error(action.payload);
        },
    }
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;