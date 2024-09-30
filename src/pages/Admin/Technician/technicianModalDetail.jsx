/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const TechnicianModalDetail = ({ isVisible, onCancel, technician }) => {
    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            className='p-10'
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
            <div className='mb-10 text-3xl font-semibold'>Technician Details</div>
            {technician && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>First name:</label>
                        <Input size='large' value={technician.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Last name:</label>
                        <Input size='large' value={technician.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={technician.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Phone number:</label>
                        <Input size='large' value={technician.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Gender:</label>
                        <Input size='large' value={technician.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Address:</label>
                        <Input size='large' value={technician.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default TechnicianModalDetail;
