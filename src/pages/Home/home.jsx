import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '~/redux/slice/userSlice';
import { getToken, setToken } from '~/utils/token';

const HomePage = () => {
    const dispatch = useDispatch();

    const [initialized, setInitialized] = useState(() => {
        return getToken('initialized') ? getToken('initialized') : false;
    });

    useEffect(() => {
        if (!initialized) {
            const authData = getToken('auth');

            if (authData && authData.auth && authData.auth.access_token) {
                dispatch(userActions.getUser(authData.auth.access_token));
            }
            setInitialized(true);
            setToken('initialized', true);
        }
    }, [dispatch, initialized]);

    return (
        <Fragment>
            <div className='my-5 text-center'>
                <h1 className='text-5xl font-bold'>Home Page</h1>
            </div>
        </Fragment>
    );
};
export default HomePage;
