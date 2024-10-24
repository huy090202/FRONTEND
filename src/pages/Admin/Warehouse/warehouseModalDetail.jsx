/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateWarehouse } from '~/services/warehouseService';

const WarehouseModalDetail = ({ isVisible, onCancel, warehouse }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (warehouse) {
            setName(warehouse.name);
            setAddress(warehouse.address);
        }
    }, [warehouse]);

    const updateHandler = async () => {
        try {
            const response = await updateWarehouse(token, warehouse.id, {
                name,
                address
            });
            if (response.status === true) {
                toast.success(response.message);
                onCancel();
            } else {
                toast.error(response.message || 'Cập nhật nhà kho thất bại');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }
    };
    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết nhà kho</div>
            {warehouse && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên nhà kho:</label>
                        <Input
                            size='large'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Địa chỉ:</label>
                        <Input
                            size='large'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end w-full'>
                        <button
                            className='px-6 py-3 mr-2 text-xl text-white bg-black rounded-2xl'
                            onClick={updateHandler}
                        >
                            Lưu những thay đổi
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default WarehouseModalDetail;
