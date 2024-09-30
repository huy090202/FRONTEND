import { call, put, takeLatest } from 'redux-saga/effects';
import { updateUser, getUser, changePassword } from '~/services/userService';
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
        console.log(response);
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

export default function* userSaga() {
    yield takeLatest(userActions.updateUser, updateUserSaga);
    yield takeLatest(userActions.getUser, getUserSaga);
    yield takeLatest(userActions.changePassword, changePasswordSaga);
}
