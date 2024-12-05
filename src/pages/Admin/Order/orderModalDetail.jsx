/* eslint-disable react/prop-types */
import { Badge, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { orderActions } from '~/redux/slice/orderSlice';
import { formatVND } from '~/utils/formatVND';

const OrderModalDetail = ({ isVisible, onCancel, order }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [orderDate, setOrderDate] = useState('');
    const [orderCode, setOrderCode] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [orderDetailData, setOrderDetailData] = useState([]);

    const dispatch = useDispatch();

    const orderData = useMemo(() => order, [order]);

    useEffect(() => {
        if (orderData) {
            setOrderDate(orderData.order_date);
            setOrderCode(orderData.order_code);
            setTotalPrice(orderData.total_price);
            setTotalQuantity(orderData.total_quantity);
            setOrderStatus(orderData.order_status);
            setPaymentStatus(orderData.payment_status);
            setPaymentMethod(orderData.payment_method);
            setDeliveryMethod(orderData.delivery_method);
            setNotes(orderData.notes);
            setName(orderData.name);
            setEmail(orderData.email);
            setPhone(orderData.phone);
        }
    }, [orderData]);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!orderData) return;

            const orderDetailsDataArray = [];
            for (let i = 0; i < orderData.details.length; i++) {
                orderDetailsDataArray.push(orderData.details[i].part);
            }
            setOrderDetailData(orderDetailsDataArray);
        };
        fetchOrderDetail();
    }, [orderData]);

    const statusOptions = [
        { value: 'PENDING', label: 'Chờ xác nhận' },
        { value: 'CONFIRMED', label: 'Đã xác nhận' },
        { value: 'PREPARING', label: 'Đang chuẩn bị' },
        { value: 'SHIPPING', label: 'Đang giao hàng' },
        { value: 'DELIVERED', label: 'Đã giao hàng' },
        { value: 'CANCELED', label: 'Đã hủy' },
        { value: 'INVALID', label: 'Đơn hàng không hợp lệ' },
        { value: 'FAILED', label: 'Đơn hàng thất bại' }
    ];

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={900}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC' }}
        >
            <div className='mb-10 text-4xl font-semibold text-center'>Chi tiết hóa đơn</div>
            {order && (
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <div className='w-[60%] flex flex-col items-start gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Mã đơn hàng:</label>
                                    <Input size='large' readOnly value={orderCode} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ngày đặt hàng:</label>
                                    <Input size='large' readOnly value={orderDate} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên người đặt:</label>
                                    <Input size='large' readOnly value={name} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Email:</label>
                                    <Input size='large' readOnly value={email} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                                    <Input size='large' readOnly value={phone} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ghi chú:</label>
                                    <TextArea
                                        rows={4}
                                        value={notes}
                                        readOnly
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tổng số lượng:</label>
                                    <Input size='large' readOnly value={totalQuantity} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tổng tiền hóa đơn:</label>
                                    <Input
                                        size='large'
                                        readOnly
                                        value={formatVND(Number(totalPrice))}
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Trạng thái đơn hàng:
                                    </label>
                                    <Select
                                        className='h-16'
                                        style={{
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        value={orderStatus}
                                        onChange={async (newStatus) => {
                                            if (!token) {
                                                toast.error('Token không tồn tại');
                                                return;
                                            }
                                            try {
                                                dispatch(
                                                    orderActions.updateOrderStatus({
                                                        token,
                                                        id: orderData.id,
                                                        status: newStatus
                                                    })
                                                );
                                                onCancel();
                                            } catch (error) {
                                                toast.error(error.response?.data?.message);
                                            }
                                        }}
                                        disabled={
                                            orderStatus === 'Đã giao hàng' ||
                                            orderStatus === 'Đã hủy' ||
                                            orderStatus === 'Đơn hàng không hợp lệ' ||
                                            orderStatus === 'Đơn hàng thất bại'
                                        }
                                    >
                                        {statusOptions.map((option) => (
                                            <Select.Option key={option.value} value={option.label}>
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Trạng thái thanh toán:
                                    </label>
                                    <Input size='large' readOnly value={paymentStatus} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Phương thức thanh toán:
                                    </label>
                                    <Input size='large' readOnly value={paymentMethod} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Phương thức vận chuyển:
                                    </label>
                                    <Input size='large' readOnly value={deliveryMethod} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {orderData.details &&
                            orderData.details.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                                >
                                    <div className='flex items-center gap-10'>
                                        <div className='flex items-center justify-center'>
                                            {orderDetailData[index]?.sale > 0 ? (
                                                <Badge.Ribbon
                                                    text={`Giảm ]giá ${orderDetailData[index]?.sale}%`}
                                                    color='red'
                                                >
                                                    <img
                                                        loading='lazy'
                                                        src={
                                                            orderDetailData[index]?.part_image
                                                                ? `/minio${orderDetailData[index]?.part_image}`
                                                                : 'https://placehold.co/256'
                                                        }
                                                        alt='#Ảnh linh kiện'
                                                        className='rounded-2xl size-64'
                                                    />
                                                </Badge.Ribbon>
                                            ) : (
                                                <div className=''>
                                                    <img
                                                        loading='lazy'
                                                        src={
                                                            orderDetailData[index]?.part_image
                                                                ? `/minio${orderDetailData[index]?.part_image}`
                                                                : 'https://placehold.co/256'
                                                        }
                                                        alt='#Ảnh linh kiện'
                                                        className='rounded-2xl size-64'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex flex-col items-start justify-center gap-2'>
                                                <span className='text-2xl font-bold text-[#6699BB]'>
                                                    {orderDetailData[index]?.part_name}
                                                </span>
                                                <span className='text-2xl font-[500]'>
                                                    Số lượng: {item?.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-2xl font-[500] text-gray-800'>
                                                {formatVND(Number(item.price))} VNĐ
                                            </span>
                                            {orderDetailData[index]?.sale > 0 && (
                                                <span className='text-2xl text-gray-400 line-through'>
                                                    {formatVND(
                                                        Number(orderDetailData[index]?.part_price)
                                                    )}{' '}
                                                    VNĐ
                                                </span>
                                            )}
                                        </div>
                                        <span className='text-2xl font-[500] text-red-500'>
                                            {formatVND(Number(item.total_price))} VNĐ
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default OrderModalDetail;
