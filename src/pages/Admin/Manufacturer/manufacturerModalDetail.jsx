/* eslint-disable react/prop-types */
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateManufacturer } from '~/services/manufacturerService';

const ManufacturerModalDetail = ({ isVisible, onCancel, manufacturer }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (manufacturer) {
            setName(manufacturer.name);
            setCountry(manufacturer.country);
        }
    }, [manufacturer]);

    const updateHandler = async () => {
        try {
            const response = await updateManufacturer(token, manufacturer.id, {
                name,
                country
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
            {manufacturer && (
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
                        <label className='text-2xl font-bold'>Quốc gia:</label>
                        <Input
                            size='large'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className='w-full text-right'>
                        <Button
                            onClick={updateHandler}
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
            )}
        </Modal>
    );
};

export default ManufacturerModalDetail;
