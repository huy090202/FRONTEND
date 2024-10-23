import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from '~/redux/store';
import '~/index.css';
import { router } from '~/routers';
import 'react-toastify/dist/ReactToastify.css';
import { userActions } from '~/redux/slice/userSlice';
import { getToken } from '~/utils/token';
import { authActions } from './redux/slice/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = getToken('user');
        const storedAuth = getToken('auth');
        if (storedUser) {
            dispatch(userActions.restoreUserState(storedUser));
        }
        if (storedAuth) {
            dispatch(authActions.restoreAuthState(storedAuth));
        }
    }, [dispatch]);

    return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Fragment>
        <Provider store={store}>
            <App />
        </Provider>
        <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
        />
    </Fragment>
);
