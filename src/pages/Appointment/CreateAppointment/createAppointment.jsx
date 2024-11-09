import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { DatePicker, Button, Spin, TimePicker, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { createAppoinment, createAppoinmentImage } from '~/services/appoinmentService';
import { allMotors } from '~/services/motorService';
import { WrapperSelect } from './style';

const CreateAppointment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [appointDate, setAppointDate] = useState('');
    const [appointTime, setAppointTime] = useState('');
    const [appointNote, setAppointNote] = useState('');

    const [motorData, setMotorData] = useState([]);
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setimages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await allMotors(token);
                const motors = response.data;
                setMotorData(motors);

                if (motors.length > 0) {
                    setSelectedMotor({ value: motors[0].id, label: motors[0].motor_name });
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token]);

    const createAppointmentHandler = async () => {
        try {
            setLoading(true);
            if (!appointDate || !appointTime || !selectedMotor) {
                toast.error('Các bắc buộc trường không được để trống');
                return;
            }

            // Chuyển đổi thời gian sang định dạng HH:mm:ss
            const formattedAppointTime = appointTime ? dayjs(appointTime).format('HH:mm:ss') : null;

            // Tạo lịch hẹn
            const response = await createAppoinment(token, {
                appointmentDate: appointDate,
                appointmentTime: formattedAppointTime,
                notes: appointNote,
                motorId: selectedMotor.value
            });

            if (response.status === true) {
                toast.success(response.message);

                const appointmentId = response.data.id;
                if (images.length > 0) {
                    const formData = new FormData();
                    formData.append('appointment_id', appointmentId);

                    images.forEach((image) => {
                        formData.append('image_url', image.file);
                    });

                    // Tạo ảnh lịch hẹn
                    const responseImage = await createAppoinmentImage(token, formData);
                    if (responseImage.status === false) toast.error(responseImage.message);
                }

                // Reset form
                setAppointDate('');
                setAppointTime('');
                setAppointNote('');
                setimages([]);
                if (motorData.length > 0) {
                    setSelectedMotor({ value: motorData[0].id, label: motorData[0].motor_name });
                }
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Có lỗi xảy ra trong quá trình tạo lịch hẹn';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadFilesImage = (e) => {
        const files = Array.from(e.target.files);
        const imagesPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setimages(imagesPreview);
    };

    const handleReviewImage = () => {
        return images.map((image, index) => (
            <div key={index}>
                <Image src={image.preview} alt={`image-preview-${index}`} className='size-60' />
            </div>
        ));
    };

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Spin size='large' />
                </div>
            )}
            <section className='flex items-center justify-center w-full py-12 bg-white h-fit'>
                <div
                    className='w-[60%] shadow-2xl bg-[rgba(0,0,0,0.11)] p-20 rounded-xl
                '
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <h1 className='mb-10 text-4xl font-bold text-center uppercase'>
                        Đăng ký lịch bảo dưỡng
                    </h1>

                    <div className='flex flex-col gap-5'>
                        <div className='flex items-center justify-between gap-10'>
                            <div className='flex flex-col flex-1 gap-2'>
                                <label className='text-2xl'>
                                    <span className='mr-2 text-red-500'>*</span>
                                    Ngày mang xe đến cửa hàng:
                                </label>
                                <DatePicker
                                    value={appointDate}
                                    onChange={(date) => setAppointDate(date)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontFamily: 'LXGW WenKai TC',
                                        cursive: 'LXGW Wen'
                                    }}
                                    className='hover:border-[#d6d6d6]'
                                />
                            </div>
                            <div className='flex flex-col flex-1 gap-2'>
                                <label className='text-2xl'>
                                    <span className='mr-2 text-red-500'>*</span>
                                    Chọn xe của bạn:
                                </label>
                                <WrapperSelect
                                    style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                                    labelInValue
                                    value={selectedMotor}
                                    onChange={(e) => setSelectedMotor(e)}
                                    options={
                                        Array.isArray(motorData)
                                            ? motorData.map((motor) => ({
                                                  value: motor.id,
                                                  label: motor.motor_name
                                              }))
                                            : []
                                    }
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-between gap-10'>
                            <div className='flex flex-col flex-1 gap-2'>
                                <label className='text-2xl'>
                                    <span className='mr-2 text-red-500'>*</span>
                                    Thời gian bắt đầu:
                                </label>
                                <TimePicker
                                    value={appointTime}
                                    onChange={(time) => setAppointTime(time)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontFamily: 'LXGW WenKai TC',
                                        cursive: 'LXGW Wen'
                                    }}
                                    className='hover:border-[#d6d6d6]'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-2xl'>Ghi chú (nếu có):</label>
                            <TextArea
                                rows={4}
                                value={appointNote}
                                onChange={(e) => setAppointNote(e.target.value)}
                                style={{
                                    backgroundColor: 'transparent',
                                    fontFamily: 'LXGW WenKai TC',
                                    cursive: 'LXGW Wen'
                                }}
                                className='hover:border-[#d6d6d6]'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='text-2xl'>Chọn ảnh (nếu có):</span>
                            <div className='flex'>
                                <label htmlFor='file' className='text-5xl cursor-pointer'>
                                    <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-60'>
                                        <PlusOutlined />
                                    </div>
                                </label>
                                <div className='flex items-center justify-center w-full gap-5'>
                                    {handleReviewImage()}
                                </div>
                                <input
                                    id='file'
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    onChange={handleUploadFilesImage}
                                    hidden
                                />
                            </div>
                        </div>
                    </div>

                    <div className='text-right'>
                        <Button
                            className='w-[15%] h-16 hover:bg-[#6699BB] border-[#6699BB] text-[#6699BB] uppercase hover:text-white'
                            type='light'
                            onClick={createAppointmentHandler}
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default CreateAppointment;
