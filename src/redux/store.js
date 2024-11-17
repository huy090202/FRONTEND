import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer, maintenanceReducer, motorReducer, userReducer } from '~/redux/slice';
import rootSaga from '~/redux/saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        motor: motorReducer,
        maintenance: maintenanceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            sagaMiddleware,
        )
});

sagaMiddleware.run(rootSaga);

export { store };


