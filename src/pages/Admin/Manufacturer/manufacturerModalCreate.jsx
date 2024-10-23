/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createManufacturer } from '~/services/manufacturerService';

const ManufacturerModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const clearHandler = () => {
        setName('');
        setCountry('');
    };

    const createHandler = async () => {
        try {
            if (!name) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const response = await createManufacturer(token, {
                name,
                country
            });

            if (response.status === true) {
                toast.success(response.message);
                clearHandler();
                onCancel();
            } else {
                toast.error(response.message || 'Tạo nhà kho thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
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
                    <label className='text-2xl font-bold'>Quốc gia:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào quốc gia'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={!name.length || !country.length}
                        type='primary'
                        className='h-16 text-2xl text-right'
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

export default ManufacturerModalCreate;
