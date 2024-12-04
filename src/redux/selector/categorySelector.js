import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredCategories = createSelector(
    [(state) => state.category.categoriesAdmin, (state, searchQuery) => searchQuery, (state, _, activeFilter) => activeFilter,],
    (categories, searchQuery, activeFilter) => {
        let filteredCategories = categories;

        if (searchQuery) {
            filteredCategories = filteredCategories.filter((category) =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilter !== 'all') {
            filteredCategories = filteredCategories.filter((category) =>
                category.active.toString() === activeFilter
            );
        }

        return filteredCategories;
    }
);