/* eslint-disable react/prop-types */
import { Image, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { WrapperSelect } from '~/pages/Appointment/CreateAppointment/style';
import { allCategoriesPublic } from '~/services/categorryService';
import { allManufacturersPublic } from '~/services/manufacturerService';
import { updatePart } from '~/services/partService';
import { allWarehousesPublic } from '~/services/warehouseService';

const PartModalDetail = ({ isVisible, onCancel, part }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [partImage, setPartImage] = useState(null);
    const [partName, setPartName] = useState('');
    const [partPrice, setPartPrice] = useState('');
    const [averageLife, setAverageLife] = useState('');
    const [description, setDescription] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [quantityPart, setQuantityPart] = useState('');
    const [warehouseId, setWarehouseId] = useState('');

    const [warehouseData, setWarehouseData] = useState([]);
    const [manufacturerData, setManufacturerData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const partData = useMemo(() => part, [part]);

    useEffect(() => {
        if (partData) {
            setPartImage(partData.part_image);
            setPartName(partData.part_name);
            setPartPrice(partData.part_price);
            setAverageLife(partData.average_life);
            setDescription(partData.description);
            setManufacturerId(partData.manufacturer_id);
            setCategoryId(partData.category_id);

            if (partData.stocks && partData.stocks.length > 0) {
                setQuantityPart(partData.stocks[0].quantity);
                const defaultWarehouseId = partData.stocks[0].warehouse_id;
                setWarehouseId(defaultWarehouseId);

                const defaultWarehouse = warehouseData.find(
                    (warehouse) => warehouse.id === defaultWarehouseId
                );
                if (defaultWarehouse) {
                    setSelectedWarehouse({
                        value: defaultWarehouse.id,
                        label: defaultWarehouse.name
                    });
                }
            }

            const defaultManufacturer = manufacturerData.find(
                (manufacturer) => manufacturer.id === partData.manufacturer_id
            );
            if (defaultManufacturer) {
                setSelectedManufacturer({
                    value: defaultManufacturer.id,
                    label: defaultManufacturer.name
                });
            }

            const defaultCategory = categoryData.find(
                (category) => category.id === partData.category_id
            );
            if (defaultCategory) {
                setSelectedCategory({
                    value: defaultCategory.id,
                    label: defaultCategory.name
                });
            }
        }
    }, [partData, warehouseData, manufacturerData, categoryData]);

    useEffect(() => {
        const fetchWarehouse = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await allWarehousesPublic(token);
                setWarehouseData(response.data);

                if (response.data.length > 0) {
                    setSelectedWarehouse({
                        value: response.data[0].id,
                        label: response.data[0].name
                    });
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        const fetchManufacturers = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await allManufacturersPublic(token);
                setManufacturerData(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        const fetchCategories = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await allCategoriesPublic(token);
                setCategoryData(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        fetchWarehouse();
        fetchManufacturers();
        fetchCategories();
    }, [token]);

    const updateHandler = async () => {
        const formData = new FormData();

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('part_image', fileInput.files[0]);
        }

        formData.append('part_name', partName);
        formData.append('part_price', partPrice);
        formData.append('average_life', averageLife);
        formData.append('description', description);
        formData.append('manufacturer_id', manufacturerId);
        formData.append('category_id', categoryId);
        formData.append('quantity_part[quantity]', quantityPart);
        formData.append('quantity_part[warehouse_id]', warehouseId);

        const response = await updatePart(token, partData.id, formData);
        if (response.status === true) toast.success(response.message);
        else toast.error(response.message);
    };

    const handleReviewImage = () => {
        if (partImage) {
            return (
                <Image
                    src={partImage.includes('blob') ? partImage : `/minio${partImage}`}
                    alt='Ảnh linh kiện'
                    className='object-cover size-52'
                />
            );
        } else {
            return (
                <div>
                    <Image
                        src='https://placehold.co/200'
                        alt='Ảnh linh kiện'
                        className='object-cover size-52'
                    />
                </div>
            );
        }
    };

    const handleUploadFilesImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedPartImage = URL.createObjectURL(file);
            setPartImage(uploadedPartImage);
        }
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết linh kiện</div>
            {part && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên linh kiện:</label>
                        <Input
                            size='large'
                            value={partName}
                            onChange={(e) => setPartName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giá linh kiện:</label>
                        <Input
                            size='large'
                            value={partPrice}
                            onChange={(e) => setPartPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tuổi thọ linh kiện:</label>
                        <Input
                            size='large'
                            value={averageLife}
                            onChange={(e) => setAverageLife(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Mô tả:</label>
                        <TextArea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số lượng:</label>
                        <Input
                            size='large'
                            value={quantityPart}
                            onChange={(e) => setQuantityPart(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <label className='text-2xl'>Chọn nhà kho:</label>
                        <WrapperSelect
                            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                            labelInValue
                            value={selectedWarehouse}
                            onChange={(e) => {
                                setSelectedWarehouse(e);
                                setWarehouseId(e.value);
                            }}
                            options={warehouseData.map((warehouse) => ({
                                value: warehouse.id,
                                label: warehouse.name
                            }))}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <label className='text-2xl'>Chọn nhà sản xuất:</label>
                        <WrapperSelect
                            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                            labelInValue
                            value={selectedManufacturer}
                            onChange={(e) => {
                                setSelectedManufacturer(e);
                                setManufacturerId(e.value);
                            }}
                            options={manufacturerData.map((manufacturer) => ({
                                value: manufacturer.id,
                                label: manufacturer.name
                            }))}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <label className='text-2xl'>Chọn danh mục:</label>
                        <WrapperSelect
                            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                            labelInValue
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e);
                                setCategoryId(e.value);
                            }}
                            options={categoryData.map((category) => ({
                                value: category.id,
                                label: category.name
                            }))}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl'>Chọn ảnh (nếu có):</span>
                        <div className='flex'>
                            <label htmlFor='file' className='text-5xl cursor-pointer'>
                                <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-60'>
                                    <PlusOutlined />
                                </div>
                            </label>
                            <div className='flex items-center justify-center w-full gap-5'>
                                {handleReviewImage()}
                            </div>
                            <input
                                id='file'
                                type='file'
                                accept='image/*'
                                onChange={handleUploadFilesImage}
                                hidden
                            />
                        </div>
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

export default PartModalDetail;
