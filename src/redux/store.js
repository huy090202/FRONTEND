import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authReducer, cartReducer, maintenanceReducer, motorReducer, partReducer, userReducer } from '~/redux/slice';
import rootSaga from '~/redux/saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        motor: motorReducer,
        maintenance: maintenanceReducer,
        part: partReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            sagaMiddleware,
        )
});

sagaMiddleware.run(rootSaga);

export { store };


