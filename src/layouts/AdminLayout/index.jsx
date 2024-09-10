import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <Fragment>
            <div className='flex flex-col items-center w-[80%] h-fit mx-auto mt-5'>
                <div className='flex justify-center w-full h-fit border-2 border-[#eeefee] rounded-2xl'>
                    <Outlet />
                </div>
            </div>
        </Fragment>
    );
};

export default AdminLayout;
