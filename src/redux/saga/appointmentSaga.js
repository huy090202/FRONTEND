import { call, put, takeLatest } from 'redux-saga/effects';
import { appointmentActions } from '~/redux/slice/appointmentSlice';
import { deleteAppoinment, getAllAppoinmentsAdmin, getAllAppoinmentsUser, updateAppoinmentStatus } from '~/services/appoinmentService';

// Admin
// Lấy danh sách lịch hẹn
function* fetchAppointmentsSage(action) {
    try {
        const { token, page, limit } = action.payload;
        const response = yield call(getAllAppoinmentsAdmin, token, page, limit);
        if (response.status === true) {
            yield put(appointmentActions.fetchAppointmentsSuccess(response.data));
        } else {
            yield put(appointmentActions.fetchAppointmentsFailure(response.message));
        }
    } catch (error) {
        yield put(appointmentActions.fetchAppointmentsFailure(error.message));
    }
}

// Cập nhật trạng thái lịch hẹn
function* updateAppoimentStatusSaga(action) {
    try {
        const { token, appointmentId, status } = action.payload;
        const response = yield call(updateAppoinmentStatus, token, appointmentId, status);
        if (response.status === true) {
            yield put(appointmentActions.updateAppoimentStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(appointmentActions.updateAppoimentStatusFailure(response.message));
        }
    } catch (error) {
        yield put(appointmentActions.updateAppoimentStatusFailure(error.message));
    }
}

// Xóa lịch hẹn
function* deleteAppointmentSaga(action) {
    try {
        const { token, appointmentId } = action.payload;
        const response = yield call(deleteAppoinment, token, appointmentId);
        if (response.status === true) {
            yield put(appointmentActions.deleteAppointmentSuccess(appointmentId));
        } else {
            yield put(appointmentActions.deleteAppointmentFailure(response.message));
        }
    } catch (error) {
        yield put(appointmentActions.deleteAppointmentFailure(error.message));
    }
}

// User
// Lấy danh sách lịch hẹn
function* fetchAppointmentsByUserSage(action) {
    try {
        const { token } = action.payload;
        const response = yield call(getAllAppoinmentsUser, token);
        if (response.status === true) {
            yield put(appointmentActions.fetchAppointmentsByUserSuccess(response.data));
        } else {
            yield put(appointmentActions.fetchAppointmentsByUserFailure(response.message));
        }
    } catch (error) {
        yield put(appointmentActions.fetchAppointmentsByUserFailure(error.message));
    }
}

export default function* appointmentSaga() {
    // Admin
    yield takeLatest(appointmentActions.fetchAppointments, fetchAppointmentsSage);
    yield takeLatest(appointmentActions.updateAppoimentStatus, updateAppoimentStatusSaga);
    yield takeLatest(appointmentActions.deleteAppointment, deleteAppointmentSaga);
    // User
    yield takeLatest(appointmentActions.fetchAppointmentsByUser, fetchAppointmentsByUserSage);
}