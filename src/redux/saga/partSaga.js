import { call, put, takeLatest } from 'redux-saga/effects';
import { partActions } from '~/redux/slice/partSlice';
import { allPartsPublic, changePartStatus, createPart, deletePart, getAllParts, updatePart } from '~/services/partService';

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
function* fetchPartPrivatesSaga(action) {
    try {
        const { token, page, limit, active } = action.payload;
        const response = yield call(getAllParts, token, page, limit, active);
        if (response.status === true) {
            yield put(partActions.fetchPartPrivatesSuccess(
                {
                    data: response.data,
                    total: response.total,
                    limit: response.limit,
                }
            ));
        } else {
            yield put(partActions.fetchPartPrivatesFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.fetchPartPrivatesFailure(error.message));
    }
}

// Update linh kiện
function* updatePartSaga(action) {
    try {
        const { token, id, formData } = action.payload;
        const response = yield call(updatePart, token, id, formData);
        if (response.status === true) {
            yield put(partActions.updatePartSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(partActions.updatePartFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.updatePartFailure(error.message));
    }
}

// Tạo phụ tùng
function* createPartSaga(action) {
    try {
        const { token, formData } = action.payload;
        const response = yield call(createPart, token, formData);
        if (response.status === true) {
            yield put(partActions.createPartSuccess(
                {
                    data: response.data,
                    message: response.message
                }
            ));
        } else {
            yield put(partActions.createPartFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.createPartFailure(error.message));
    }
}

// Xóa phụ tùng
function* deletePartSaga(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deletePart, token, id);
        if (response.status === true) {
            yield put(partActions.deletePartSuccess({
                id,
                message: response.message,
            }));
        } else {
            yield put(partActions.deletePartFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.deletePartFailure(error.message));
    }
}

// Cập nhật trạng thái phụ tùng
function* changePartStatusSaga(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changePartStatus, token, id, active);
        if (response.status === true) {
            yield put(partActions.updatePartStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(partActions.updatePartStatusFailure(response.message));
        }
    } catch (error) {
        yield put(partActions.updatePartStatusFailure(error.message));
    }
}

export default function* partSaga() {
    // Public
    yield takeLatest(partActions.fetchParts, fetchPartsSaga);
    // Private
    yield takeLatest(partActions.fetchPartPrivates, fetchPartPrivatesSaga);
    yield takeLatest(partActions.createPart, createPartSaga);
    yield takeLatest(partActions.updatePart, updatePartSaga);
    yield takeLatest(partActions.deletePart, deletePartSaga);
    yield takeLatest(partActions.updatePartStatus, changePartStatusSaga);
}