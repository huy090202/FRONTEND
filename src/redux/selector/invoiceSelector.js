import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredInvoices = createSelector(
    [
        (state) => state.invoice.invoices.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, paymentStatusFilter) => paymentStatusFilter || 'all',
        (_, __, ___, paymentMethodFilter) => paymentMethodFilter || 'all',
    ],
    (invoices, searchQuery, paymentStatusFilter, paymentMethodFilter) => {
        return invoices
            .filter((invoice) =>
                !searchQuery ||
                invoice.invoices_code.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter((invoice) =>
                paymentStatusFilter === 'all' || String(invoice.payment_status) === paymentStatusFilter
            )
            .filter((invoice) =>
                paymentMethodFilter === 'all' || String(invoice.payment_method) === paymentMethodFilter
            );
    }
);