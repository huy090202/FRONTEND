import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { motorActions } from '~/redux/slice/motorSlice';
import { allMotors, allMotorTemps, createMotor, createMotorTemp } from '~/services/motorService';

// Saga của xe chính
function* fetchMotorsSaga(action) {
    try {
        const response = yield call(allMotors, action.payload);
        if (response.status === true) {
            yield put(motorActions.fetchMotorsSuccess(response.data));
        } else {
            yield put(motorActions.fetchMotorsFailure(response.message));
        }
    } catch (error) {
        yield put(motorActions.fetchMotorsFailure(error.message));
    }
}

function* createMotorSaga(action) {
    const response = yield call(createMotor, action.payload.token, action.payload.data);
    if (response.status === true) {
        toast.success('Tạo xe thành công!');
        yield put(motorActions.addMotorSuccess(response.data));
        yield put(motorActions.fetchMotors(action.payload.token));
    } else {
        yield put(motorActions.fetchMotorsFailure(response.message));
    }
}

// Saga của xe tạm
function* fetchMotorTempsSaga() {
    try {
        const response = yield call(allMotorTemps);
        if (response.status === true) {
            yield put(motorActions.fetchMotorTempsSuccess(response.data));
        } else {
            yield put(motorActions.fetchMotorTempsFailure(response.message));
        }
    } catch (error) {
        yield put(motorActions.fetchMotorTempsFailure(error.message));
    }
}

function* createMotorTempSaga(action) {
    const response = yield call(createMotorTemp, action.payload);
    if (response.status === true) {
        toast.success('Tạo xe thành công!');
        yield put(motorActions.addMotorTempSuccess(response.data));
        yield put(motorActions.fetchMotorTemps());
    } else {
        yield put(motorActions.fetchMotorTempsFailure(response.message));
    }
}

export default function* motorSaga() {
    // Saga của xe chính
    yield takeLatest(motorActions.fetchMotors, fetchMotorsSaga);
    yield takeLatest(motorActions.addMotor, createMotorSaga);
    // Saga của xe tạm
    yield takeLatest(motorActions.fetchMotorTemps, fetchMotorTempsSaga);
    yield takeLatest(motorActions.addMotorTemp, createMotorTempSaga);
}