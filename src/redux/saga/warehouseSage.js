import { call, put, takeLatest } from 'redux-saga/effects';
import { warehouseActions } from '~/redux/slice/warehouseSlice';
import { allWarehousesPublic, changeWarehouseStatus, createWarehouse, deleteWarehouse, getAllWarehouses, updateWarehouse } from '~/services/warehouseService';

// Lấy danh sách nhà kho - User
function* fetchWarehousesSaga() {
    try {
        const response = yield call(allWarehousesPublic);
        if (response.status === true) {
            yield put(warehouseActions.fetchWarehousesSuccess(response.data));
        } else {
            yield put(warehouseActions.fetchWarehousesFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.fetchWarehousesFailure(error.message));
    }
}

// Lấy danh sách nhà kho - Admin
function* fetchWarehousesAdminSaga(action) {
    try {
        const { token, page, limit, active } = action.payload;
        const response = yield call(getAllWarehouses, token, page, limit, active);
        if (response.status === true) {
            yield put(warehouseActions.fetchWarehousesAdminSuccess(
                {
                    data: response.data,
                    total: response.total,
                    limit: response.limit,
                }
            ));
        } else {
            yield put(warehouseActions.fetchWarehousesAdminFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.fetchWarehousesAdminFailure(error.message));
    }
}

// Tạo nhà kho
function* createWarehouseSaga(action) {
    try {
        const { token, data } = action.payload;
        const response = yield call(createWarehouse, token, data);
        if (response.status === true) {
            yield put(warehouseActions.createWarehouseSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(warehouseActions.createWarehouseFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.createWarehouseFailure(error.message));
    }
}

// Cập nhật nhà kho
function* updateWarehouseSaga(action) {
    try {
        const { token, id, data } = action.payload;
        const response = yield call(updateWarehouse, token, id, data);
        if (response.status === true) {
            yield put(warehouseActions.updateWarehouseSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(warehouseActions.updateWarehouseFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.updateWarehouseFailure(error.message));
    }
}

// Xóa nhà kho
function* deleteWarehouseSaga(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deleteWarehouse, token, id);
        if (response.status === true) {
            yield put(warehouseActions.deleteWarehouseSuccess({
                id,
                message: response.message,
            }));
        } else {
            yield put(warehouseActions.deleteWarehouseFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.deleteWarehouseFailure(error.message));
    }
}

// Cập nhật trạng thái nhà kho
function* changeWarehouseStatusSaga(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeWarehouseStatus, token, id, active);
        if (response.status === true) {
            yield put(warehouseActions.updateWarehouseStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(warehouseActions.updateWarehouseStatusFailure(response.message));
        }
    } catch (error) {
        yield put(warehouseActions.updateWarehouseStatusFailure(error.message));
    }
}

export default function* warehouseSaga() {
    // User
    yield takeLatest(warehouseActions.fetchWarehouses, fetchWarehousesSaga);
    // Admin
    yield takeLatest(warehouseActions.fetchWarehousesAdmin, fetchWarehousesAdminSaga);
    yield takeLatest(warehouseActions.createWarehouse, createWarehouseSaga);
    yield takeLatest(warehouseActions.updateWarehouse, updateWarehouseSaga);
    yield takeLatest(warehouseActions.deleteWarehouse, deleteWarehouseSaga);
    yield takeLatest(warehouseActions.updateWarehouseStatus, changeWarehouseStatusSaga);
}