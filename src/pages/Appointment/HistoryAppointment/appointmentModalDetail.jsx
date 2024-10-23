/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DatePicker, Image, Input, Modal, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { WrapperSelect } from '../CreateAppointment/style';
import dayjs from 'dayjs';
import { allMotors } from '~/services/motorService';
import { toast } from 'react-toastify';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    createAppoinmentImage,
    deleteAppointmentImage,
    getAllImages,
    updateAppoinment
} from '~/services/appoinmentService';
import AppointmentEditImage from './appointmentEditImage';

const AppointmentModalDetail = ({ isVisible, onCancel, appoint }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [motorData, setMotorData] = useState([]);
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [appointmentTime, setAppointmentTime] = useState(null);
    const [appointmentEndTime, setAppointmentEndTime] = useState(null);
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const [images, setimages] = useState([]);
    const [hoveredImageId, setHoveredImageId] = useState(null);
    const [isEditImageModalVisible, setIsEditImageModalVisible] = useState(false);
    const [selectedImageForEdit, setSelectedImageForEdit] = useState(null);

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

        const fetchImages = async () => {
            if (!token) {
                return;
            }

            try {
                const response = await getAllImages(token, { appointmentId: appoint.id });
                const images = response.data;
                setimages(images);
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
        fetchImages();
    }, [token, appoint]);

    useEffect(() => {
        if (appoint) {
            const defaultMotor = motorData.find((motor) => motor.id === appoint.motor_id);
            setSelectedMotor(
                defaultMotor ? { value: defaultMotor.id, label: defaultMotor.motor_name } : null
            );
            setAppointmentDate(dayjs(appoint.appointment_date));
            setAppointmentTime(dayjs(appoint.appointment_time, 'HH:mm:ss'));
            setAppointmentEndTime(dayjs(appoint.appointment_end_time, 'HH:mm:ss'));
            setContent(appoint.content);
            setStatus(appoint.status);
        }
    }, [appoint, motorData]);

    const handleSaveChanges = async () => {
        try {
            const appointmentData = {
                appointmentId: appoint.id,
                appointment_date: appointmentDate,
                appointment_time: appointmentTime ? appointmentTime.format('HH:mm:ss') : null,
                appointment_end_time: appointmentEndTime
                    ? appointmentEndTime.format('HH:mm:ss')
                    : null,
                content: content,
                motor_id: selectedMotor.value
            };

            await updateAppoinment(token, appointmentData);

            toast.success('Cập nhật lịch hẹn thành công!');
            onCancel();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại!');
            } else {
                toast.error('Lỗi mạng, vui lòng kiểm tra kết nối!');
            }
        }
    };

    const handleUploadFilesImage = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('image_url', file);
                formData.append('appointment_id', appoint.id);

                const response = await createAppoinmentImage(token, formData);
                const newImage = response.data;

                setimages((prevImages) => [...prevImages, newImage]);

                toast.success('Ảnh đã được tải lên thành công!');
            } catch (error) {
                toast.error('Tải lên ảnh thất bại!');
            }
        }
    };

    const handleEditImage = (image) => {
        setSelectedImageForEdit(image);
        setIsEditImageModalVisible(true);
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await deleteAppointmentImage(token, imageId);
            setimages((prevImages) => prevImages.filter((image) => image.id !== imageId));
            toast.success('Xóa ảnh thành công!');
        } catch (error) {
            toast.error('Xóa ảnh thất bại!');
        }
    };

    const handleReviewImage = () => {
        return images.map((image, index) => (
            <div
                key={index}
                onMouseEnter={() => status === 'PENDING' && setHoveredImageId(image.id)}
                onMouseLeave={() => setHoveredImageId(null)}
                className='relative'
            >
                <Image
                    src={image.image_url ? `/minio${image.image_url}` : image.preview}
                    alt={`image-preview-${index}`}
                    className='object-cover size-72'
                />
                {hoveredImageId === image.id && status === 'PENDING' && (
                    <div className='absolute flex gap-3 text-3xl bottom-5 right-1/3'>
                        <EditOutlined
                            onClick={() => handleEditImage(image)}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        />
                        <DeleteOutlined
                            onClick={() => handleDeleteImage(image.id)}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                )}
            </div>
        ));
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{
                fontFamily: 'LXGW WenKai TC',
                cursive: 'LXGW Wen'
            }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết lịch hẹn</div>
            {appoint && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên xe:</label>
                        <WrapperSelect
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
                            disabled={status !== 'PENDING'}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Ngày hẹn:</label>
                        <DatePicker
                            value={appointmentDate}
                            onChange={(date) => setAppointmentDate(date)}
                            disabled={status !== 'PENDING'}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giờ bắt đầu bảo dưỡng:</label>
                        <TimePicker
                            value={appointmentTime}
                            onChange={(time) => setAppointmentTime(time)}
                            disabled={status !== 'PENDING'}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giờ kết thúc bảo dưỡng:</label>
                        <TimePicker
                            value={appointmentEndTime}
                            onChange={(time) => setAppointmentEndTime(time)}
                            disabled={status !== 'PENDING'}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Ghi chú tình trạng xe:</label>
                        <TextArea
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={status !== 'PENDING'}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl'>Chọn ảnh (nếu có):</span>
                        <div className='flex'>
                            <label
                                htmlFor='file'
                                className='text-5xl cursor-pointer'
                                disabled={status !== 'PENDING'}
                            >
                                <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-52'>
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
                                disabled={status !== 'PENDING'}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Trạng thái:</label>
                        <Input size='large' value={status} disabled />
                    </div>
                    {status === 'PENDING' && (
                        <div className='flex justify-end w-full'>
                            <button
                                className='px-6 py-3 mr-2 text-xl text-white bg-black rounded-2xl'
                                onClick={handleSaveChanges}
                            >
                                Lưu những thay đổi
                            </button>
                        </div>
                    )}
                </div>
            )}
            <AppointmentEditImage
                isEditImageModalVisible={isEditImageModalVisible}
                imageForEdit={selectedImageForEdit}
                onCancel={() => setIsEditImageModalVisible(false)}
                token={token}
            />
        </Modal>
    );
};

export default AppointmentModalDetail;
