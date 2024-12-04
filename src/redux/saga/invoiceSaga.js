import { call, put, takeLatest } from 'redux-saga/effects';
import { invoiceActions } from '~/redux/slice/invoiceSlice';
import { allInvoices, deleteInvoice } from '~/services/invoiceService';

// Lấy danh sách hóa đơn
function* fetchInvoicesSaga(action) {
    try {
        const { token, page, limit } = action.payload;
        const response = yield call(allInvoices, token, page, limit);
        if (response.status === true) {
            yield put(invoiceActions.fetchInvoicesSuccess(
                {
                    data: response.data,
                    total: response.total,
                    limit: response.limit,
                }
            ));
        } else {
            yield put(invoiceActions.fetchInvoicesFailure(response.message));
        }
    } catch (error) {
        yield put(invoiceActions.fetchInvoicesFailure(error.message));
    }
}

// Xóa hóa đơn
function* deleteInvoiceSaga(action) {
    try {
        const { token, code } = action.payload;
        const response = yield call(deleteInvoice, token, code);
        if (response.status === true) {
            yield put(invoiceActions.deleteInvoiceSuccess({
                code,
                message: response.message,
            }));
        } else {
            yield put(invoiceActions.deleteInvoiceFailure(response.message));
        }
    } catch (error) {
        yield put(invoiceActions.deleteInvoiceFailure(error.message));
    }
}

export default function* invoiceSaga() {
    yield takeLatest(invoiceActions.fetchInvoices, fetchInvoicesSaga);
    yield takeLatest(invoiceActions.deleteInvoice, deleteInvoiceSaga);
}