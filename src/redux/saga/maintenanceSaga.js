import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import { getMaintenancesByTech } from '~/services/maintenanceService';

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

export default function* maintenanceSaga() {
    yield takeLatest(maintenanceActions.fetchMaintenancesByTech, fetchMaintenancesByTech);
}