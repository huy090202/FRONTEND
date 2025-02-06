import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appointmentReducer, authReducer, cartReducer, categoryReducer, invoiceReducer, maintenanceReducer, manufacturerReducer, motorReducer, orderReducer, partReducer, userReducer, warehouseReducer } from '~/redux/slice';
import rootSaga from '~/redux/saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        motor: motorReducer,
        maintenance: maintenanceReducer,
        part: partReducer,
        cart: cartReducer,
        order: orderReducer,
        appointment: appointmentReducer,
        category: categoryReducer,
        manufacturer: manufacturerReducer,
        warehouse: warehouseReducer,
        invoice: invoiceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            sagaMiddleware,
        )
});

sagaMiddleware.run(rootSaga);

export { store };


