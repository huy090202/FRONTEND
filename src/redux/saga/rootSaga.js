import { all } from 'redux-saga/effects';
import authSaga from '~/redux/saga/authSaga';
import userSaga from '~/redux/saga/userSaga';
import motorSaga from '~/redux/saga/motorSaga';
import maintenanceSaga from '~/redux/saga/maintenanceSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        motorSaga(),
        maintenanceSaga(),
    ]);
}
