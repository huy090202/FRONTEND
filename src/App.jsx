import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { getToken } from '~/utils/token';
import { userActions } from '~/redux/slice/userSlice';
import { authActions } from '~/redux/slice/authSlice';
import { router } from '~/routers';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = getToken('user');
        const storedAuth = getToken('auth');
        if (storedUser) {
            dispatch(userActions.restoreUserState(storedUser));
        }
        if (storedAuth) {
            dispatch(authActions.restoreAuthState(storedAuth));
        }
    }, [dispatch]);

    return <RouterProvider router={router} />;
};

export default App;
