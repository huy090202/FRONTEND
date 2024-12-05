import { Input, Form, Radio, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '~/components/shared/Loading/loading';
import { createInvoice } from '~/services/invoiceService';
import { getMaintenanceById } from '~/services/maintenanceService';
import { FormatDate } from '~/utils/formatDate';
import { formatVND } from '~/utils/formatVND';

const MaintenanceInvoice = () => {
    const id = useParams().maintenanceId;

    const token = useSelector((state) => state.auth.auth.access_token);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [maintenanceData, setMaintenanceData] = useState(null); // Lưu thông tin đơn bảo dưỡng
    const [maintenanceDetails, setMaintenanceDetails] = useState(null); // Lưu thông tin chi tiết bảo dưỡng

    // Phương thức thanh toán mặc định
    const [value, setValue] = useState('Tiền mặt');

    // Lấy thông tin đơn bảo dưỡng
    useEffect(() => {
        const getMaintenance = async () => {
            setLoading(true);
            try {
                const response = await getMaintenanceById(token, id);
                setMaintenanceData(response.data);
                const details = response.data.maintenanceDetails.map((detail) => {
                    return {
                        part: detail.part.part_name,
                        quantity: detail.quantity,
                        price: detail.price
                    };
                });
                setMaintenanceDetails(details);
            } catch (error) {
                console.log(error.message);
                toast.error('Có lỗi xảy ra khi lấy thông tin đơn bảo dưỡng', error.message);
            }
            setLoading(false);
        };
        getMaintenance();
    }, [token, id]);

    const quantitys = maintenanceDetails?.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const amounts = maintenanceDetails?.reduce((total, item) => {
        return total + item.price;
    }, 0);

    const onChange = (e) => {
        setValue(e.target.value);
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

    const navigate = useNavigate();

    const handlePaymentInvoice = async () => {
        const selectedPaymentMethod = value === 'Tiền mặt' ? 'Tiền mặt' : 'ZALOPAY';
        const invoiceData = {
            maintenance_id: id,
            total_amount: Number(amounts),
            payment_method: selectedPaymentMethod
        };

        try {
            setLoading(true);
            if (!token) return;

            const newInvoice = await createInvoice(token, invoiceData);
            if (newInvoice.status === true) {
                if (invoiceData?.payment_method === 'ZALOPAY') {
                    window.location.href = newInvoice.data;
                } else {
                    navigate('/');
                    toast.success(newInvoice.message);
                }
            } else {
                toast.error(newInvoice.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thanh toán hóa đơn', error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(id);
    return (
        <Fragment>
            {loading && id && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <section className='flex items-center justify-center w-full py-12 bg-white h-fit'>
                <div
                    className='w-[80%] shadow-2xl bg-[rgba(0,0,0,0.11)] p-20 rounded-xl flex flex-col gap-10'
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <h1 className='text-4xl font-bold text-center uppercase'>Thanh toán hóa đơn</h1>
                    <div className='flex items-start justify-between gap-10 p-10 bg-white shadow-sm rounded-xl h-fit'>
                        <div className='flex flex-col w-full gap-10'>
                            <h3 className='text-3xl font-bold'>Thông tin khách hàng</h3>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Tên khách hàng'>
                                    <Input
                                        readOnly
                                        value={
                                            maintenanceData?.appointment?.user.lastName +
                                            ' ' +
                                            maintenanceData?.appointment?.user.firstName
                                        }
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Email'>
                                    <Input
                                        readOnly
                                        value={maintenanceData?.appointment?.user.email}
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Số điện thoại'>
                                    <Input
                                        readOnly
                                        value={maintenanceData?.appointment?.user.phoneNumber}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='flex flex-col w-full gap-10'>
                            <h3 className='text-3xl font-bold'>Thông tin kỹ thuật viên</h3>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Tên kỹ thuật viên'>
                                    <Input
                                        readOnly
                                        value={
                                            maintenanceData?.user.lastName +
                                            ' ' +
                                            maintenanceData?.user.firstName
                                        }
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Email'>
                                    <Input readOnly value={maintenanceData?.user.email} />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Số điện thoại'>
                                    <Input readOnly value={maintenanceData?.user.phoneNumber} />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='flex flex-col w-full gap-10'>
                            <h3 className='text-3xl font-bold'>Thông tin xe</h3>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Tên xe'>
                                    <Input readOnly value={maintenanceData?.motor.motor_name} />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Số khung'>
                                    <Input readOnly value={maintenanceData?.motor.chassis_number} />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Biển số xe'>
                                    <Input readOnly value={maintenanceData?.motor.license_plate} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className='flex items-start justify-between gap-10 p-10 bg-white shadow-sm rounded-xl h-fit'>
                        <div className='flex flex-col w-full gap-10'>
                            <h3 className='text-3xl font-bold'>Thông tin bảo dưỡng</h3>
                            <Form form={form} layout='vertical'>
                                <Form.Item className='font-[400]' label='Mã bảo dưỡng'>
                                    <Input readOnly value={maintenanceData?.maintenance_code} />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Ghi chú'>
                                    <TextArea
                                        rows={4}
                                        readOnly
                                        value={maintenanceData?.notes_after}
                                    />
                                </Form.Item>
                                <Form.Item className='font-[400]' label='Ngày bảo dưỡng'>
                                    <Input
                                        readOnly
                                        value={FormatDate(maintenanceData?.maintenance_date)}
                                    />
                                </Form.Item>
                            </Form>
                            <span className='text-2xl'>Chi tiết bảo dưỡng</span>
                            {maintenanceData?.maintenanceDetails.map((detail) => (
                                <div
                                    className='flex items-center justify-between gap-10 p-5 text-2xl border-b'
                                    key={detail.id}
                                >
                                    <div className='flex items-center gap-2'>
                                        <span>{detail?.part.part_name}</span>
                                        <span className='font-bold'>x{detail?.quantity}</span>
                                    </div>
                                    <span>{formatVND(Number(detail?.price)) + ' ' + 'VNĐ'}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col w-full gap-10'>
                            <h3 className='text-3xl font-bold'>Thông tin thanh toán</h3>
                            <div className='flex flex-col gap-10'>
                                <span className='text-2xl'>Phương thức thanh toán</span>
                                <Radio.Group
                                    className='font-[400]'
                                    onChange={onChange}
                                    value={value}
                                >
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
                            <div className='text-2xl font-[400] flex flex-col justify-end gap-4 mt-5 border-t pt-5'>
                                <div className='flex items-center justify-between'>
                                    <span>Tổng số lượng phụ tùng</span>
                                    <span>{quantitys}</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Thành tiền</span>
                                    <span>{formatVND(Number(amounts)) + ' ' + 'VNĐ'}</span>
                                </div>
                                <div
                                    className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-[#6699BB]'
                                    onClick={handlePaymentInvoice}
                                >
                                    Thanh toán
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default MaintenanceInvoice;
