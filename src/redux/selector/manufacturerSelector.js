import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredManufacturers = createSelector(
    [(state) => state.manufacturer.manufacturersAdmin, (state, searchQuery) => searchQuery, (state, _, activeFilter) => activeFilter,],
    (manufacturers, searchQuery, activeFilter) => {
        let filteredManufacturers = manufacturers;

        if (searchQuery) {
            filteredManufacturers = filteredManufacturers.filter((manufacturer) =>
                manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilter !== 'all') {
            filteredManufacturers = filteredManufacturers.filter((manufacturer) =>
                manufacturer.active.toString() === activeFilter
            );
        }

        return filteredManufacturers;
    }
);