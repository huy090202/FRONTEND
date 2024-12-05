import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryActions } from '~/redux/slice/categorySlice';
import { allCategoriesPublic, changeCategoryStatus, createCategory, deleteCategory, getAllCategories, updateCategory } from '~/services/categoryService';

// Lấy danh sách danh mục - User
function* fetchCategoriesSaga() {
    try {
        const response = yield call(allCategoriesPublic);
        if (response.status === true) {
            yield put(categoryActions.fetchCategoriesSuccess(response.data));
        } else {
            yield put(categoryActions.fetchCategoriesFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.fetchCategoriesFailure(error.message));
    }
}

// Lấy danh sách danh mục - Admin
function* fetchCategoriesAdminSaga(action) {
    try {
        const { token, page, limit, active } = action.payload;
        const response = yield call(getAllCategories, token, page, limit, active);
        if (response.status === true) {
            yield put(categoryActions.fetchCategoriesAdminSuccess(
                {
                    data: response.data,
                    total: response.total,
                    limit: response.limit,
                }
            ));
        } else {
            yield put(categoryActions.fetchCategoriesAdminFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.fetchCategoriesAdminFailure(error.message));
    }
}

// Tạo danh mục
function* createCategorySaga(action) {
    try {
        const { token, data } = action.payload;
        const response = yield call(createCategory, token, data);
        if (response.status === true) {
            yield put(categoryActions.createCategorySuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(categoryActions.createCategoryFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.createCategoryFailure(error.message));
    }
}

// Cập nhật danh mục
function* updateCategorySaga(action) {
    try {
        const { token, id, data } = action.payload;
        const response = yield call(updateCategory, token, id, data);
        if (response.status === true) {
            yield put(categoryActions.updateCategorySuccess({
                data: response.data,
                message: response.message,
            }));
        } else {
            yield put(categoryActions.updateCategoryFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.updateCategoryFailure(error.message));
    }
}

// Xóa danh mục
function* deleteCategorySaga(action) {
    try {
        const { token, id } = action.payload;
        const response = yield call(deleteCategory, token, id);
        if (response.status === true) {
            yield put(categoryActions.deleteCategorySuccess({
                id,
                message: response.message,
            }));
        } else {
            yield put(categoryActions.deleteCategoryFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.deleteCategoryFailure(error.message));
    }
}

// Cập nhật trạng thái danh mục
function* changeCategoryStatusSaga(action) {
    try {
        const { token, id, active } = action.payload;
        const response = yield call(changeCategoryStatus, token, id, active);
        if (response.status === true) {
            yield put(categoryActions.updateCategoryStatusSuccess({
                data: response.data,
                message: response.message
            }));
        } else {
            yield put(categoryActions.updateCategoryStatusFailure(response.message));
        }
    } catch (error) {
        yield put(categoryActions.updateCategoryStatusFailure(error.message));
    }
}

export default function* categorySaga() {
    // User
    yield takeLatest(categoryActions.fetchCategories, fetchCategoriesSaga);
    // Admin
    yield takeLatest(categoryActions.fetchCategoriesAdmin, fetchCategoriesAdminSaga);
    yield takeLatest(categoryActions.createCategory, createCategorySaga);
    yield takeLatest(categoryActions.updateCategory, updateCategorySaga);
    yield takeLatest(categoryActions.deleteCategory, deleteCategorySaga);
    yield takeLatest(categoryActions.updateCategoryStatus, changeCategoryStatusSaga);
}