import { call, put, takeLatest } from 'redux-saga/effects';
import { orderActions } from '~/redux/slice/orderSlice';
import { allOrders, allOrdersByUser, updateOrderStatus } from '~/services/orderService';

// Admin
// Lấy danh sách đơn hàng
function* fetchOrdersSage(action) {
    try {
        const { token, page, limit } = action.payload;
        const response = yield call(allOrders, token, page, limit);
        if (response.status === true) {
            yield put(orderActions.fetchOrdersSuccess(response.data));
        } else {
            yield put(orderActions.fetchOrdersFailure(response.message));
        }
    } catch (error) {
        yield put(orderActions.fetchOrdersFailure(error.message));
    }
}

// Cập nhật trạng thái đơn hàng
function* updateOrderStatusSaga(action) {
    try {
        const { token, id, status } = action.payload;
        const response = yield call(updateOrderStatus, token, id, status);
        if (response.status === true) {
            yield put(orderActions.updateOrderStatusSuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(orderActions.updateOrderStatusFailure(response.message));
        }
    } catch (error) {
        yield put(orderActions.updateOrderStatusFailure(error.message));
    }
}

// User
// Lấy danh sách đơn hàng
function* fetchOrdersByUserSage(action) {
    try {
        const { token } = action.payload;
        const response = yield call(allOrdersByUser, token);
        if (response.status === true) {
            yield put(orderActions.fetchOrdersByUserSuccess(response.data));
        } else {
            yield put(orderActions.fetchOrdersByUserFailure(response.message));
        }
    } catch (error) {
        yield put(orderActions.fetchOrdersByUserFailure(error.message));
    }
}

export default function* orderSaga() {
    // Admin
    yield takeLatest(orderActions.fetchOrders, fetchOrdersSage);
    yield takeLatest(orderActions.updateOrderStatus, updateOrderStatusSaga);
    // User
    yield takeLatest(orderActions.fetchOrdersByUser, fetchOrdersByUserSage);
}