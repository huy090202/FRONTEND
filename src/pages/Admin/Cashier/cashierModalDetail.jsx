/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const CashierModalDetail = ({ isVisible, onCancel, cashier }) => {
    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            className='p-10'
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
            <div className='mb-10 text-3xl font-semibold'>Cashier Details</div>
            {cashier && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>First name:</label>
                        <Input size='large' value={cashier.firstName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Last name:</label>
                        <Input size='large' value={cashier.lastName} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={cashier.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Phone number:</label>
                        <Input size='large' value={cashier.phoneNumber} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Gender:</label>
                        <Input size='large' value={cashier.gender} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Address:</label>
                        <Input size='large' value={cashier.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CashierModalDetail;
