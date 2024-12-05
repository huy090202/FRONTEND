/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { FormatDate } from '~/utils/formatDate.js';
import { formatVND } from '~/utils/formatVND';

const MaintenanceModalDetail = ({ isVisible, onCancel, maintenance }) => {
    // Thông tin bảo dưỡng
    const [maintenanceCode, setMaintenanceCode] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [notesBefore, setNotesBefore] = useState('');
    const [notesAfter, setNotesAfter] = useState('');
    const [wearPercentageBefore, setWearPercentageBefore] = useState('');
    const [wearPercentageAfter, setWearPercentageAfter] = useState('');

    // Thông tin khách hàng
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    // Thông tin kỹ thuật viên phụ trách
    const [technicianName, setTechnicianName] = useState('');
    const [technicianPhone, setTechnicianPhone] = useState('');
    const [technicianEmail, setTechnicianEmail] = useState('');

    const maintenanceData = useMemo(() => maintenance, [maintenance]);
    useEffect(() => {
        if (maintenanceData) {
            setMaintenanceCode(maintenanceData.maintenance_code);
            setMaintenanceDate(maintenanceData.maintenance_date);
            setNotesBefore(maintenanceData.notes_before);
            setNotesAfter(maintenanceData.notes_after);
            setWearPercentageBefore(maintenanceData.wear_percentage_before || 0);
            setWearPercentageAfter(maintenanceData.wear_percentage_after || 0);

            setCustomerName(
                maintenanceData?.appointment?.user.lastName +
                    ' ' +
                    maintenanceData?.appointment?.user.firstName
            );
            setCustomerPhone(maintenanceData?.appointment?.user.phoneNumber);
            setCustomerEmail(maintenanceData?.appointment?.user.email);

            setTechnicianName(
                maintenanceData?.user.lastName + ' ' + maintenanceData?.user.firstName
            );
            setTechnicianPhone(maintenanceData.user.phoneNumber);
            setTechnicianEmail(maintenanceData.user.email);
        }
    }, [maintenanceData]);

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết đơn bảo dưỡng</div>
            {maintenance && (
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <div className='w-[60%] flex flex-col items-start gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Mã đơn bảo dưỡng:</label>
                                    <Input size='large' readOnly value={maintenanceCode} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ngày bảo dưỡng:</label>
                                    <Input
                                        size='large'
                                        readOnly
                                        value={FormatDate(maintenanceDate)}
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Độ hao mòn trước bảo dưỡng:
                                    </label>
                                    <Input size='large' readOnly value={wearPercentageBefore} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Ghi chú trước bảo dưỡng:
                                    </label>
                                    <TextArea
                                        readOnly
                                        rows={4}
                                        value={notesBefore}
                                        onChange={(e) => setNotesBefore(e.target.value)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Độ hao mòn sau bảo dưỡng:
                                    </label>
                                    <Input size='large' readOnly value={wearPercentageAfter} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Ghi chú sau bảo dưỡng:
                                    </label>
                                    <TextArea
                                        readOnly
                                        rows={4}
                                        value={notesAfter}
                                        onChange={(e) => setNotesAfter(e.target.value)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên khách hàng:</label>
                                    <Input size='large' readOnly value={customerName} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Email khách hàng:</label>
                                    <Input size='large' readOnly value={customerEmail} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Số điện thoại khách hàng:
                                    </label>
                                    <Input size='large' readOnly value={customerPhone} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên kỹ thuật viên:</label>
                                    <Input size='large' readOnly value={technicianName} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Email kỹ thuật viên:
                                    </label>
                                    <Input size='large' readOnly value={technicianEmail} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Số điện thoại kỹ thuật viên:
                                    </label>
                                    <Input size='large' readOnly value={technicianPhone} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className='text-3xl font-bold'>Phụ tùng thay thế</h3>
                    <div className=''>
                        {maintenanceData?.maintenanceDetails &&
                            maintenanceData?.maintenanceDetails.map((item, index) => (
                                <div
                                    className='flex items-center justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                                    key={index}
                                >
                                    <div className='flex items-center gap-5'>
                                        <img
                                            loading='lazy'
                                            src={
                                                item?.part.part_image
                                                    ? `/minio${item?.part.part_image}`
                                                    : 'https://placehold.co/256'
                                            }
                                            alt='#Ảnh linh kiện'
                                            className='rounded-2xl size-64'
                                        />
                                        <div className='flex gap-2'>
                                            <span>{item?.part.part_name}</span>
                                            <span className='font-bold'>x{item?.quantity}</span>
                                        </div>
                                    </div>
                                    <span>{formatVND(Number(item?.price)) + ' ' + 'VNĐ'}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default MaintenanceModalDetail;
