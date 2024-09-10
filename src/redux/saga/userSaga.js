import { call, put, takeLatest } from 'redux-saga/effects';
import { updateUser, getUser, changePassword } from '~/services/userService';
import { userActions } from '~/redux/slice/userSlice';

function* updateUserSaga(action) {
    try {
        const response = yield call(updateUser, action.payload.token, action.payload.formData);
        yield put(userActions.updateUserSuccess({ data: response.data, message: response.message }));
    } catch (error) {
        yield put(userActions.handleError(error.message));
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
        yield put(userActions.changePasswordSuccess(response));
        yield put(userActions.getUser(action.payload.token));
    } catch (error) {
        yield put(userActions.handleError(error.message));
        yield put(userActions.getUser(action.payload.token));
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.updateUser, updateUserSaga);
    yield takeLatest(userActions.getUser, getUserSaga);
    yield takeLatest(userActions.changePassword, changePasswordSaga);
}
