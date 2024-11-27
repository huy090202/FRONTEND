/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Image, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { allWarehousesPublic } from '~/services/warehouseService';
import { allManufacturersPublic } from '~/services/manufacturerService';
import { allCategoriesPublic } from '~/services/categoryService.js';
import { WrapperSelect } from '~/pages/Appointment/CreateAppointment/style';
import { createPart } from '~/services/partService';

const PartModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [partImage, setPartImage] = useState(null);
    const [partName, setPartName] = useState('');
    const [partPrice, setPartPrice] = useState('');
    const [averageLife, setAverageLife] = useState('');
    const [description, setDescription] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [quantityPart, setQuantityPart] = useState('');
    const [salePart, setSalePart] = useState('');
    const [warehouseId, setWarehouseId] = useState('');

    const [warehouseData, setWarehouseData] = useState([]);
    const [manufacturerData, setManufacturerData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const clearHandler = () => {
        setPartImage(null);
        setPartName('');
        setPartPrice('');
        setAverageLife('');
        setDescription('');
        setQuantityPart('');
        setSalePart('');
        if (manufacturerData.length > 0)
            selectedManufacturer({
                value: manufacturerData[0].id,
                label: manufacturerData[0].name
            });
        if (categoryData.length > 0)
            selectedCategory({ value: categoryData[0].id, label: categoryData[0].name });
        if (warehouseData.length > 0)
            selectedWarehouse({ value: warehouseData[0].id, label: warehouseData[0].name });
    };

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
                    setWarehouseId(response.data[0].id);
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

                if (response.data.length > 0) {
                    setSelectedManufacturer({
                        value: response.data[0].id,
                        label: response.data[0].name
                    });
                    setManufacturerId(response.data[0].id);
                }
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

                if (response.data.length > 0) {
                    setSelectedCategory({
                        value: response.data[0].id,
                        label: response.data[0].name
                    });
                    setCategoryId(response.data[0].id);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        fetchWarehouse();
        fetchManufacturers();
        fetchCategories();
    }, [token]);

    const createHandler = async () => {
        const formData = new FormData();

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('part_image', fileInput.files[0]);
        }

        formData.append('part_name', partName);
        formData.append('part_price', partPrice);
        formData.append('sale', salePart);
        formData.append('average_life', averageLife);
        formData.append('description', description);
        formData.append('manufacturer_id', manufacturerId);
        formData.append('category_id', categoryId);
        formData.append('quantity_part[quantity]', quantityPart);
        formData.append('quantity_part[warehouse_id]', warehouseId);

        const response = await createPart(token, formData);
        if (response.status === true) {
            toast.success(response.message);
            clearHandler();
            onCancel();
            return;
        } else toast.error(response.message);
    };

    const handleUploadFilesImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedPartImage = URL.createObjectURL(file);
            setPartImage(uploadedPartImage);
        }
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
        }
        // if (partImage) {
        //     return <Image src={partImage} alt='Ảnh linh kiện' className='object-cover size-52' />;
        // }
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold text-center'>Thêm 1 linh kiện mới</div>
            <div className='flex flex-col gap-10'>
                <div className='flex items-start justify-between gap-10'>
                    <div
                        className='w-[60%] flex flex-col bg-[#e5eaf3] border-2 p-5 rounded-xl gap-5
                    '
                    >
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Tên linh kiện:</label>
                            <Input
                                size='large'
                                value={partName}
                                onChange={(e) => setPartName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>
                                Tuổi thọ linh kiện (tháng):
                            </label>
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
                    </div>
                    <div className='w-[40%] flex flex-col bg-[#e5eaf3] border-2 p-5 rounded-xl gap-5'>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Giá linh kiện (VNĐ):</label>
                            <Input
                                size='large'
                                value={partPrice}
                                onChange={(e) => setPartPrice(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Giảm giá (%):</label>
                            <Input
                                size='large'
                                value={salePart}
                                onChange={(e) => setSalePart(e.target.value)}
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
                    </div>
                </div>
                <div className='flex items-center justify-between gap-5 bg-[#e5eaf3] border-2 p-5 rounded-xl'>
                    <div className='flex flex-col w-full gap-4'>
                        <label className='text-2xl font-bold'>Chọn danh mục:</label>
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
                    <div className='flex flex-col w-full gap-4'>
                        <label className='text-2xl font-bold'>Chọn nhà kho:</label>
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
                        <label className='text-2xl font-bold'>Chọn nhà sản xuất:</label>
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
                </div>
                <div className='flex flex-col gap-2 bg-[#e5eaf3] border-2 p-5 rounded-xl'>
                    <span className='text-2xl font-bold'>Chọn ảnh (nếu có):</span>
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
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={!partName.length || !partPrice.length || !quantityPart.length}
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

export default PartModalCreate;
