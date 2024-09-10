import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import '~/index.css';
import { router } from './routers';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Fragment>
        <Provider store={store}>
            <RouterProvider router={router} />
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
