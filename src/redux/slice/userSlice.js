/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setToken } from '~/utils/token';

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        address: '',
        gender: '',
        role: '',
    },
    customers: { data: [], loading: false, totalPages: 0 },
    techs: { data: [], loading: false, totalPages: 0 },
    staffs: { data: [], loading: false, totalPages: 0 },
    cashiers: { data: [], loading: false, totalPages: 0 },
    supervisors: { data: [], loading: false, totalPages: 0 },
    total: 0,
    page: 1,
    limit: 5,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleError(state, action) {
            const error = action.payload;
            toast.error(error);
        },
        getUser: (state) => { },
        getUserSuccess: (state, action) => {
            state.user = { ...action.payload };
            setToken('user', state.user);
        },
        // Khôi phục trạng thái user từ session storage
        restoreUserState: (state, action) => {
            const storedUser = action.payload;
            if (storedUser) {
                state.user = storedUser;
            }
        },
        updateUser: (state, action) => {
            state.user = { ...action.payload.data };
        },
        updateUserSuccess: (state, action) => {
            state.user = { ...action.payload.data };
            setToken('user', state.user);
            toast.success(action.payload.message);
        },
        updateUserFailure: (state, action) => {
            toast.error(action.payload);
        },
        changePassword: (state, action) => {
            state.user = { ...action.payload.data };
        },
        changePasswordSuccess: (state, action) => {
            state.user = { ...action.payload.data };
            toast.success(action.payload.message);
        },
        changePasswordFailure: (state, action) => {
            toast.error(action.payload);
        },

        // Lấy danh sách khách hàng
        fetchCustomers(state, action) {
            state.customers.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchCustomersSuccess(state, action) {
            state.customers.loading = false;
            const { data, total, limit } = action.payload;
            state.customers.data = data;
            state.total = total;
            state.customers.totalPages = Math.ceil(total / limit);
        },
        fetchCustomersFailure(state, action) {
            state.customers.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản khách hàng
        updateCustomerStatus(state) {
            state.customers.loading = true;
        },
        updateCustomerStatusSuccess(state, action) {
            state.customers.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.customers.data.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.customers.data[index] = data;
                } else {
                    state.customers.data = [data, ...state.customers.data];
                }
                toast.success(message);
            }
        },
        updateCustomerStatusFailure(state, action) {
            state.customers.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách kỹ thuật viên
        fetchTechs(state, action) {
            state.techs.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchTechsSuccess(state, action) {
            state.techs.loading = false;
            const { data, total, limit } = action.payload;
            state.techs.data = data;
            state.total = total;
            state.techs.totalPages = Math.ceil(total / limit);
        },
        fetchTechsFailure(state, action) {
            state.techs.loading = false;
            toast.error(action.payload);
        },

        // Thêm kỹ thuật viên
        createTech(state) {
            state.techs.loading = true;
        },
        createTechSuccess(state, action) {
            state.techs.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.techs.data = [data, ...state.techs.data];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createTechFailure(state, action) {
            state.techs.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản kỹ thuật viên
        updateTechStatus(state) {
            state.techs.loading = true;
        },
        updateTechStatusSuccess(state, action) {
            state.techs.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.techs.data.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.techs.data[index] = data;
                } else {
                    state.techs.data = [data, ...state.techs.data];
                }
                toast.success(message);
            }
        },
        updateTechStatusFailure(state, action) {
            state.techs.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách nhân viên
        fetchStaffs(state, action) {
            state.staffs.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchStaffsSuccess(state, action) {
            state.staffs.loading = false;
            const { data, total, limit } = action.payload;
            state.staffs.data = data;
            state.total = total;
            state.staffs.totalPages = Math.ceil(total / limit);
        },
        fetchStaffsFailure(state, action) {
            state.staffs.loading = false;
            toast.error(action.payload);
        },

        // Thêm nhân viên
        createStaff(state) {
            state.staffs.loading = true;
        },
        createStaffSuccess(state, action) {
            state.staffs.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.staffs.data = [data, ...state.staffs.data];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createStaffFailure(state, action) {
            state.staffs.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản nhân viên
        updateStaffStatus(state) {
            state.staffs.loading = true;
        },
        updateStaffStatusSuccess(state, action) {
            state.staffs.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.staffs.data.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.staffs.data[index] = data;
                } else {
                    state.staffs.data = [data, ...state.staffs.data];
                }
                toast.success(message);
            }
        },
        updateStaffStatusFailure(state, action) {
            state.staffs.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách thu ngân
        fetchCashiers(state, action) {
            state.cashiers.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchCashiersSuccess(state, action) {
            state.cashiers.loading = false;
            const { data, total, limit } = action.payload;
            state.cashiers.data = data;
            state.total = total;
            state.cashiers.totalPages = Math.ceil(total / limit);
        },
        fetchCashiersFailure(state, action) {
            state.cashiers.loading = false;
            toast.error(action.payload);
        },

        // Thêm thu ngân
        createCashier(state) {
            state.cashiers.loading = true;
        },
        createCashierSuccess(state, action) {
            state.cashiers.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.cashiers.data = [data, ...state.cashiers.data];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createCashierFailure(state, action) {
            state.cashiers.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản thu ngân
        updateCashierStatus(state) {
            state.cashiers.loading = true;
        },
        updateCashierStatusSuccess(state, action) {
            state.cashiers.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.cashiers.data.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.cashiers.data[index] = data;
                } else {
                    state.cashiers.data = [data, ...state.cashiers.data];
                }
                toast.success(message);
            }
        },
        updateCashierStatusFailure(state, action) {
            state.cashiers.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách quản lý
        fetchSupervisors(state, action) {
            state.supervisors.loading = true;
            state.page = action.payload.page || state.page;
            state.limit = action.payload.limit || state.limit;
        },
        fetchSupervisorsSuccess(state, action) {
            state.supervisors.loading = false;
            const { data, total, limit } = action.payload;
            state.supervisors.data = data;
            state.total = total;
            state.supervisors.totalPages = Math.ceil(total / limit);
        },
        fetchSupervisorsFailure(state, action) {
            state.supervisors.loading = false;
            toast.error(action.payload);
        },

        // Thêm quản lý
        createSupervisor(state) {
            state.supervisors.loading = true;
        },
        createSupervisorSuccess(state, action) {
            state.supervisors.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.supervisors.data = [data, ...state.supervisors.data];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createSupervisorFailure(state, action) {
            state.supervisors.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản quản lý
        updateSupervisorStatus(state) {
            state.supervisors.loading = true;
        },
        updateSupervisorStatusSuccess(state, action) {
            state.supervisors.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.supervisors.data.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.supervisors.data[index] = data;
                } else {
                    state.supervisors.data = [data, ...state.supervisors.data];
                }
                toast.success(message);
            }
        },
        updateSupervisorStatusFailure(state, action) {
            state.supervisors.loading = false;
            toast.error(action.payload);
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
