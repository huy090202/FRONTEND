/* eslint-disable react/prop-types */
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '~/components/shared/Loading/loading';
import { partActions } from '~/redux/slice/partSlice';
import { WrapperSelect } from '~/pages/Appointment/CreateAppointment/style';
import { formatVND } from '~/utils/formatVND';
import { toast } from 'react-toastify';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import { createMaintenanceDetail, deleteMaintenanceDetail } from '~/services/maintenanceService';

// eslint-disable-next-line no-unused-vars
const SectionMain = ({ onCancel, maintenance, appoint, motor, user }) => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { parts, loading } = useSelector((state) => state.part);

    // Thông tin bảo dưỡng
    const [notesBefore, setNotesBefore] = useState('');
    const [notesAfter, setNotesAfter] = useState('');
    const [wearBefore, setWearBefore] = useState(0);
    const [wearAfter, setWearAfter] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [selectedPart, setSelectedPart] = useState(null);

    // Chi tiết bảo dưỡng
    const [wearPercentage, setWearPercentage] = useState(0);
    const [partforms, setPartForms] = useState([]); // Danh sách các form chọn phụ tùng

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const maintenanceData = useMemo(() => maintenance, [maintenance]);

    useEffect(() => {
        if (maintenanceData) {
            setNotesBefore(maintenanceData.notes_before);
            setNotesAfter(maintenanceData.notes_after);
            setWearBefore(maintenanceData.wear_percentage_before || 0);
            setWearAfter(maintenanceData.wear_percentage_after || 0);
            setPartForms(maintenanceData.maintenanceDetails);
        }
    }, [maintenanceData]);

    const handleMaintenanceHistory = (userId) => {
        navigate(`/maintenance-history/${userId}`);
    };

    useEffect(() => {
        dispatch(partActions.fetchParts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                part_name: parts.length > 0 ? parts[0].part_name : '',
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
                updatedForms[index].part_name = selectedPart.part_name;
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

    /**
     * TODO: Xử lý hoàn thành bảo dưỡng
     * 1. Đánh giá hao mòn, ghi chú trước bảo dưỡng
     * 2. Chọn phụ tùng thay thế
     * 3. Đánh giá hao mòn, ghi chú sau bảo dưỡng
     * 4. Gửi thông tin lên server để xử lý (gửi thông tin đánh giá, ghi chú trước sau bảo dưỡng để có thể cập nhật thông tin đơn bảo dưỡng)
     * 5. Dựa vào id của đơn bảo dưỡng, chọn phụ tùng, số lượng, giá, độ hao mòn của phụ tùng để tạo ra thông tin chi tiết bảo dưỡng
     *    - 1 chi tiết bảo dưỡng tưỡng ứng với 1 phụ tùng được chọn, lưu vào mảng partforms
     *    - Giá của 1 chi tiết sẽ bằng giá của phụ tùng * số lượng
     *    - Độ hao mòn của 1 chi tiết phụ tùng sẽ là 100% (vì là phụ tùng mới)
     *    - Trường hợp khách hàng chọn phụ tùng cũ, độ hao mòn sẽ được cập nhật sau khi bảo dưỡng (đây là tính năng mở rộng)
     * */

    const handleComplete = async () => {
        try {
            const data = {
                wear_percentage_before: wearBefore,
                wear_percentage_after: wearAfter,
                notes_before: notesBefore,
                notes_after: notesAfter
            };
            dispatch(
                maintenanceActions.updateMaintenanceByTech({
                    token,
                    id: maintenance.id,
                    data
                })
            );

            if (partforms.length > 0) {
                const newDetail = partforms.filter((partform) => !partform.id);
                await Promise.all(
                    newDetail.map(async (partform) => {
                        const partData = {
                            part_id: partform.partId,
                            quantity: partform.quantity,
                            price: partform.price * partform.quantity,
                            wear_percentage: wearPercentage,
                            maintenance_id: maintenance.id
                        };
                        const createDetailMain = await createMaintenanceDetail(token, {
                            data: partData
                        });
                        if (createDetailMain.status === false) {
                            toast.error(
                                'Lỗi trong quá trình thêm chi tiết bảo dưỡng! ',
                                createDetailMain.message
                            );
                        }
                    })
                );
            }

            await dispatch(
                maintenanceActions.updateMaintenanceStatusByTech({
                    token,
                    id: maintenance.id,
                    active: 'Hoàn thành bảo dưỡng'
                })
            );

            await handlePaymentInvoice();

            onCancel();
        } catch (error) {
            toast.error('Lỗi trong quá trình bảo dưỡng! ', error.message);
        }
    };

    const handlePaymentInvoice = () => {
        navigate(`/maintenance-invoice/${maintenance.id}`);
    };

    const handlePrintInvoice = () => {
        navigate(`/maintenance-print-invoice/${maintenance.id}`);
    };

    const handleDeletePartForm = async (index, id) => {
        try {
            if (!token) return;
            if (id) {
                const deleteDetail = await deleteMaintenanceDetail(token, id);
                if (deleteDetail.status === true) {
                    setPartForms(partforms.filter((_, i) => i !== index));
                } else {
                    toast.error(
                        'Lỗi trong quá trình xóa chi tiết bảo dưỡng! ',
                        deleteDetail.message
                    );
                }
            } else {
                setPartForms(partforms.filter((_, i) => i !== index));
            }
        } catch (error) {
            toast.error('Lỗi trong quá trình xóa chi tiết bảo dưỡng! ', error.message);
        }
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
                                handleMaintenanceHistory(user.id);
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
                            defaultValue={wearBefore}
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '')}
                            style={{
                                backgroundColor: 'transparent'
                            }}
                            value={wearBefore}
                            onChange={(value) => setWearBefore(value)}
                            disabled={
                                maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ||
                                maintenance.status.trim() === 'Đã hủy'
                            }
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
                            value={notesBefore}
                            onChange={(e) => setNotesBefore(e.target.value)}
                            disabled={
                                maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ||
                                maintenance.status.trim() === 'Đã hủy'
                            }
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
                                disabled={
                                    maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ||
                                    maintenance.status.trim() === 'Đã hủy'
                                }
                            >
                                Chọn
                            </Button>
                        </div>

                        {/* Form chọn phụ tùng */}
                        {parts &&
                            parts.length > 0 &&
                            partforms &&
                            partforms.length > 0 &&
                            partforms.map((partform, index) => (
                                <div
                                    key={index}
                                    className='flex flex-wrap gap-5 p-5 border border-gray-300 rounded-lg'
                                >
                                    {/* Tên phụ tùng */}
                                    <div className='flex flex-col w-full gap-3 md:w-auto'>
                                        <span className='text-2xl font-bold'>Tên phụ tùng</span>
                                        <WrapperSelect
                                            style={{
                                                fontFamily: 'LXGW WenKai TC',
                                                cursive: 'LXGW Wen'
                                            }}
                                            labelInValue
                                            value={{
                                                value: partform.partId || parts[0].id,
                                                label:
                                                    partform.part?.part_name ||
                                                    partform.part_name ||
                                                    parts[0].part_name
                                            }}
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
                                            disabled={
                                                maintenance.status.trim() ===
                                                    'Hoàn thành bảo dưỡng' ||
                                                maintenance.status.trim() === 'Đã hủy'
                                            }
                                        />
                                    </div>

                                    {/* Giá */}
                                    <div className='flex flex-col w-full gap-3 md:w-auto'>
                                        <span className='text-2xl font-bold'>Giá</span>
                                        <Input
                                            readOnly
                                            value={formatVND(Number(partform.price)) + ' VNĐ'}
                                            style={{
                                                backgroundColor: 'transparent'
                                            }}
                                            disabled={
                                                maintenance.status.trim() ===
                                                    'Hoàn thành bảo dưỡng' ||
                                                maintenance.status.trim() === 'Đã hủy'
                                            }
                                        />
                                    </div>

                                    {/* Số lượng */}
                                    <div className='flex flex-col w-full gap-3 md:w-auto'>
                                        <span className='text-2xl font-bold'>Số lượng</span>
                                        <div className='flex items-center select-none'>
                                            <div
                                                className='cursor-pointer w-[30px] h-[30px] text-xl flex items-center justify-center border border-solid border-gray-300'
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        index,
                                                        partform.quantity - 1
                                                    )
                                                }
                                            >
                                                <MinusOutlined />
                                            </div>
                                            <div className='w-[50px] h-[30px] text-2xl border-t border-b border-gray-300'>
                                                <input
                                                    min={0}
                                                    value={partform.quantity}
                                                    readOnly
                                                    className='w-full h-full text-center bg-transparent outline-none'
                                                />
                                            </div>
                                            <div
                                                className='cursor-pointer w-[30px] h-[30px] text-xl flex items-center justify-center border border-solid border-gray-300'
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        index,
                                                        partform.quantity + 1
                                                    )
                                                }
                                            >
                                                <PlusOutlined />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Độ hao mòn */}
                                    <div className='flex flex-col w-full gap-3 md:w-auto'>
                                        <span className='text-2xl font-bold'>Độ hao mòn</span>
                                        <InputNumber
                                            defaultValue={wearPercentage}
                                            min={0}
                                            max={100}
                                            formatter={(value) => `${value}%`}
                                            parser={(value) => value?.replace('%', '')}
                                            style={{
                                                backgroundColor: 'transparent'
                                            }}
                                            onChange={(value) => setWearPercentage(value)}
                                            disabled={
                                                maintenance.status.trim() ===
                                                    'Hoàn thành bảo dưỡng' ||
                                                maintenance.status.trim() === 'Đã hủy'
                                            }
                                        />
                                    </div>

                                    {/* Hành động */}
                                    <div className='flex flex-col items-center justify-center w-full gap-12 md:w-auto'>
                                        <span></span>
                                        {maintenance.status.trim() !== 'Hoàn thành bảo dưỡng' &&
                                        maintenance.status.trim() !== 'Đã hủy' ? (
                                            <div>
                                                <DeleteOutlined
                                                    className='text-3xl text-red-500 cursor-pointer'
                                                    onClick={() =>
                                                        handleDeletePartForm(index, partform.id)
                                                    }
                                                />
                                            </div>
                                        ) : null}
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
                            defaultValue={wearAfter}
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '')}
                            style={{
                                backgroundColor: 'transparent'
                            }}
                            value={wearAfter}
                            onChange={(value) => setWearAfter(value)}
                            disabled={
                                maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ||
                                maintenance.status.trim() === 'Đã hủy'
                            }
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
                            value={notesAfter}
                            onChange={(e) => setNotesAfter(e.target.value)}
                            disabled={
                                maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ||
                                maintenance.status.trim() === 'Đã hủy'
                            }
                        />
                    </div>

                    {/* Lựa chọn */}
                    {maintenance.status.trim() !== 'Hoàn thành bảo dưỡng' &&
                    maintenance.status.trim() !== 'Đã hủy' ? (
                        <div className='flex items-center justify-end w-full gap-5'>
                            <Button
                                type='light'
                                className='h-16 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                                style={{
                                    fontFamily: 'LXGW WenKai TC',
                                    cursive: 'LXGW Wen'
                                }}
                                onClick={handleComplete}
                            >
                                Hoàn thành
                            </Button>
                        </div>
                    ) : null}
                    {maintenance.status.trim() === 'Hoàn thành bảo dưỡng' ? (
                        <div className='flex items-center justify-end w-full gap-5'>
                            <Button
                                type='light'
                                className='h-16 text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white'
                                style={{
                                    fontFamily: 'LXGW WenKai TC',
                                    cursive: 'LXGW Wen'
                                }}
                                onClick={handlePrintInvoice}
                            >
                                Xuất hóa đơn
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
};

export default SectionMain;
