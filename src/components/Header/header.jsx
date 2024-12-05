import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { authActions } from '~/redux/slice/authSlice';
import logo from '~/assets/images/logo.png';
import defaultAvatar from '~/assets/images/avatar.jpg';
import { countCartItems } from '~/redux/selector/cartSelector';

const Header = () => {
    const countCarts = useSelector(countCartItems);
    const nav = [
        {
            id: 1,
            name: 'Trang chủ',
            path: '/'
        },
        {
            id: 2,
            name: 'Phụ tùng thay thế',
            path: '/menu'
        },
        {
            id: 3,
            name: 'Về chúng tôi',
            path: '/about-us'
        },
        {
            id: 4,
            name: 'Đăng ký bảo dưỡng',
            path: '/create-appointment'
        },
        {
            id: 5,
            name: 'Danh sách đơn bảo dưỡng',
            path: '/maintenance-list'
        }
    ];

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const logOutHandler = () => {
        dispatch(authActions.logoutUser());
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleOnClick = () => {
        navigate('/');
    };

    const gotoProfile = () => {
        navigate('/profile');
    };

    const gotoAdmin = () => {
        navigate('/dashboard');
    };

    const handleClick = (path) => {
        navigate(path);
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <Fragment>
            <header className='fixed top-0 right-0 z-10 w-full py-4 bg-white shadow-xl px-28'>
                <div className='flex items-center justify-between mx-auto '>
                    <div
                        className='flex items-end gap-2 text-[#6699BB] cursor-pointer'
                        onClick={handleOnClick}
                    >
                        <img src={logo} alt='Logo' />
                        <span className='mb-2 text-3xl font-bold uppercase'>HuyMotorbike</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        {nav
                            .filter(
                                (item) => !(item.id === 5 && user && user.role !== 'Kỹ thuật viên') // Nếu không phải kỹ thuật viên thì không hiển thị danh sách đơn bảo dưỡng
                            )
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className='px-5 py-2 text-2xl hover:text-[#6699bb] font-bold cursor-pointer'
                                    onClick={() => handleClick(item.path)}
                                >
                                    {item.name}
                                </div>
                            ))}
                    </div>
                    {isAuthenticated && user ? (
                        <div className='flex items-center gap-10'>
                            <Badge count={countCarts} size='small'>
                                <ShoppingCartOutlined
                                    className='text-5xl cursor-pointer'
                                    onClick={handleGoToCart}
                                />
                            </Badge>
                            <div className='text-5xl text-[#eeeffe]'>|</div>
                            <Popover
                                content={
                                    <div
                                        className='flex flex-col gap-2 w-60'
                                        style={{
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                    >
                                        <span className='text-2xl font-bold'>
                                            {user.lastName + ' ' + user.firstName}
                                        </span>
                                        <span className='text-xl'>{user.email}</span>
                                        <div className='border-y-2 border-[#f4f4f4] py-1'>
                                            <div
                                                className='text-2xl cursor-pointer py-2 hover:bg-[#f4f4f4]'
                                                onClick={gotoProfile}
                                            >
                                                Thông tin tài khoản
                                            </div>
                                            {(user.role === 'Quản trị viên' ||
                                                user.role === 'Nhân viên') && (
                                                <div
                                                    className='text-2xl cursor-pointer py-2 hover:bg-[#f4f4f4]'
                                                    onClick={gotoAdmin}
                                                >
                                                    Đến trang quản trị
                                                </div>
                                            )}
                                        </div>
                                        <span
                                            className='my-2 text-2xl text-red-500 cursor-pointer'
                                            onClick={logOutHandler}
                                        >
                                            Đăng xuất
                                        </span>
                                    </div>
                                }
                                trigger='click'
                                open={open}
                                onOpenChange={handleOpenChange}
                            >
                                <img
                                    src={user.avatar ? `/minio${user.avatar}` : defaultAvatar}
                                    className='-bottom-7 size-20 rounded-full left-10 border-2 border-[#e2e3e2]'
                                />
                            </Popover>
                        </div>
                    ) : (
                        <Link to='/login'>
                            <Button className='text-blue-500'>Đăng nhập</Button>
                        </Link>
                    )}
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
