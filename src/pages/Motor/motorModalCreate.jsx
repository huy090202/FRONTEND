/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, DatePicker, Image, Input, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createMotor, createMotorImage } from '~/services/motorService';

const { Option } = Select;

const MotorModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [motorName, setmotorName] = useState('');
    const [motorType, setmotorType] = useState('Xe số');
    const [motorPlate, setmotorPlate] = useState('');
    const [motorEngine, setmotorEngine] = useState('');
    const [motorChassis, setmotorChassis] = useState('');
    const [motorModel, setmotorModel] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [motorColor, setmotorColor] = useState('');

    const [images, setimages] = useState([]);

    const clearHandler = () => {
        setmotorName('');
        setmotorType('');
        setmotorPlate('');
        setmotorEngine('');
        setmotorChassis('');
        setmotorModel('');
        setCreatedAt('');
        setmotorColor('');
        setimages([]);
    };

    const createHandler = async () => {
        try {
            if (
                !motorName ||
                !motorType ||
                !motorPlate ||
                !motorEngine ||
                !motorChassis ||
                !motorModel ||
                !createdAt ||
                !motorColor
            ) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const response = await createMotor(token, {
                motorName,
                motorType,
                motorPlate,
                motorEngine,
                motorChassis,
                motorModel,
                createdAt,
                motorColor
            });

            if (response.status === true) {
                toast.success(response.message);

                const motorId = response.data.id;
                if (images.length > 0) {
                    const formData = new FormData();
                    formData.append('motor_id', motorId);

                    images.forEach((image) => {
                        formData.append('image_url', image.file);
                    });

                    // Tạo ảnh xe
                    const responseImage = await createMotorImage(token, formData);
                    if (responseImage.status === false) toast.error(responseImage.message);
                }
                clearHandler();
                onCancel();
            } else {
                toast.error(response.message || 'Tạo một xe mới thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    const handleUploadFilesImage = (e) => {
        const files = Array.from(e.target.files);
        const imagesPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setimages(imagesPreview);
    };

    const handleReviewImage = () => {
        return images.map((image, index) => (
            <div key={index}>
                <Image src={image.preview} alt={`image-preview-${index}`} className='size-52' />
            </div>
        ));
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Tạo xe mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào tên xe'
                        value={motorName}
                        onChange={(e) => setmotorName(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Biển số xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào biển số xe'
                        value={motorPlate}
                        onChange={(e) => setmotorPlate(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Số khung xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào số khung xe'
                        value={motorChassis}
                        onChange={(e) => setmotorChassis(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Số máy xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào số máy xe'
                        value={motorEngine}
                        onChange={(e) => setmotorEngine(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold text-left'>Loại xe:</label>
                    <Select
                        size='large'
                        value={motorType}
                        onChange={(value) => setmotorType(value)}
                        className='flex-2 w-[100%]'
                        style={{
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    >
                        <Option value='Xe số'>Xe số</Option>
                        <Option value='Xe ga'>Xe tay ga</Option>
                        <Option value='Xe côn'>Xe tay côn</Option>
                        <Option value='Xe phân khối lớn'>Xe phân khối lớn</Option>
                        <Option value='Xe khác'>Xe khác</Option>
                    </Select>
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Model xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào model xe'
                        value={motorModel}
                        onChange={(e) => setmotorModel(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Màu xe:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào màu xe'
                        value={motorColor}
                        onChange={(e) => setmotorColor(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Ngày đăng ký xe:</label>
                    <DatePicker value={createdAt} onChange={(date) => setCreatedAt(date)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-2xl font-bold'>Chọn ảnh (nếu có):</span>
                    <div className='flex'>
                        <label htmlFor='file' className='text-5xl cursor-pointer'>
                            <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-52'>
                                <PlusOutlined />
                            </div>
                        </label>
                        <div className='flex items-center justify-center w-full gap-5'>
                            {handleReviewImage()}
                        </div>
                        <input
                            id='file'
                            type='file'
                            multiple
                            accept='image/*'
                            onChange={handleUploadFilesImage}
                            hidden
                        />
                    </div>
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
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

export default MotorModalCreate;
