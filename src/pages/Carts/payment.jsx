import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge, Form, Input, Radio, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
    countCartItems,
    totalCartPrice,
    totalCartPriceAfterDiscount
} from '~/redux/selector/cartSelector';
import { formatVND } from '~/utils/formatVND';
import { createOrder } from '~/services/orderService';
import { cartActions } from '~/redux/slice/cartSlice';
import Loading from '~/components/shared/Loading/loading';

const Payment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const carts = useSelector((state) => state.cart.carts);
    const cartTotal = useSelector(totalCartPrice);
    const countCarts = useSelector(countCartItems);
    const cartTotalAfterSale = useSelector(totalCartPriceAfterDiscount);

    const [form] = Form.useForm();

    // Thông tin người dùng
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');
    const [addressUser, setAddressUser] = useState('');
    const [productNotes, setProductNotes] = useState('');

    const [shipping, setShipping] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Phương thức vận chuyển mặc định
    const [valueDelivery, setValueDeliveryMethod] = useState('Giao hàng');

    // Phương thức thanh toán mặc định
    const [value, setValuePaymentMethod] = useState('Tiền mặt');

    // Loading
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setValuePaymentMethod(e.target.value);
    };

    const onChangeDelivery = (e) => {
        setValueDeliveryMethod(e.target.value);
    };

    // Phương thức thanh toán
    const valuePaymentMethod = [
        {
            id: 1,
            label: 'Tiền mặt',
            value: 'Tiền mặt'
        },
        {
            id: 2,
            label: 'ZaloPay',
            value: 'ZALOPAY'
        }
    ];
    // Phương thức vận chuyển
    const valueDeliveryMethod = [
        {
            id: 1,
            label: 'Giao hàng',
            value: 'Giao hàng'
        },
        {
            id: 2,
            label: 'Nhận tại của hàng',
            value: 'Nhận tại của hàng'
        }
    ];

    // Xử lý tiền vận chuyển
    useEffect(() => {
        const cartShipping = Number(cartTotalAfterSale);
        if (cartShipping < 500000) {
            setShipping(60000);
            setTotalAmount(cartShipping + 60000);
        } else if (cartShipping >= 500000 && cartShipping < 1000000) {
            setShipping(30000);
            setTotalAmount(cartShipping + 30000);
        } else if (cartShipping >= 1000000 && cartShipping < 2000000) {
            setShipping(15000);
            setTotalAmount(cartShipping + 15000);
        } else {
            setShipping(0);
            setTotalAmount(cartShipping);
        }
    }, [cartTotalAfterSale]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Xử lý thanh toán
    const handlePayment = async () => {
        const selectedPaymentMethod = value === 'Tiền mặt' ? 'Tiền mặt' : 'ZALOPAY';
        const selectedDeliveryMethod =
            valueDelivery === 'Giao hàng' ? 'Giao hàng' : 'Nhận tại của hàng';
        const orer_data = {
            name: nameUser,
            email: emailUser,
            phone: phoneUser,
            address: addressUser,
            total_quantity: countCarts,
            total_price: totalAmount,
            payment_method: selectedPaymentMethod,
            delivery_method: selectedDeliveryMethod,
            notes: productNotes,
            details: carts.map((cart) => ({
                quantity: cart.quantity,
                price: cart.part_price * (1 - cart.sale / 100),
                total_price: cart.quantity * cart.part_price * (1 - cart.sale / 100),
                part_id: cart.id
            }))
        };

        try {
            setLoading(true);
            if (!token) return;

            const newOrder = await createOrder(token, orer_data);
            if (newOrder.status === true) {
                if (orer_data?.payment_method === 'ZALOPAY') {
                    window.location.href = newOrder.data;
                    dispatch(cartActions.clearCart());
                } else {
                    navigate('/menu');
                    toast.success(newOrder.message);
                    dispatch(cartActions.clearCart());
                }
            } else {
                toast.error(newOrder.message);
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cuộn lên đầu trang khi chuyển qua trang khác
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='flex flex-col gap-16 py-10 px-28'>
                <div className='text-4xl font-bold uppercase'>Thanh toán</div>
                <div className='flex items-start justify-between gap-10'>
                    <div className='w-[65%] flex flex-col gap-10'>
                        <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                            <span className='text-3xl'>Thông tin liên hệ</span>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Tên người dùng'>
                                    <Input
                                        placeholder='Hãy nhập tên của bạn'
                                        value={nameUser}
                                        onChange={(e) => setNameUser(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Email'>
                                    <Input
                                        placeholder='Hãy nhập vào email của bạn'
                                        value={emailUser}
                                        onChange={(e) => setEmailUser(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Số điện thoại'>
                                    <Input
                                        placeholder='Hãy nhập vào số điện thoại của bạn'
                                        value={phoneUser}
                                        onChange={(e) => setPhoneUser(e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                            <span className='text-3xl'>Thông tin giao hàng</span>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Địa chỉ'>
                                    <Input
                                        placeholder='Vui lòng nhập địa chỉ nhận hàng'
                                        value={addressUser}
                                        onChange={(e) => setAddressUser(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Ghi chú'>
                                    <TextArea
                                        rows={4}
                                        value={productNotes}
                                        onChange={(e) => setProductNotes(e.target.value)}
                                        placeholder='Vui lòng nhập vào ghi chú nếu có'
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='flex flex-col gap-10 px-5 py-10 rounded-lg shadow-xl'>
                            <span className='text-3xl'>Danh sách các phụ tùng đã chọn</span>
                            {carts &&
                                carts.length > 0 &&
                                carts.map((cart) => {
                                    return (
                                        <div key={cart.id}>
                                            <div className='flex items-center justify-between px-5'>
                                                <div className='flex items-center gap-10'>
                                                    <div className='flex items-center justify-center'>
                                                        {cart.sale > 0 ? (
                                                            <Badge.Ribbon
                                                                text={`Giảm giá ${cart.sale}%`}
                                                                color='red'
                                                            >
                                                                <img
                                                                    loading='lazy'
                                                                    src={
                                                                        cart.part_image
                                                                            ? `/minio${cart.part_image}`
                                                                            : 'https://placehold.co/256x256'
                                                                    }
                                                                    alt='#Ảnh linh kiện'
                                                                    className='rounded-2xl size-64'
                                                                />
                                                            </Badge.Ribbon>
                                                        ) : (
                                                            <div>
                                                                <img
                                                                    loading='lazy'
                                                                    src={
                                                                        cart.part_image
                                                                            ? `/minio${cart.part_image}`
                                                                            : 'https://placehold.co/256x256'
                                                                    }
                                                                    alt='#Ảnh linh kiện'
                                                                    className='rounded-2xl size-64'
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col gap-14'>
                                                        <span className='text-2xl font-bold text-[#6699BB]'>
                                                            {cart.part_name}
                                                        </span>
                                                        <div className='flex gap-2'>
                                                            <span className='text-2xl font-bold'>
                                                                Số lượng:
                                                            </span>
                                                            <span className='text-2xl font-[500]'>
                                                                {cart.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-14'>
                                                    <div className='flex items-center gap-2'>
                                                        {cart.sale > 0 ? (
                                                            <div className='flex flex-col gap-14'>
                                                                <span className='text-2xl text-gray-400 line-through'>
                                                                    {formatVND(cart.part_price)} VNĐ
                                                                </span>
                                                                <span className='text-2xl'>
                                                                    {formatVND(
                                                                        cart.part_price *
                                                                            (1 - cart.sale / 100)
                                                                    )}{' '}
                                                                    VNĐ
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className='text-2xl'>
                                                                {formatVND(cart.part_price)} VNĐ
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mt-5' />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className='w-[35%] flex flex-col gap-10'>
                        <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                            <span className='text-3xl'>Phương thức vận chuyển</span>
                            <Radio.Group
                                className='font-[400]'
                                onChange={onChangeDelivery}
                                value={valueDelivery}
                            >
                                {valueDeliveryMethod &&
                                    valueDeliveryMethod.map((value) => {
                                        return (
                                            <Space
                                                direction='vertical'
                                                key={value.id}
                                                className='flex flex-col'
                                            >
                                                <Radio value={value.value}>{value.label}</Radio>
                                            </Space>
                                        );
                                    })}
                            </Radio.Group>
                        </div>
                        <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                            <span className='text-3xl'>Phương thức thanh toán</span>
                            <Radio.Group className='font-[400]' onChange={onChange} value={value}>
                                {valuePaymentMethod &&
                                    valuePaymentMethod.map((value) => {
                                        return (
                                            <Space
                                                direction='vertical'
                                                key={value.id}
                                                className='flex flex-col'
                                            >
                                                <Radio value={value.value}>{value.label}</Radio>
                                            </Space>
                                        );
                                    })}
                            </Radio.Group>
                        </div>
                        <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                            <div className='text-2xl font-[400] flex flex-col justify-end gap-4 px-5 mt-5'>
                                <div className='flex items-center justify-between'>
                                    <span>Tổng</span>
                                    <span>{formatVND(cartTotal)} VNĐ</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Giảm khuyến mãi</span>
                                    <span>{formatVND(cartTotal - cartTotalAfterSale)} VNĐ</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Phí vận chuyển </span>
                                    <span>{formatVND(shipping)} VNĐ</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Thành tiền</span>
                                    <span>{formatVND(totalAmount)} VNĐ</span>
                                </div>
                                <div
                                    className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-[#6699BB]'
                                    onClick={handlePayment}
                                >
                                    Thanh toán
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;
