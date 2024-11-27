/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '~/components/shared/Loading/loading';
import { partActions } from '~/redux/slice/partSlice';
import { WrapperSelect } from '~/pages/Appointment/CreateAppointment/style';
import { formatVND } from '~/utils/formatVND';

const SectionMain = ({ onCancel, maintenance, appoint, motor, user }) => {
    const { parts, loading } = useSelector((state) => state.part);

    const [selectedPart, setSelectedPart] = useState(null);

    const [quantity, setQuantity] = useState(1); // Số lượng của 1 phụ tùng được chọn
    const [price, setPrice] = useState(0); // Giá của 1 phụ tùng được chọn
    const [partId, setPartId] = useState(''); // ID của phụ tùng được chọn
    const [partforms, setPartForms] = useState([]); // Danh sách các form chọn phụ tùng

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMaintenanceHistory = (maintenanceId) => {
        navigate(`/maintenance-history/${maintenanceId}`);
    };

    useEffect(() => {
        dispatch(partActions.fetchParts());
    }, []);

    useEffect(() => {
        if (parts && parts.length > 0) {
            setSelectedPart({ value: parts[0].id, label: parts[0].part_name });
        }
    }, [parts]);

    const addPartForm = () => {
        setPartForms([
            ...partforms,
            {
                partId: parts.length > 0 ? parts[0].id : '',
                quantity: 1,
                price:
                    parts.length > 0
                        ? parts[0].part_price - (parts[0].part_price * parts[0].sale) / 100
                        : ''
            }
        ]);
    };

    const handlePartFormChange = (index, key, value) => {
        const updatedForms = [...partforms];
        updatedForms[index][key] = value;

        if (key === 'partId') {
            const selectedPart = parts.find((part) => part.id === value);
            if (selectedPart) {
                updatedForms[index].price =
                    selectedPart.part_price - (selectedPart.part_price * selectedPart.sale) / 100;
            }
        }

        setPartForms(updatedForms);
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedForms = [...partforms];
        if (newQuantity >= 0) {
            // Đảm bảo số lượng không âm
            updatedForms[index].quantity = newQuantity;
        }
        setPartForms(updatedForms);
    };

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='bg-[#e5eaf3] w-full p-10 rounded-lg'>
                <div className='flex flex-col gap-5'>
                    {/* Xem lịch sử */}
                    <div className='flex items-center gap-10'>
                        <span className='text-2xl font-bold'>Lịch sử bảo dưỡng tại cửa hàng: </span>
                        <Button
                            onClick={() => {
                                handleMaintenanceHistory(maintenance.id);
                            }}
                            type='light'
                            className='h-12 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            Xem tại đây
                        </Button>
                    </div>

                    {/* Trước bảo dưỡng */}
                    <div className='flex items-center gap-10'>
                        <span className='text-2xl font-bold'>
                            Đánh giá độ hao mòn trước khi bảo dưỡng:
                        </span>
                        <InputNumber
                            defaultValue={50}
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '')}
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl font-bold'>Ghi chú trước khi bảo dưỡng: </span>
                        <TextArea
                            rows={4}
                            style={{
                                backgroundColor: 'transparent',
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        />
                    </div>

                    {/* Chọn phụ tùng thay thế */}
                    <div className='flex flex-col gap-5'>
                        {/* Ấn vào button để hiển thị ra form chọn phụ tùng */}
                        <div className='flex items-center justify-between'>
                            <span className='text-2xl font-bold'>Chọn phụ tùng thay thế: </span>
                            <Button
                                onClick={addPartForm}
                                type='light'
                                className='h-12 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                                style={{
                                    fontFamily: 'LXGW WenKai TC',
                                    cursive: 'LXGW Wen'
                                }}
                            >
                                Chọn
                            </Button>
                        </div>

                        {/* Form chọn phụ tùng */}
                        {partforms.map((partform, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between p-5 rounded-lg'
                                style={{ border: '1px solid #d1d5db' }}
                            >
                                {/* Tên phụ tùng */}
                                <div className='flex flex-col gap-3'>
                                    <span className='text-2xl font-bold'>Tên phụ tùng</span>
                                    <WrapperSelect
                                        style={{
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        labelInValue
                                        value={partform.partId || parts[0].id}
                                        onChange={(e) =>
                                            handlePartFormChange(index, 'partId', e.value)
                                        }
                                        options={
                                            parts &&
                                            parts.map((part) => ({
                                                value: part.id,
                                                label: part.part_name
                                            }))
                                        }
                                    />
                                </div>

                                {/* Giá */}
                                <div className='flex flex-col gap-3'>
                                    <span className='text-2xl font-bold'>Giá</span>
                                    <Input
                                        readOnly
                                        value={formatVND(Number(partform.price)) + ' ' + 'VNĐ'}
                                        style={{
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>

                                {/* Số lượng */}
                                <div className='flex flex-col gap-3'>
                                    <span className='text-2xl font-bold'>Số lượng</span>
                                    <div className='flex select-none'>
                                        <div
                                            className='cursor-pointer w-[30px] h-[30px] text-xl flex items-center justify-center border border-solid border-gray-300 transition-all ease-out'
                                            onClick={() =>
                                                handleQuantityChange(index, partform.quantity - 1)
                                            }
                                        >
                                            <MinusOutlined />
                                        </div>
                                        <div className='w-[30px] h-[30px] text-2xl border-t border-b border-solid border-gray-300'>
                                            <input
                                                min={0}
                                                value={partform.quantity}
                                                readOnly
                                                className='w-full h-full text-center bg-transparent outline-none'
                                            />
                                        </div>
                                        <div
                                            className='cursor-pointer w-[30px] h-[30px] text-xl flex items-center justify-center border border-solid border-gray-300 transition-all ease-out'
                                            onClick={() =>
                                                handleQuantityChange(index, partform.quantity + 1)
                                            }
                                        >
                                            <PlusOutlined />
                                        </div>
                                    </div>
                                </div>

                                {/* Độ hao mòn */}
                                <div className='flex flex-col gap-3'>
                                    <span className='text-2xl font-bold'>Độ hao mòn</span>
                                    <InputNumber
                                        defaultValue={0}
                                        min={0}
                                        max={100}
                                        formatter={(value) => `${value}%`}
                                        parser={(value) => value?.replace('%', '')}
                                        style={{
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>

                                {/* Hành động */}
                                <div className='flex flex-col gap-12'>
                                    <span></span>
                                    <div className=''>
                                        <DeleteOutlined
                                            className='text-3xl text-red-500'
                                            onClick={() =>
                                                setPartForms(
                                                    partforms.filter((_, i) => i !== index)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sau bảo dưỡng */}
                    <div className='flex items-center gap-10'>
                        <span className='text-2xl font-bold'>
                            Đánh giá độ hao mòn sau khi bảo dưỡng:
                        </span>
                        <InputNumber
                            defaultValue={0}
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '')}
                            style={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl font-bold'>Ghi chú sau khi bảo dưỡng: </span>
                        <TextArea
                            rows={4}
                            style={{
                                backgroundColor: 'transparent',
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        />
                    </div>

                    {/* Lựa chọn */}
                    <div className='flex items-center justify-end w-full gap-5'>
                        <Button
                            type='light'
                            className='h-16 text-2xl text-right bg-[#bf1717] hover:bg-[#e84444] text-white'
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type='light'
                            className='h-16 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            Hoàn thành
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SectionMain;
