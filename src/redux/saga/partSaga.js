import { call, put, takeLatest } from 'redux-saga/effects';
import { partActions } from '~/redux/slice/partSlice';
import { allPartsPublic, updatePart } from '~/services/partService';

// Lấy danh sách linh kiện - Public <=> active = true
function* fetchPartsSaga() {
    try {
        const response = yield call(allPartsPublic);
        if (response.status === true) {
            yield put(partActions.fetchPartsSuccess(response.data));
        } else {
            yield put(partActions.fetchPartsFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.fetchPartsFailure(error.message));
    }
}

// Lấy danh sách linh kiện - Private

// Update linh kiện
function* updatePartSaga(action) {
    try {
        const response = yield call(updatePart, action.payload.token, action.payload.data);
        if (response.status === true) {
            yield put(partActions.updatePartSuccess(response));
        } else {
            yield put(partActions.updatePartFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.updatePartFailure(error.message));
    }
}

export default function* partSaga() {
    // Public
    yield takeLatest(partActions.fetchParts, fetchPartsSaga);
    // Private
    yield takeLatest(partActions.updatePart, updatePartSaga);
}