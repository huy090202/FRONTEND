import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserRouter } from '~/routers';
import { DefaultLayout } from '~/layouts';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Fragment>
            <Routes>
                {UserRouter.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        </Fragment>
    );
}

export default App;
