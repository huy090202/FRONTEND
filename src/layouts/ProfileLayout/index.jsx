import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header/header';
import SectionInfo from '~/layouts/ProfileLayout/SectionInfo/sectionInfo';
import SectionNav from '~/layouts/ProfileLayout/SectionNav/sectionNav';

const ProfileLayout = () => {
    return (
        <Fragment>
            <Header />
            <div className='flex flex-col items-center w-[80%] h-fit mx-auto mt-5'>
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
