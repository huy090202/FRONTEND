/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const TechnicianModalDetail = ({ isVisible, onCancel, technician }) => {
    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-3xl font-semibold'>Chí tiết kỹ thuật viên</div>
            {technician && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên kỹ thuật viên:</label>
                        <Input size='large' value={technician.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Họ kỹ thuật viên:</label>
                        <Input size='large' value={technician.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={technician.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số điện thoại:</label>
                        <Input size='large' value={technician.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giới tính:</label>
                        <Input size='large' value={technician.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Địa chỉ:</label>
                        <Input size='large' value={technician.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default TechnicianModalDetail;
