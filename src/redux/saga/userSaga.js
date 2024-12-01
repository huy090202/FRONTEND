import { call, put, takeLatest } from 'redux-saga/effects';
import * as userService from '~/services/userService';
import { userActions } from '~/redux/slice/userSlice';

function* handleApiCall(action, apiFunction, successAction, failureAction) {
    try {
        const response = yield call(apiFunction, ...Object.values(action.payload));
        if (response.status === true) {
            yield put(successAction({ data: response.data, message: response.message, total: response.total, limit: response.limit }));
        } else {
            yield put(failureAction(response.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        yield put(failureAction(errorMessage));
    }
}

// Các saga chính
function* updateUserSaga(action) {
    yield handleApiCall(
        action,
        userService.updateUser,
        userActions.updateUserSuccess,
        userActions.updateUserFailure
    );
}

function* getUserSaga(action) {
    yield handleApiCall(
        action,
        userService.getUser,
        userActions.getUserSuccess,
        userActions.handleError
    );
}

function* changePasswordSaga(action) {
    try {
        const response = yield call(userService.changePassword, action.payload.token, action.payload.data);
        if (response.status === true) {
            yield put(userActions.changePasswordSuccess(response));
        } else {
            yield put(userActions.changePasswordFailure(response.message || 'Đổi mật khẩu thất bại'));
        }
        yield put(userActions.getUser(action.payload.token)); // Luôn gọi getUser sau khi đổi mật khẩu
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        yield put(userActions.changePasswordFailure(errorMessage));
        yield put(userActions.getUser(action.payload.token));
    }
}

function* genericFetchSaga(action, apiFunction, successAction, failureAction) {
    yield handleApiCall(action, apiFunction, successAction, failureAction);
}

function* userSaga() {
    yield takeLatest(userActions.updateUser, updateUserSaga);
    yield takeLatest(userActions.getUser, getUserSaga);
    yield takeLatest(userActions.changePassword, changePasswordSaga);

    // Quản lý dữ liệu chung
    const fetchMap = {
        fetchCustomers: userService.getAllUsers,
        fetchTechs: userService.getAllTechs,
        fetchStaffs: userService.getAllStaffs,
        fetchCashiers: userService.getAllCashiers,
        fetchSupervisors: userService.getAllAdmins,
    };

    for (const [actionType, apiFunction] of Object.entries(fetchMap)) {
        yield takeLatest(userActions[actionType], function* (action) {
            yield genericFetchSaga(action, apiFunction, userActions[`${actionType}Success`], userActions[`${actionType}Failure`]);
        });
    }

    // Thay đổi trạng thái
    const changeStatusMap = {
        updateCustomerStatus: userActions.updateCustomerStatus,
        updateTechStatus: userActions.updateTechStatus,
        updateStaffStatus: userActions.updateStaffStatus,
        updateCashierStatus: userActions.updateCashierStatus,
        updateSupervisorStatus: userActions.updateSupervisorStatus,
    };

    for (const [actionType] of Object.entries(changeStatusMap)) {
        yield takeLatest(userActions[actionType], function* (action) {
            yield handleApiCall(
                action,
                userService.changeUserStatus,
                userActions[`${actionType}Success`],
                userActions[`${actionType}Failure`]
            );
        });
    }

    // Tạo mới nhân viên
    const createMap = {
        createTech: userActions.createTech,
        createStaff: userActions.createStaff,
        createCashier: userActions.createCashier,
        createSupervisor: userActions.createSupervisor,
    };

    for (const [actionType] of Object.entries(createMap)) {
        yield takeLatest(userActions[actionType], function* (action) {
            yield handleApiCall(
                action,
                userService.createStaff,
                userActions[`${actionType}Success`],
                userActions[`${actionType}Failure`]
            );
        });
    }
}

export default userSaga;
