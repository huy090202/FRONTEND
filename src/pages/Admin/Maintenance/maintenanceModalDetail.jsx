/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { FormatDate } from '~/utils/formatDate.js';

const MaintenanceModalDetail = ({ isVisible, onCancel, maintenance }) => {
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [notesBefore, setNotesBefore] = useState('');
    const [notesAfter, setNotesAfter] = useState('');
    const [wearPercentageBefore, setWearPercentageBefore] = useState('');
    const [wearPercentageAfter, setWearPercentageAfter] = useState('');
    const [techId, setTechId] = useState('');
    const [motorId, setMotorId] = useState('');

    const maintenanceData = useMemo(() => maintenance, [maintenance]);
    useEffect(() => {
        if (maintenanceData) {
            setMaintenanceDate(maintenanceData.maintenance_date);
            setNotesBefore(maintenanceData.notes_before);
            setNotesAfter(maintenanceData.notes_after);
            setWearPercentageBefore(maintenanceData.wear_percentage_before);
            setWearPercentageAfter(maintenanceData.wear_percentage_after);
            setTechId(maintenanceData.user_id);
            setMotorId(maintenanceData.motor_id);
        }
    }, [maintenanceData]);

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết tài khoản</div>
            {maintenance && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Ngày bảo dưỡng:</label>
                        <Input size='large' value={FormatDate(maintenanceDate)} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Ghi chú trước bảo dưỡng:</label>
                        <TextArea
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
                        <label className='text-2xl font-bold'>Ghi chú sau bảo dưỡng:</label>
                        <TextArea
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
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Độ hao mòn trước bảo dưỡng:</label>
                        <Input size='large' value={wearPercentageBefore} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Độ hao mòn sau bảo dưỡng:</label>
                        <Input size='large' value={wearPercentageAfter} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Kỹ thuật viên phụ trách:</label>
                        <Input size='large' value={techId} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Xe:</label>
                        <Input size='large' value={motorId} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default MaintenanceModalDetail;
