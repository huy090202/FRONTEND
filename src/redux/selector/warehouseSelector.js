import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredWarehouses = createSelector(
    [(state) => state.warehouse.warehousesAdmin, (state, searchQuery) => searchQuery, (state, _, activeFilter) => activeFilter,],
    (warehouses, searchQuery, activeFilter) => {
        let filteredWarehouses = warehouses;

        if (searchQuery) {
            filteredWarehouses = filteredWarehouses.filter((warehouse) =>
                warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                warehouse.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilter !== 'all') {
            filteredWarehouses = filteredWarehouses.filter((warehouse) =>
                warehouse.active.toString() === activeFilter
            );
        }

        return filteredWarehouses;
    }
);