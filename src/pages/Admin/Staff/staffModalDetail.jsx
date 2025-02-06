/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const StaffModalDetail = ({ isVisible, onCancel, staff }) => {
    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết nhân viên</div>
            {staff && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên nhân viên:</label>
                        <Input size='large' value={staff.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Họ nhân viên:</label>
                        <Input size='large' value={staff.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={staff.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số điện thoại:</label>
                        <Input size='large' value={staff.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giới tính:</label>
                        <Input size='large' value={staff.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Địa chỉ:</label>
                        <Input size='large' value={staff.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default StaffModalDetail;
