import { all } from 'redux-saga/effects';
import authSaga from '~/redux/saga/authSaga';
import userSaga from '~/redux/saga/userSaga';
import motorSaga from '~/redux/saga/motorSaga';
import maintenanceSaga from '~/redux/saga/maintenanceSaga';
import partSaga from './partSaga';
import orderSaga from './orderSaga';
import appointmentSaga from './appointmentSaga';
import categorySaga from './categorySaga';
import manufacturerSaga from './manufacturerSaga';
import warehouseSaga from './warehouseSage';
import invoiceSaga from './invoiceSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        motorSaga(),
        maintenanceSaga(),
        partSaga(),
        orderSaga(),
        appointmentSaga(),
        categorySaga(),
        manufacturerSaga(),
        warehouseSaga(),
        invoiceSaga(),
    ]);
}
