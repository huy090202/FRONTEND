import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import SectionInfo from '~/layouts/ProfileLayout/SectionInfo/sectionInfo';
import SectionNav from '~/layouts/ProfileLayout/SectionNav/sectionNav';

const ProfileLayout = () => {
    return (
        <Fragment>
            <div className='flex flex-col items-center w-[80%] h-fit mx-auto'>
                <SectionInfo />
                <SectionNav />
                <div className='flex justify-center w-full h-fit border-2 border-[#eeefee] rounded-2xl'>
                    <Outlet />
                </div>
            </div>
        </Fragment>
    );
};

export default ProfileLayout;
