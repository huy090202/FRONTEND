/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { warehouseActions } from '~/redux/slice/warehouseSlice';

const WarehouseModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();

    const createHandler = async () => {
        try {
            if (!name) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            dispatch(warehouseActions.createWarehouse({ token, data: { name, address } }));
            setName('');
            setAddress('');
            onCancel();
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Tạo nhà kho mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên nhà kho:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào tên nhà kho'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Địa chỉ:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào địa chỉ'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={!name.length || !address.length}
                        type='light'
                        className='h-16 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                        style={{
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default WarehouseModalCreate;
