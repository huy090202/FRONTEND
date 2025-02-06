// import { call, put, takeLatest } from 'redux-saga/effects';
// import * as userService from '~/services/userService';
// import { userActions } from '~/redux/slice/userSlice';

// function* handleApiCall(action, apiFunction, successAction, failureAction) {
//     try {
//         const response = yield call(apiFunction, ...Object.values(action.payload));
//         if (response.status === true) {
//             yield put(successAction({ data: response.data, message: response.message, total: response.total, limit: response.limit }));
//         } else {
//             yield put(failureAction(response.message));
//         }
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
//         yield put(failureAction(errorMessage));
//     }
// }

// // Các saga chính
// function* updateUserSaga(action) {
//     yield handleApiCall(
//         action,
//         userService.updateUser,
//         userActions.updateUserSuccess,
//         userActions.updateUserFailure
//     );
// }

// function* getUserSaga(action) {
//     yield handleApiCall(
//         action,
//         userService.getUser,
//         userActions.getUserSuccess,
//         userActions.handleError
//     );
// }

// function* changePasswordSaga(action) {
//     try {
//         const response = yield call(userService.changePassword, action.payload.token, action.payload.data);
//         if (response.status === true) {
//             yield put(userActions.changePasswordSuccess(response));
//         } else {
//             yield put(userActions.changePasswordFailure(response.message || 'Đổi mật khẩu thất bại'));
//         }
//         yield put(userActions.getUser(action.payload.token)); // Luôn gọi getUser sau khi đổi mật khẩu
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
//         yield put(userActions.changePasswordFailure(errorMessage));
//         yield put(userActions.getUser(action.payload.token));
//     }
// }

// function* genericFetchSaga(action, apiFunction, successAction, failureAction) {
//     yield handleApiCall(action, apiFunction, successAction, failureAction);
// }

// function* userSaga() {
//     yield takeLatest(userActions.updateUser, updateUserSaga);
//     yield takeLatest(userActions.getUser, getUserSaga);
//     yield takeLatest(userActions.changePassword, changePasswordSaga);

//     // Quản lý dữ liệu chung
//     const fetchMap = {
//         fetchCustomers: userService.getAllUsers,
//         fetchTechs: userService.getAllTechs,
//         fetchStaffs: userService.getAllStaffs,
//         fetchCashiers: userService.getAllCashiers,
//         fetchSupervisors: userService.getAllAdmins,
//     };

//     for (const [actionType, apiFunction] of Object.entries(fetchMap)) {
//         yield takeLatest(userActions[actionType], function* (action) {
//             yield genericFetchSaga(action, apiFunction, userActions[`${actionType}Success`], userActions[`${actionType}Failure`]);
//         });
//     }

//     // Thay đổi trạng thái
//     const changeStatusMap = {
//         updateCustomerStatus: userActions.updateCustomerStatus,
//         updateTechStatus: userActions.updateTechStatus,
//         updateStaffStatus: userActions.updateStaffStatus,
//         updateCashierStatus: userActions.updateCashierStatus,
//         updateSupervisorStatus: userActions.updateSupervisorStatus,
//     };

//     for (const [actionType] of Object.entries(changeStatusMap)) {
//         yield takeLatest(userActions[actionType], function* (action) {
//             yield handleApiCall(
//                 action,
//                 userService.changeUserStatus,
//                 userActions[`${actionType}Success`],
//                 userActions[`${actionType}Failure`]
//             );
//         });
//     }

//     // Tạo mới nhân viên
//     const createMap = {
//         createTech: userActions.createTech,
//         createStaff: userActions.createStaff,
//         createCashier: userActions.createCashier,
//         createSupervisor: userActions.createSupervisor,
//     };

//     for (const [actionType] of Object.entries(createMap)) {
//         yield takeLatest(userActions[actionType], function* (action) {
//             yield handleApiCall(
//                 action,
//                 userService.createStaff,
//                 userActions[`${actionType}Success`],
//                 userActions[`${actionType}Failure`]
//             );
//         });
//     }
// }

// export default userSaga;

import { call, put, takeLatest } from 'redux-saga/effects';
import { updateUser, getUser, changePassword, getAllUsers, changeUserStatus, getAllTechs, createStaff, getAllStaffs, getAllCashiers, getAllAdmins } from '~/services/userService';
import { userActions } from '~/redux/slice/userSlice';

function* updateUserSaga(action) {
    try {
        const response = yield call(updateUser, action.payload.token, action.payload.formData);
        if (response.status === true) {
            yield put(userActions.updateUserSuccess({ data: response.data, message: response.message }));
        } else {
            yield put(userActions.updateUserFailure(response.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
        yield put(userActions.updateUserFailure(errorMessage));
    }
}

function* getUserSaga(action) {
    try {
        const response = yield call(getUser, action.payload);
        yield put(userActions.getUserSuccess(response.data));
    } catch (error) {
        yield put(userActions.handleError(error.message));
    }
}

function* changePasswordSaga(action) {
    try {
        const response = yield call(changePassword, action.payload.token, action.payload.data);
        if (response.status === true) {
            yield put(userActions.changePasswordSuccess(response));
            yield put(userActions.getUser(action.payload.token));
        } else {
            yield put(userActions.changePasswordFailure(response.message || 'Đổi mật khẩu thất bại'));
            yield put(userActions.getUser(action.payload.token));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        yield put(userActions.changePasswordFailure(errorMessage));
        yield put(userActions.getUser(action.payload.token));
    }
}

// Admin
function* handleFetchEntities(action, fetchApi, successAction, failureAction) {
    try {
        const { token, page, limit, active } = action.payload;
        const response = yield call(fetchApi, token, page, limit, active);
        if (response.status) {
            yield put(successAction({
                data: response.data,
                total: response.total,
                limit: response.limit,
            }));
        } else {
            yield put(failureAction(response.message));
        }
    } catch (error) {
        yield put(failureAction(error.message));
    }
}

function* handleChangeStatus(action, successAction, failureAction) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeUserStatus, token, id, active);
        if (response.status) {
            yield put(successAction({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(failureAction(response.message));
        }
    } catch (error) {
        yield put(failureAction(error.message));
    }
}

function* handleCreateEntity(action, successAction, failureAction) {
    try {
        const { token, data } = action.payload;
        const response = yield call(createStaff, token, data);
        if (response.status) {
            yield put(successAction({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(failureAction(response.message));
        }
    } catch (error) {
        yield put(failureAction(error.message));
    }
}

// Khách hàng
function* fetchCustomersSaga(action) {
    yield handleFetchEntities(
        action,
        getAllUsers,
        userActions.fetchCustomersSuccess,
        userActions.fetchCustomersFailure
    );
}

function* changeCustomerStatusSaga(action) {
    yield handleChangeStatus(
        action,
        userActions.updateCustomerStatusSuccess,
        userActions.updateCustomerStatusFailure
    );
}

// Kỹ thuật viên
function* fetchTechsSaga(action) {
    yield handleFetchEntities(
        action,
        getAllTechs,
        userActions.fetchTechsSuccess,
        userActions.fetchTechsFailure
    );
}

function* createTechSaga(action) {
    yield handleCreateEntity(
        action,
        userActions.createTechSuccess,
        userActions.createTechFailure
    );
}

function* changeTechStatusSaga(action) {
    yield handleChangeStatus(
        action,
        userActions.updateTechStatusSuccess,
        userActions.updateTechStatusFailure
    );
}

// Nhân viên
function* fetchStaffsSaga(action) {
    yield handleFetchEntities(
        action,
        getAllStaffs,
        userActions.fetchStaffsSuccess,
        userActions.fetchStaffsFailure
    );
}

function* createStaffSaga(action) {
    yield handleCreateEntity(
        action,
        userActions.createStaffSuccess,
        userActions.createStaffFailure
    );
}

function* changeStaffStatusSaga(action) {
    yield handleChangeStatus(
        action,
        userActions.updateStaffStatusSuccess,
        userActions.updateStaffStatusFailure
    );
}

// Thu ngân
function* fetchCashiersSaga(action) {
    yield handleFetchEntities(
        action,
        getAllCashiers,
        userActions.fetchCashiersSuccess,
        userActions.fetchCashiersFailure
    );
}

function* createCashierSaga(action) {
    yield handleCreateEntity(
        action,
        userActions.createCashierSuccess,
        userActions.createCashierFailure
    );
}

function* changeCashierStatusSaga(action) {
    yield handleChangeStatus(
        action,
        userActions.updateCashierStatusSuccess,
        userActions.updateCashierStatusFailure
    );
}



// Quản lý
function* fetchSupervisorsSaga(action) {
    yield handleFetchEntities(
        action,
        getAllAdmins,
        userActions.fetchSupervisorsSuccess,
        userActions.fetchSupervisorsFailure
    );
}

function* createSupervisorSaga(action) {
    yield handleCreateEntity(
        action,
        userActions.createSupervisorSuccess,
        userActions.createSupervisorFailure
    );
}

function* changeSupervisorStatusSaga(action) {
    yield handleChangeStatus(
        action,
        userActions.updateSupervisorStatusSuccess,
        userActions.updateSupervisorStatusFailure
    );
}

export default function* userSaga() {
    yield takeLatest(userActions.updateUser, updateUserSaga);
    yield takeLatest(userActions.getUser, getUserSaga);
    yield takeLatest(userActions.changePassword, changePasswordSaga);
    // Admin
    // Khách hàng
    yield takeLatest(userActions.fetchCustomers, fetchCustomersSaga);
    yield takeLatest(userActions.updateCustomerStatus, changeCustomerStatusSaga);
    // Kỹ thuật viên
    yield takeLatest(userActions.fetchTechs, fetchTechsSaga);
    yield takeLatest(userActions.createTech, createTechSaga);
    yield takeLatest(userActions.updateTechStatus, changeTechStatusSaga);
    // Nhân viên
    yield takeLatest(userActions.fetchStaffs, fetchStaffsSaga);
    yield takeLatest(userActions.createStaff, createStaffSaga);
    yield takeLatest(userActions.updateStaffStatus, changeStaffStatusSaga);
    // Thu ngân
    yield takeLatest(userActions.fetchCashiers, fetchCashiersSaga);
    yield takeLatest(userActions.createCashier, createCashierSaga);
    yield takeLatest(userActions.updateCashierStatus, changeCashierStatusSaga);
    // Quản lý
    yield takeLatest(userActions.fetchSupervisors, fetchSupervisorsSaga);
    yield takeLatest(userActions.createSupervisor, createSupervisorSaga);
    yield takeLatest(userActions.updateSupervisorStatus, changeSupervisorStatusSaga);
}