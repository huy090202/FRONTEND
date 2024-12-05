/* eslint-disable react/prop-types */
import { Image, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentActions } from '~/redux/slice/appointmentSlice';
import { FormatDate } from '~/utils/formatDate';

const AppointmentModalDetail = ({ isVisible, onCancel, appoint }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    // Thông tin khách hàng của lịch hẹn
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Thông tin xe của lịch hẹn
    const [motorName, setMotorName] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');

    // Thông tin lịch hẹn
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [appointmentStatus, setAppointmentStatus] = useState('');
    const [appointmentContent, setAppointmentContent] = useState('');
    const [appointmentImage, setAppointmentImage] = useState([]);

    const dispatch = useDispatch();

    const appointData = useMemo(() => appoint, [appoint]);

    useEffect(() => {
        if (appointData) {
            setName(appointData.user.lastName + ' ' + appointData.user.firstName);
            setEmail(appointData.user.email);
            setPhone(appointData.user.phoneNumber);
            setMotorName(appointData.motor.motor_name);
            setLicensePlate(appointData.motor.license_plate);
            setChassisNumber(appointData.motor.chassis_number);
            setAppointmentDate(appointData.appointment_date);
            setAppointmentTime(appointData.appointment_time);
            setAppointmentStatus(appointData.status);
            setAppointmentContent(appointData.content);
            setAppointmentImage(appointData.images);
        }
    }, [appointData]);

    const statusOptions = useMemo(
        () => [
            { value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
            { value: 'Đã xác nhận', label: 'Đã xác nhận' },
            { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
            { value: 'Đã hủy', label: 'Đã hủy' }
        ],
        []
    );

    const handleChangeStatus = async (newStatus) => {
        if (!token) return;
        dispatch(
            appointmentActions.updateAppoimentStatus({
                token,
                appointmentId: appointData.id,
                status: newStatus
            })
        );
        onCancel();
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={900}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC' }}
        >
            <div className='mb-10 text-4xl font-semibold text-center'>Chi tiết lịch hẹn</div>
            {appoint && (
                <div className='flex flex-col gap-10'>
                    <div className='flex items-start gap-10'>
                        <div className='flex flex-col items-start w-full gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên khách hàng:</label>
                                    <Input size='large' readOnly value={name} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Email:</label>
                                    <Input size='large' readOnly value={email} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                                    <Input size='large' readOnly value={phone} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên xe:</label>
                                    <Input size='large' readOnly value={motorName} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Biển số xe:</label>
                                    <Input size='large' readOnly value={licensePlate} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Số khung:</label>
                                    <Input size='large' readOnly value={chassisNumber} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-5'>
                        <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                            <div className='flex flex-col w-full gap-4 text-gray-800'>
                                <label className='text-2xl font-bold'>Ngày mang xe tới:</label>
                                <Input size='large' readOnly value={FormatDate(appointmentDate)} />
                            </div>
                            <div className='flex flex-col w-full gap-4 text-gray-800'>
                                <label className='text-2xl font-bold'>Giờ mang xe tới:</label>
                                <Input size='large' readOnly value={appointmentTime} />
                            </div>
                            <div className='flex flex-col w-full gap-4 text-gray-800'>
                                <label className='text-2xl font-bold'>Giờ mang xe tới:</label>
                                <Select
                                    className='h-16'
                                    style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                                    value={appointmentStatus}
                                    disabled={
                                        appointmentStatus === 'Đã hoàn thành' ||
                                        appointmentStatus === 'Đã hủy'
                                    }
                                    onChange={(value) => handleChangeStatus(value)}
                                >
                                    {statusOptions.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='flex flex-col w-full gap-4 text-gray-800'>
                                <label className='text-2xl font-bold'>Ghi chú tình trạng xe:</label>
                                <TextArea rows={4} value={appointmentContent} readOnly />
                            </div>
                            <div className='flex flex-col w-full gap-4 text-gray-800'>
                                <label className='text-2xl font-bold'>Ảnh tình trạng xe:</label>
                                <div className='flex items-center justify-center w-full'>
                                    {appointmentImage &&
                                        appointmentImage.length > 0 &&
                                        appointmentImage.map((item) => (
                                            <div className=' w-96 h-96' key={item.id}>
                                                <Image
                                                    loading='lazy'
                                                    className='w-full h-full rounded-2xl'
                                                    alt='#Anhtinhtrangxe'
                                                    src={
                                                        item.image_url
                                                            ? `/minio${item.image_url}`
                                                            : 'https://placehold.co/384'
                                                    }
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className=''>
                        {appointData.details &&
                            appointData.details.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                                >
                                    <div className='flex items-center gap-10'>
                                        <div className='flex items-center justify-center'>
                                            {orderDetailData[index]?.sale > 0 ? (
                                                <Badge.Ribbon
                                                    text={`Giảm ]giá ${orderDetailData[index]?.sale}%`}
                                                    color='red'
                                                >
                                                    <img
                                                        loading='lazy'
                                                        src={
                                                            orderDetailData[index]?.part_image
                                                                ? `/minio${orderDetailData[index]?.part_image}`
                                                                : 'https://placehold.co/256'
                                                        }
                                                        alt='#Ảnh linh kiện'
                                                        className='rounded-2xl size-64'
                                                    />
                                                </Badge.Ribbon>
                                            ) : (
                                                <div className=''>
                                                    <img
                                                        loading='lazy'
                                                        src={
                                                            orderDetailData[index]?.part_image
                                                                ? `/minio${orderDetailData[index]?.part_image}`
                                                                : 'https://placehold.co/256'
                                                        }
                                                        alt='#Ảnh linh kiện'
                                                        className='rounded-2xl size-64'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex flex-col items-start justify-center gap-2'>
                                                <span className='text-2xl font-bold text-[#6699BB]'>
                                                    {orderDetailData[index]?.part_name}
                                                </span>
                                                <span className='text-2xl font-[500]'>
                                                    Số lượng: {item?.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-2xl font-[500] text-gray-800'>
                                                {formatVND(Number(item.price))} VNĐ
                                            </span>
                                            {orderDetailData[index]?.sale > 0 && (
                                                <span className='text-2xl text-gray-400 line-through'>
                                                    {formatVND(
                                                        Number(orderDetailData[index]?.part_price)
                                                    )}{' '}
                                                    VNĐ
                                                </span>
                                            )}
                                        </div>
                                        <span className='text-2xl font-[500] text-red-500'>
                                            {formatVND(Number(item.total_price))} VNĐ
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div> */}
                </div>
            )}
        </Modal>
    );
};

export default AppointmentModalDetail;
