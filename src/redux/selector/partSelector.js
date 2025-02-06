import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredParts = createSelector(
    [(state) => state.part.partPrivates, (state, searchQuery) => searchQuery, (state, _, activeFilter) => activeFilter,],
    (parts, searchQuery, activeFilter) => {
        let filteredParts = parts;

        if (searchQuery) {
            filteredParts = filteredParts.filter((part) =>
                part.part_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilter !== 'all') {
            filteredParts = filteredParts.filter((part) =>
                part.active.toString() === activeFilter
            );
        }

        return filteredParts;
    }
);