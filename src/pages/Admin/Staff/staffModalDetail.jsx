/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const StaffModalDetail = ({ isVisible, onCancel, staff }) => {
    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            className='p-10'
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
            <div className='mb-10 text-3xl font-semibold'>Staff Details</div>
            {staff && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>First name:</label>
                        <Input size='large' value={staff.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Last name:</label>
                        <Input size='large' value={staff.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={staff.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Phone number:</label>
                        <Input size='large' value={staff.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Gender:</label>
                        <Input size='large' value={staff.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Address:</label>
                        <Input size='large' value={staff.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default StaffModalDetail;
