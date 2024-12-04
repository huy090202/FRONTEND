import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredOrders = createSelector(
    [
        (state) => state.order.orders.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
        (_, __, ___, paymentStatusFilter) => paymentStatusFilter || 'all',
        (_, __, ___, ____, paymentMethodFilter) => paymentMethodFilter || 'all',
        (_, __, ___, ____, _____, deliveryMethodFilter) => deliveryMethodFilter || 'all'
    ],
    (orders, searchQuery, statusFilter, paymentStatusFilter, paymentMethodFilter, deliveryMethodFilter) => {
        return orders
            .filter((order) =>
                !searchQuery ||
                order.order_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter((order) =>
                statusFilter === 'all' || String(order.order_status) === statusFilter
            )
            .filter((order) =>
                paymentStatusFilter === 'all' || String(order.payment_status) === paymentStatusFilter
            )
            .filter((order) =>
                paymentMethodFilter === 'all' || String(order.payment_method) === paymentMethodFilter
            )
            .filter((order) =>
                deliveryMethodFilter === 'all' || String(order.delivery_method) === deliveryMethodFilter
            );
    }
);

export const selectFilteredOrdersUser = createSelector(
    [
        (state) => state.order.ordersByUser.data || [],
        (_, searchQuery) => searchQuery,
        (_, __, statusFilter) => statusFilter || 'all',
        (_, __, ___, paymentStatusFilter) => paymentStatusFilter || 'all',
        (_, __, ___, ____, paymentMethodFilter) => paymentMethodFilter || 'all',
        (_, __, ___, ____, _____, deliveryMethodFilter) => deliveryMethodFilter || 'all'
    ],
    (ordersByUser, searchQuery, statusFilter, paymentStatusFilter, paymentMethodFilter, deliveryMethodFilter) => {
        return ordersByUser
            .filter((order) =>
                !searchQuery ||
                order.order_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter((order) =>
                statusFilter === 'all' || String(order.order_status) === statusFilter
            )
            .filter((order) =>
                paymentStatusFilter === 'all' || String(order.payment_status) === paymentStatusFilter
            )
            .filter((order) =>
                paymentMethodFilter === 'all' || String(order.payment_method) === paymentMethodFilter
            )
            .filter((order) =>
                deliveryMethodFilter === 'all' || String(order.delivery_method) === deliveryMethodFilter
            );
    }
);
