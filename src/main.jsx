import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import '~/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

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
