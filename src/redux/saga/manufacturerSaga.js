import { call, put, takeLatest } from 'redux-saga/effects';
import { manufacturerActions } from '~/redux/slice/manufacturerSlice';
import { allManufacturersPublic, changeManufacturerStatus, createManufacturer, deleteManufacturer, getAllManufacturers, updateManufacturer } from '~/services/manufacturerService';

// Lấy danh sách nhà sản xuất - User
function* fetchManufacturersSaga() {
    try {
        const response = yield call(allManufacturersPublic);
        if (response.status === true) {
            yield put(manufacturerActions.fetchManufacturersSuccess(response.data));
        } else {
            yield put(manufacturerActions.fetchManufacturersFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.fetchManufacturersFailure(error.message));
    }
}

// Lấy danh sách nhà sản xuất - Admin
function* fetchManufacturersAdminSaga(action) {
    try {
        const { token, page, limit, active } = action.payload;
        const response = yield call(getAllManufacturers, token, page, limit, active);
        if (response.status === true) {
            yield put(manufacturerActions.fetchManufacturersAdminSuccess(
                {
                    data: response.data,
                    total: response.total,
                    limit: response.limit,
                }
            ));
        } else {
            yield put(manufacturerActions.fetchManufacturersAdminFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.fetchManufacturersAdminFailure(error.message));
    }
}

// Tạo nhà sản xuất
function* createManufacturerSaga(action) {
    try {
        const { token, data } = action.payload;
        const response = yield call(createManufacturer, token, data);
        if (response.status === true) {
            yield put(manufacturerActions.createManufacturerSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(manufacturerActions.createManufacturerFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.createManufacturerFailure(error.message));
    }
}

// Cập nhật nhà sản xuất
function* updateManufacturerSaga(action) {
    try {
        const { token, id, data } = action.payload;
        const response = yield call(updateManufacturer, token, id, data);
        if (response.status === true) {
            yield put(manufacturerActions.updateManufacturerSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(manufacturerActions.updateManufacturerFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.updateManufacturerFailure(error.message));
    }
}

// Xóa nhà sản xuất
function* deleteManufacturerSaga(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deleteManufacturer, token, id);
        if (response.status === true) {
            yield put(manufacturerActions.deleteManufacturerSuccess({
                id,
                message: response.message,
            }));
        } else {
            yield put(manufacturerActions.deleteManufacturerFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.deleteManufacturerFailure(error.message));
    }
}

// Cập nhật trạng thái nhà sản xuất
function* changeManufacturerStatusSaga(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeManufacturerStatus, token, id, active);
        if (response.status === true) {
            yield put(manufacturerActions.updateManufacturerStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(manufacturerActions.updateManufacturerStatusFailure(response.message));
        }
    } catch (error) {
        yield put(manufacturerActions.updateManufacturerStatusFailure(error.message));
    }
}

export default function* manufacturerSaga() {
    // User
    yield takeLatest(manufacturerActions.fetchManufacturers, fetchManufacturersSaga);
    // Admin
    yield takeLatest(manufacturerActions.fetchManufacturersAdmin, fetchManufacturersAdminSaga);
    yield takeLatest(manufacturerActions.createManufacturer, createManufacturerSaga);
    yield takeLatest(manufacturerActions.updateManufacturer, updateManufacturerSaga);
    yield takeLatest(manufacturerActions.deleteManufacturer, deleteManufacturerSaga);
    yield takeLatest(manufacturerActions.updateManufacturerStatus, changeManufacturerStatusSaga);
}