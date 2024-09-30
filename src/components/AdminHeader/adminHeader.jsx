import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'antd';
import logo from '~/assets/images/logo.png';
import defaultAvatar from '~/assets/images/avatar.jpg';
import { authActions } from '~/redux/slice/authSlice';

const AdminHeader = () => {
    const navList = [
        {
            id: 1,
            name: 'Profile',
            path: 'admin-profile'
        },
        {
            id: 2,
            name: 'Change Password',
            path: 'admin-change-password'
        }
    ];
    const user = useSelector((state) => state.user.user);

    let urlImage = import.meta.env.URL_IMAGE || 'http://localhost:3001/images/';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(authActions.logoutUser());
        navigate('/login');
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleOnClick = () => {
        navigate('/');
    };

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className='fixed top-0 right-0 flex items-center justify-between w-full px-10 py-4 bg-white shadow-xl'>
            <div
                className='flex items-end gap-2 text-[#6699BB] cursor-pointer'
                onClick={handleOnClick}
            >
                <img src={logo} alt='Logo' />
                <span className='mb-2 text-3xl font-bold uppercase'>HuyMotorbike</span>
            </div>
            <Popover
                content={
                    <div className='flex flex-col gap-2 w-60 '>
                        <span className='text-2xl font-bold'>
                            {user.lastName + ' ' + user.firstName}
                        </span>
                        <span className='text-xl'>{user.email}</span>
                        <div className='border-y-2 border-[#f4f4f4] py-1'>
                            {navList.map((item) => (
                                <div
                                    key={item.id}
                                    className={'text-2xl cursor-pointer py-2 hover:bg-[#f4f4f4]'}
                                    onClick={() => handleClick(item.path)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <span
                            className='my-2 text-2xl text-red-500 cursor-pointer'
                            onClick={handleLogout}
                        >
                            Log Out
                        </span>
                    </div>
                }
                trigger='click'
                open={open}
                onOpenChange={handleOpenChange}
            >
                <img
                    src={user.avatar ? urlImage + user.avatar : defaultAvatar}
                    className='-bottom-7 size-20 rounded-full left-10 border-2 border-[#e2e3e2]'
                />
            </Popover>
        </div>
    );
};

export default AdminHeader;
