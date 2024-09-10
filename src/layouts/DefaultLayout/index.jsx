import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header/header';
import Footer from '~/components/Footer/footer';

const DefaultLayout = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </Fragment>
    );
};

export default DefaultLayout;
