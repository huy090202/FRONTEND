import { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '~/redux/slice/authSlice';
import { getToken } from '~/utils/token';
import logo from '~/assets/images/logo.png';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authData = getToken('auth');
        if (authData && authData.isAuthenticated) {
            dispatch(
                authActions.loginUserSuccess({
                    data: authData.auth,
                    message: null
                })
            );
        }
    }, [dispatch]);

    const logOutHandler = () => {
        dispatch(authActions.logoutUser());
        navigate('/login');
    };

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <Fragment>
            <header className='sticky top-0 z-10 flex items-center justify-between p-4 text-white bg-blue-500'>
                <div className='w-[80%] flex items-center justify-between mx-auto'>
                    <div
                        className='flex items-end gap-2 text-[#6699BB] cursor-pointer'
                        onClick={handleOnClick}
                    >
                        <img src={logo} alt='Logo' />
                        <span className='mb-2 text-3xl font-bold uppercase'>HuyMotorbike</span>
                    </div>
                    <div className='flex gap-10'>
                        {isAuthenticated ? (
                            <Fragment>
                                <Link to='/profile'>
                                    <Button className='text-blue-500'>Profile</Button>
                                </Link>
                                <Button className='text-blue-500' onClick={logOutHandler}>
                                    Logout
                                </Button>
                            </Fragment>
                        ) : (
                            <Link to='/login'>
                                <Button className='text-blue-500'>Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
