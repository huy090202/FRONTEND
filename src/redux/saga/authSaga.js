import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '~/services/userService';
import { authActions } from '~/redux/slice/authSlice';

function* loginUserSaga(action) {
    try {
        const response = yield call(login, action.payload);
        if (response.status === true) {
            yield put(authActions.loginUserSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(authActions.loginUserFailure(response.message || 'Login failed'));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        yield put(authActions.loginUserFailure(errorMessage));
    }
}

export default function* authSaga() {
    yield takeLatest(authActions.loginUser, loginUserSaga);
}
