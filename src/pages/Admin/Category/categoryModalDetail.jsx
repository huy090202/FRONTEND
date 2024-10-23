/* eslint-disable react/prop-types */
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCategory } from '~/services/categorryService';

const CategoryModalDetail = ({ isVisible, onCancel, category }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, [category]);

    const updateHandler = async () => {
        try {
            const response = await updateCategory(token, category.id, {
                name,
                description
            });
            if (response.status === true) {
                toast.success(response.message);
                onCancel();
            } else {
                toast.error(response.message || 'Cập nhật danh mục thất bại');
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
            <div className='mb-10 text-4xl font-semibold'>Chi tiết danh mục</div>
            {category && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên danh mục:</label>
                        <Input
                            size='large'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Mô tả:</label>
                        <Input
                            size='large'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default CategoryModalDetail;
