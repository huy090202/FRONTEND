import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '~/utils/token';
import { authActions } from '~/redux/slice/authSlice';
import { userActions } from '~/redux/slice/userSlice';
import { getUser } from '~/services/userService';
import { Spin } from 'antd';

const ProtectedRoute = ({ children, roleRequired }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const storedAuth = getToken('auth');
            const storedUser = getToken('user');

            if (storedAuth) {
                dispatch(authActions.restoreAuthState(storedAuth));
            }

            if (storedUser) {
                dispatch(userActions.restoreUserState(storedUser));
            }

            if (storedAuth && storedAuth.isAuthenticated) {
                try {
                    const userData = await getUser(storedAuth.auth.access_token);
                    dispatch(userActions.getUserSuccess(userData.data));
                } catch (error) {
                    console.error('Truy xuất thông tin người dùng không thành công:', error);
                    dispatch(authActions.logoutUser());
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                navigate('/login');
            } else if (!roleRequired.includes(user.role)) {
                navigate('/');
            }
        }
    }, [isAuthenticated, user.role, roleRequired, navigate, loading]);

    if (loading) {
        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                <Spin size='large' />
            </div>
        );
    }

    return isAuthenticated && roleRequired.includes(user.role) ? children : null;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roleRequired: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedRoute;
