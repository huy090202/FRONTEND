import { Image } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '~/components/shared/Loading/loading';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import { getAppoinmentDetail } from '~/services/appoinmentService';
import { getMotorById } from '~/services/motorService';
import { getUserById } from '~/services/userService';
import { FormatDate } from '~/utils/formatDate';
import NotFound from '~/assets/images/Not_Found.png';
import MaintenanceModalDetail from './MaintenanceModalDetail';

const Maintenance = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { maintenancesTech, isLoading } = useSelector((state) => state.maintenance);

    // Data Appointment, Motor, User
    const [appoint, setAppoint] = useState([]);
    const [user, setUser] = useState([]);
    const [motor, setMotor] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Quản lý trạng thái modal
    const [selectedMaintenance, setSelectedMaintenance] = useState(null); // Thông tin maintenance, appoint, motor, user

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMaintenance = async () => {
            try {
                if (!token) return;
                await dispatch(maintenanceActions.fetchMaintenancesByTech(token));
            } catch (err) {
                console.error(err);
                toast.error('Lấy danh sách đơn bảo dưỡng thất bại');
            }
        };

        const getAppointAndUser = async () => {
            try {
                if (!token || maintenancesTech.length === 0) return;

                const appointArr = await Promise.all(
                    maintenancesTech.map(async (maintenance) => {
                        const resAppoint = await getAppoinmentDetail(
                            token,
                            maintenance.appointment_id
                        );
                        return resAppoint.data;
                    })
                );
                setAppoint(appointArr);

                const userArr = await Promise.all(
                    appointArr.map(async (app) => {
                        const resUser = await getUserById(token, app.user_id);
                        return resUser.data;
                    })
                );
                setUser(userArr);
            } catch (error) {
                console.error(error);
                toast.error('Lấy thông tin lịch hẹn hoặc người dùng thất bại');
            }
        };

        const getMotor = async () => {
            try {
                if (!token || maintenancesTech.length === 0) return;

                const motorArr = await Promise.all(
                    maintenancesTech.map(async (maintenance) => {
                        const resMotor = await getMotorById(token, maintenance.motor_id);
                        return resMotor.data;
                    })
                );
                setMotor(motorArr);
            } catch (error) {
                console.error(error);
                toast.error('Lấy thông tin xe thất bại');
            }
        };

        fetchMaintenance();
        getAppointAndUser();
        getMotor();
    }, [token, maintenancesTech.length > 0]);

    const handleOpenModal = (index) => {
        setSelectedMaintenance({
            maintenance: maintenancesTech[index],
            appoint: appoint[index],
            user: user[index],
            motor: motor[index]
        });
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

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
                        Danh sách đơn bảo dưỡng
                    </h1>
                    {maintenancesTech.length === 0 && (
                        <div className='flex items-center justify-center'>
                            <img src={NotFound} alt='#NotFound' className='w-[50%] h-[50%]' />
                        </div>
                    )}
                    <div
                        className='grid gap-10'
                        style={{
                            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
                        }}
                    >
                        {maintenancesTech &&
                            maintenancesTech.length > 0 &&
                            maintenancesTech.map((item, index) => (
                                <div
                                    className='p-5 border-2 border-[#d6d6d6] cursor-pointer rounded-xl'
                                    key={item.id}
                                >
                                    <div>
                                        <Image
                                            src={
                                                appoint[index]?.images?.length > 0
                                                    ? `/minio${appoint[index]?.images[0]?.image_url}`
                                                    : 'https://placehold.co/400x450'
                                            }
                                            alt='Appointment Image'
                                            className='rounded-lg hover:rounded-lg'
                                            width={175}
                                            height={197}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-2xl font-bold'>Thông tin khách hàng</p>
                                        <p className='flex items-center gap-2'>
                                            <span className='text-xl font-bold'>Tên:</span>
                                            <span className='text-xl'>
                                                {user[index]?.lastName +
                                                    ' ' +
                                                    user[index]?.firstName}
                                            </span>
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <span className='text-xl font-bold'>
                                                Số điện thoại:
                                            </span>
                                            <span className='text-xl'>
                                                {user[index]?.phoneNumber}
                                            </span>
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <span className='text-xl font-bold'>Email:</span>
                                            <span className='overflow-hidden text-xl whitespace-nowrap text-ellipsis'>
                                                {user[index]?.email}
                                            </span>
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <span className='text-xl font-bold'>Ngày hẹn:</span>
                                            <span className='text-xl'>
                                                {FormatDate(appoint[index]?.appointment_date)}
                                            </span>
                                        </p>
                                        <p className='flex items-center gap-2'>
                                            <span className='text-xl font-bold'>Giờ hẹn:</span>
                                            <span className='text-xl'>
                                                {appoint[index]?.appointment_time}
                                            </span>
                                        </p>
                                        <div className='flex justify-end w-full'>
                                            <button
                                                className='px-6 py-3 mr-2 text-xl text-white bg-black rounded-2xl'
                                                onClick={() => handleOpenModal(index)}
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Modal chi tiết */}
            <MaintenanceModalDetail
                visible={isModalVisible}
                onCancel={handleCloseModal}
                maintenance={selectedMaintenance?.maintenance}
                appoint={selectedMaintenance?.appoint}
                motor={selectedMaintenance?.motor}
                user={selectedMaintenance?.user}
            />
        </Fragment>
    );
};

export default Maintenance;
