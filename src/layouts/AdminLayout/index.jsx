import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header/header';

const AdminLayout = () => {
    return (
        <Fragment>
            <div className='flex flex-col w-full min-h-screen'>
                <Header />
                <div className='flex justify-center'>
                    <div className='border-2 border-[#eeefee] rounded-2xl w-[20%]'>left</div>
                    <div className='border-2 border-[#eeefee] rounded-2xl w-[80%] flex justify-center'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminLayout;
