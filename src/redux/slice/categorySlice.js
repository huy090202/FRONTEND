/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [], // User
        categoriesAdmin: [], // Admin
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0,
        loading: false,
    },
    reducers: {
        // Lấy danh sách danh mục - User
        fetchCategories(state) {
            state.loading = true;
        },
        fetchCategoriesSuccess(state, action) {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách danh mục - Admin
        fetchCategoriesAdmin(state, action) {
            state.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchCategoriesAdminSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.categoriesAdmin = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchCategoriesAdminFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Tạo danh mục
        createCategory(state) {
            state.loading = true;
        },
        createCategorySuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.categoriesAdmin = [data, ...state.categoriesAdmin];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createCategoryFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật danh mục
        updateCategory(state) {
            state.loading = true;
        },
        updateCategorySuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.categoriesAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.categoriesAdmin[index] = data;
                } else {
                    state.categoriesAdmin = [data, ...state.categoriesAdmin];
                }
                toast.success(message);
            }
        },
        updateCategoryFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Xóa danh mục
        deleteCategory(state) {
            state.loading = true;
        },
        deleteCategorySuccess(state, action) {
            state.loading = false;
            const { id, message } = action.payload;
            state.categoriesAdmin = state.categoriesAdmin.filter((item) => item.id !== id);
            toast.success(message);
        },
        deleteCategoryFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái danh mục
        updateCategoryStatus(state) {
            state.loading = true;
        },
        updateCategoryStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.categoriesAdmin.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.categoriesAdmin[index] = data;
                } else {
                    state.categoriesAdmin = [data, ...state.categoriesAdmin];
                }
                toast.success(message);
            }
        },
        updateCategoryStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },
    }
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;