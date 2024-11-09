/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DatePicker, Image, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    createMotorImage,
    deleteMotorImage,
    getAllImages,
    updateMotor
} from '~/services/motorService';
import MotorModalEditImage from './motorModalEditImage';
const { Option } = Select;
// import AppointmentEditImage from './appointmentEditImage';

const MotorModalDetail = ({ isVisible, onCancel, motor }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [motorName, setMotorName] = useState('');
    const [motorType, setMotorType] = useState('');
    const [motorPlate, setMotorPlate] = useState('');
    const [motorEngine, setMotorEngine] = useState('');
    const [motorChassis, setMotorChassis] = useState('');
    const [motorModel, setMotorModel] = useState('');
    const [motorColor, setMotorColor] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const [images, setimages] = useState([]);
    const [hoveredImageId, setHoveredImageId] = useState(null);
    const [isEditImageModalVisible, setIsEditImageModalVisible] = useState(false);
    const [selectedImageForEdit, setSelectedImageForEdit] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            if (!token) {
                return;
            }

            try {
                const response = await getAllImages(token, { motorId: motor.id });
                const images = response.data;
                setimages(images);
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchImages();
    }, [token, motor]);

    useEffect(() => {
        if (!motor) {
            return;
        }

        setMotorName(motor.motor_name);
        setMotorType(motor.motor_type);
        setMotorPlate(motor.license_plate);
        setMotorEngine(motor.engine_number);
        setMotorChassis(motor.chassis_number);
        setMotorModel(motor.motor_model);
        setMotorColor(motor.motor_color);
        setCreatedAt(dayjs(motor.created_at));
    }, [motor]);

    const handleSaveChanges = async () => {
        try {
            const motorData = {
                motorId: motor.id,
                motor_name: motorName,
                motor_type: motorType,
                license_plate: motorPlate,
                engine_number: motorEngine,
                chassis_number: motorChassis,
                motor_model: motorModel,
                motor_color: motorColor,
                created_at: createdAt
            };

            await updateMotor(token, motorData);

            toast.success('Cập nhật thông tin xe thành công!');
            onCancel();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại!');
            } else {
                toast.error('Lỗi mạng, vui lòng kiểm tra kết nối!');
            }
        }
    };

    const handleUploadFilesImage = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('image_url', file);
                formData.append('motor_id', motor.id);

                const response = await createMotorImage(token, formData);
                const newImage = response.data;

                setimages((prevImages) => [...prevImages, newImage]);

                toast.success('Ảnh đã được tải lên thành công!');
            } catch (error) {
                toast.error('Tải lên ảnh thất bại!');
            }
        }
    };

    const handleEditImage = (image) => {
        setSelectedImageForEdit(image);
        setIsEditImageModalVisible(true);
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await deleteMotorImage(token, imageId);
            setimages((prevImages) => prevImages.filter((image) => image.id !== imageId));
            toast.success('Xóa ảnh thành công!');
        } catch (error) {
            toast.error('Xóa ảnh thất bại!');
        }
    };

    const handleReviewImage = () => {
        return images.map((image, index) => (
            <div
                key={index}
                onMouseEnter={() => setHoveredImageId(image.id)}
                onMouseLeave={() => setHoveredImageId(null)}
                className='relative'
            >
                <Image
                    src={image.image_url ? `/minio${image.image_url}` : image.preview}
                    alt={`image-preview-${index}`}
                    className='object-cover size-72'
                />
                {hoveredImageId === image.id && (
                    <div className='absolute flex gap-3 text-3xl bottom-5 right-1/3'>
                        <EditOutlined
                            onClick={() => handleEditImage(image)}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        />
                        <DeleteOutlined
                            onClick={() => handleDeleteImage(image.id)}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                )}
            </div>
        ));
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{
                fontFamily: 'LXGW WenKai TC',
                cursive: 'LXGW Wen'
            }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết xe</div>
            {motor && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên xe:</label>
                        <Input size='large' value={motorName} />
                    </div>

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Biển số xe:</label>
                        <Input size='large' value={motorPlate} />
                    </div>

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số khung xe:</label>
                        <Input size='large' value={motorChassis} />
                    </div>

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số máy xe:</label>
                        <Input size='large' value={motorEngine} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl'>Chọn ảnh (nếu có):</span>
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

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Loại xe:</label>
                        <Select
                            size='large'
                            value={motorType}
                            onChange={(value) => setMotorType(value)}
                            className='flex-2 w-[100%]'
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
                        <Input size='large' value={motorModel} />
                    </div>

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Màu xe:</label>
                        <Input size='large' value={motorColor} />
                    </div>

                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Ngày đăng ký xe:</label>
                        <DatePicker value={createdAt} onChange={(date) => setCreatedAt(date)} />
                    </div>

                    <div className='flex justify-end w-full'>
                        <button
                            className='px-6 py-3 mr-2 text-xl text-white bg-black rounded-2xl'
                            onClick={handleSaveChanges}
                        >
                            Lưu những thay đổi
                        </button>
                    </div>
                </div>
            )}
            <MotorModalEditImage
                isEditImageModalVisible={isEditImageModalVisible}
                imageForEdit={selectedImageForEdit}
                onCancel={() => setIsEditImageModalVisible(false)}
                token={token}
            />
        </Modal>
    );
};

export default MotorModalDetail;
