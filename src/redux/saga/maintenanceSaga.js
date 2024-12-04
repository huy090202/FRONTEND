import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import { changeMaintenanceStatus, deleteMaintenance, getAllMaintenances, getMaintenancesByTech, getMaintenancesByUserInProfile, updateMaintenance } from '~/services/maintenanceService';

// Tech
function* fetchMaintenancesByTech(action) {
    try {
        const response = yield call(getMaintenancesByTech, action.payload);
        if (response.status === true) {
            yield put(maintenanceActions.fetchMaintenancesByTechSuccess(response.data));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.fetchMaintenancesByTechFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.fetchMaintenancesByTechFailure(error.message));
    }
}

function* updateMaintenanceByTech(action) {
    try {
        const { token, id, data } = action.payload;
        const response = yield call(updateMaintenance, token, id, data);
        if (response.status === true) {
            yield put(maintenanceActions.updateMaintenanceByTechSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.updateMaintenanceByTechFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.updateMaintenanceByTechFailure(error.message));
    }
}

function* updateMaintenanceStatusByTech(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeMaintenanceStatus, token, id, active);
        if (response.status === true) {
            yield put(maintenanceActions.updateMaintenanceStatusByTechSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.updateMaintenanceStatusByTechFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.updateMaintenanceStatusByTechFailure(error.message));
    }
}

// Admin
function* fetchMaintenancesByAdmin(action) {
    try {
        const { token, page, limit } = action.payload;
        const response = yield call(getAllMaintenances, token, page, limit);
        if (response.status === true) {
            yield put(maintenanceActions.fetchMaintenancesSuccess({
                data: response.data,
                total: response.total,
                limit: response.limit
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.fetchMaintenancesFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.fetchMaintenancesFailure(error.message));
    }
}

function* updateMaintenanceStatus(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeMaintenanceStatus, token, id, active);
        if (response.status === true) {
            yield put(maintenanceActions.updateMaintenanceStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.updateMaintenanceStatusFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.updateMaintenanceStatusFailure(error.message));
    }
}

function* deleteMaintenanceByAdmin(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deleteMaintenance, token, id);
        if (response.status === true) {
            yield put(maintenanceActions.deleteMaintenanceSuccess({
                id,
                message: response.message
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.deleteMaintenanceFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.deleteMaintenanceFailure(error.message));
    }
}

// User
function* fetchMaintenancesByUser(action) {
    try {
        const { token, page, limit } = action.payload;
        const response = yield call(getMaintenancesByUserInProfile, token, page, limit);
        if (response.status === true) {
            yield put(maintenanceActions.fetchMaintenancesByUserSuccess({
                data: response.data,
                total: response.total,
                limit: response.limit
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.fetchMaintenancesByUserFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.fetchMaintenancesByUserFailure(error.message));
    }
}

function* deleteMaintenanceByUser(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deleteMaintenance, token, id);
        if (response.status === true) {
            yield put(maintenanceActions.deleteMaintenanceByUserSuccess({
                id,
                message: response.message
            }));
        } else {
            toast.error(response.message);
            yield put(maintenanceActions.deleteMaintenanceByUserFailure(response.message));
        }
    } catch (error) {
        yield put(maintenanceActions.deleteMaintenanceByUserFailure(error.message));
    }
}

export default function* maintenanceSaga() {
    yield takeLatest(maintenanceActions.fetchMaintenancesByTech, fetchMaintenancesByTech);
    yield takeLatest(maintenanceActions.updateMaintenanceByTech, updateMaintenanceByTech);
    yield takeLatest(maintenanceActions.updateMaintenanceStatusByTech, updateMaintenanceStatusByTech);
    // Admin
    yield takeLatest(maintenanceActions.fetchMaintenances, fetchMaintenancesByAdmin);
    yield takeLatest(maintenanceActions.updateMaintenanceStatus, updateMaintenanceStatus);
    yield takeLatest(maintenanceActions.deleteMaintenance, deleteMaintenanceByAdmin);
    // User
    yield takeLatest(maintenanceActions.fetchMaintenancesByUser, fetchMaintenancesByUser);
    yield takeLatest(maintenanceActions.deleteMaintenance, deleteMaintenanceByUser);
}