import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '~/redux/slice/userSlice';
import { getToken, setToken } from '~/utils/token';
import SectionBanner from './SectionBanner/sectionBanner';
import SectionPart from './SectionPart/sectionPart';
import SectionTech from './SectionTech/sectionTech';

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Fragment>
            <section className='flex flex-col gap-10 bg-white'>
                <SectionBanner />
                <SectionPart />
                <SectionTech />
            </section>
        </Fragment>
    );
};
export default HomePage;
