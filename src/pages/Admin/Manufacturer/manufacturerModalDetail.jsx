/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { manufacturerActions } from '~/redux/slice/manufacturerSlice';

const ManufacturerModalDetail = ({ isVisible, onCancel, manufacturer }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (manufacturer) {
            setName(manufacturer.name);
            setCountry(manufacturer.country);
        }
    }, [manufacturer]);

    const updateHandler = async () => {
        if (!name) {
            toast.error('Tên nhà sản xuất không được để trống');
            return;
        }

        dispatch(
            manufacturerActions.updateManufacturer({
                token,
                id: manufacturer.id,
                data: { name, country }
            })
        );
        onCancel();
    };
    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết nhà sản xuất</div>
            {manufacturer && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên nhà sản xuất:</label>
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

export default ManufacturerModalDetail;
