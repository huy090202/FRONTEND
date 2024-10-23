/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const SupervisorModalDetail = ({ isVisible, onCancel, supervisor }) => {
    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết quản trị viên</div>
            {supervisor && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên quản trị viên:</label>
                        <Input size='large' value={supervisor.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Họ quản trị viên:</label>
                        <Input size='large' value={supervisor.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={supervisor.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số điện thoại:</label>
                        <Input size='large' value={supervisor.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giới tính:</label>
                        <Input size='large' value={supervisor.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Địa chỉ:</label>
                        <Input size='large' value={supervisor.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SupervisorModalDetail;
