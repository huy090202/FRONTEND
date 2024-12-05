/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoices: { data: [], loading: false, totalPages: 0 },
        total: 0,
        page: 1,
        limit: 5,
    },
    reducers: {
        fetchInvoices(state, action) {
            state.invoices.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchInvoicesSuccess(state, action) {
            state.invoices.loading = false;
            const { data, total, limit } = action.payload;
            state.invoices.data = data;
            state.total = total;
            state.invoices.totalPages = Math.ceil(total / limit);
        },
        fetchInvoicesFailure(state, action) {
            state.invoices.loading = false;
            toast.error(action.payload);
        },

        deleteInvoice(state) {
            state.invoices.loading = true;
        },
        deleteInvoiceSuccess(state, action) {
            state.invoices.loading = false;
            const { code, message } = action.payload;
            state.invoices.data = state.invoices.data.filter((invoice) => invoice.invoices_code !== code);
            toast.success(message);
        },
        deleteInvoiceFailure(state, action) {
            state.invoices.loading = false;
            toast.error(action.payload);
        },
    }
});

export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice.reducer;