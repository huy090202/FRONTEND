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
    customers: [],
    techs: [],
    staffs: [],
    cashiers: [],
    supervisors: [],
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
    loading: false,
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
        fetchCustomers(state) {
            state.loading = true;
        },
        fetchCustomersSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.customers = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchCustomersFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản khách hàng
        updateCustomerStatus(state) {
            state.loading = true;
        },
        updateCustomerStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.customers.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.customers[index] = data;
                } else {
                    state.customers = [data, ...state.customers];
                }
                toast.success(message);
            }
        },
        updateCustomerStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách kỹ thuật viên
        fetchTechs(state) {
            state.loading = true;
        },
        fetchTechsSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.techs = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchTechsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Thêm kỹ thuật viên
        createTech(state) {
            state.loading = true;
        },
        createTechSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.techs = [data, ...state.techs];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createTechFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản kỹ thuật viên
        updateTechStatus(state) {
            state.loading = true;
        },
        updateTechStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.techs.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.techs[index] = data;
                } else {
                    state.techs = [data, ...state.techs];
                }
                toast.success(message);
            }
        },
        updateTechStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách nhân viên
        fetchStaffs(state) {
            state.loading = true;
        },
        fetchStaffsSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.staffs = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchStaffsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Thêm nhân viên
        createStaff(state) {
            state.loading = true;
        },
        createStaffSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.staffs = [data, ...state.staffs];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createStaffFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản nhân viên
        updateStaffStatus(state) {
            state.loading = true;
        },
        updateStaffStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.staffs.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.staffs[index] = data;
                } else {
                    state.staffs = [data, ...state.staffs];
                }
                toast.success(message);
            }
        },
        updateStaffStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách thu ngân
        fetchCashiers(state) {
            state.loading = true;
        },
        fetchCashiersSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.cashiers = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchCashiersFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Thêm thu ngân
        createCashier(state) {
            state.loading = true;
        },
        createCashierSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.cashiers = [data, ...state.cashiers];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createCashierFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản thu ngân
        updateCashierStatus(state) {
            state.loading = true;
        },
        updateCashierStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.cashiers.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.cashiers[index] = data;
                } else {
                    state.cashiers = [data, ...state.cashiers];
                }
                toast.success(message);
            }
        },
        updateCashierStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Lấy danh sách quản lý
        fetchSupervisors(state) {
            state.loading = true;
        },
        fetchSupervisorsSuccess(state, action) {
            state.loading = false;
            const { data, total, limit } = action.payload;
            state.supervisors = data;
            state.total = total;
            state.totalPages = Math.ceil(total / limit);
        },
        fetchSupervisorsFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Thêm quản lý
        createSupervisor(state) {
            state.loading = true;
        },
        createSupervisorSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                state.supervisors = [data, ...state.supervisors];
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
        createSupervisorFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },

        // Cập nhật trạng thái tài khoản quản lý
        updateSupervisorStatus(state) {
            state.loading = true;
        },
        updateSupervisorStatusSuccess(state, action) {
            state.loading = false;
            const { data, message } = action.payload;
            if (data) {
                const index = state.supervisors.findIndex((item) => item.id === data.id);
                if (index !== -1) {
                    state.supervisors[index] = data;
                } else {
                    state.supervisors = [data, ...state.supervisors];
                }
                toast.success(message);
            }
        },
        updateSupervisorStatusFailure(state, action) {
            state.loading = false;
            toast.error(action.payload);
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
