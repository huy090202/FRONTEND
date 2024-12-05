import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '~/redux/slice/userSlice';
import { getToken, setToken } from '~/utils/token';
import SectionBanner from './SectionBanner/sectionBanner';
import SectionPart from './SectionPart/sectionPart';
import SectionTech from './SectionTech/sectionTech';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { checkStatusPayment } from '~/services/invoiceService';

const HomePage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [initialized, setInitialized] = useState(() => {
        return getToken('initialized') ? getToken('initialized') : false;
    });

    useEffect(() => {
        const initialize = async () => {
            if (!initialized) {
                const authData = getToken('auth');
                if (authData && authData.auth && authData.auth.access_token) {
                    dispatch(userActions.getUser(authData.auth.access_token));
                }
                setInitialized(true);
                setToken('initialized', true);
            }

            const apptransid = searchParams.get('apptransid');
            if (apptransid) {
                const authData = getToken('auth');
                const check = await checkStatusPayment(
                    authData.auth.access_token.access_token,
                    apptransid
                );
                if (check.data.return_code === 1) {
                    toast.success(check.data.return_message);
                } else if (check.data.return_code === 2) {
                    toast.error(check.data.return_message);
                } else if (check.return_code === 3) {
                    toast.warning(check.return_message);
                }
            }
        };

        initialize();
    }, [dispatch, initialized, searchParams]);

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
