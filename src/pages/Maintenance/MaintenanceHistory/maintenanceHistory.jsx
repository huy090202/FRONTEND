import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '~/components/shared/Loading/loading';

const MaintenanceHistory = () => {
    const id = useParams().maintenanceId;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Fragment>
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <section className='flex items-center justify-center w-full py-12 bg-white h-fit'>
                <div
                    className='w-[80%] shadow-2xl bg-[rgba(0,0,0,0.11)] p-20 rounded-xl flex flex-col gap-10'
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <h1 className='text-4xl font-bold text-center uppercase'>
                        Lịch sử bảo dưỡng trước đó
                    </h1>
                </div>
            </section>
        </Fragment>
    );
};

export default MaintenanceHistory;
