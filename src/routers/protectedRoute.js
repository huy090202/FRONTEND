import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuth } from '~/utils/token';
import { authActions } from '~/redux/slice/authSlice';
import { getUser } from '~/services/userService';

const ProtectedRoute = ({ children, roleRequired }) => {
    const [checkRole, setCheckRole] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.auth.access_token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authData = getAuth('auth');
        if (authData && authData.isAuthenticated) {
            dispatch(
                authActions.loginUserSuccess({
                    data: authData.auth,
                    message: null
                })
            );
        }

        const fetchUserRole = async () => {
            if (token) {
                try {
                    const user = await getUser(token);
                    setCheckRole(user?.data?.role);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUserRole();
    }, [dispatch, token]);

    if (!isAuthenticated) {
        return navigate('/login');
    }

    if (!roleRequired.includes(checkRole)) {
        return navigate('/');
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roleRequired: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedRoute;
