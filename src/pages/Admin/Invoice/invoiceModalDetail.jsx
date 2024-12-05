/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { formatVND } from '~/utils/formatVND';

const InvoiceModalDetail = ({ isVisible, onCancel, invoice }) => {
    const [customer, setCustomer] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [technician, setTechnician] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceCode, setInvoiceCode] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const invoiceData = useMemo(() => invoice, [invoice]);

    useEffect(() => {
        if (invoiceData) {
            setCustomer(
                invoice.maintenance.appointment.user.lastName +
                    ' ' +
                    invoice.maintenance.appointment.user.firstName
            );
            setCustomerEmail(invoice.maintenance.appointment.user.email);
            setCustomerPhone(invoice.maintenance.appointment.user.phoneNumber);
            setTechnician(
                invoice.maintenance.user.lastName + ' ' + invoice.maintenance.user.firstName
            );
            setInvoiceDate(invoiceData.create_at);
            setInvoiceCode(invoiceData.invoices_code);
            setTotalAmount(invoiceData.total_amount);
            setPaymentStatus(invoiceData.payment_status);
            setPaymentMethod(invoiceData.payment_method);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData]);

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
            {invoice && (
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <div className='w-[60%] flex flex-col items-start gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên khách hàng:</label>
                                    <Input size='large' readOnly value={customer} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Email:</label>
                                    <Input size='large' readOnly value={customerEmail} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                                    <Input size='large' readOnly value={customerPhone} />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Kỹ thuật viên phụ trách:
                                    </label>
                                    <Input size='large' readOnly value={technician} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tổng tiền hóa đơn:</label>
                                    <Input
                                        size='large'
                                        readOnly
                                        value={formatVND(Number(totalAmount))}
                                    />
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
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Mã hóa đơn:</label>
                            <Input size='large' readOnly value={invoiceCode} />
                        </div>

                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Thời gian tạo hóa đơn:</label>
                            <Input size='large' readOnly value={invoiceDate} />
                        </div>
                    </div>
                    {invoiceData.maintenance.maintenanceDetails.length > 0 &&
                        invoiceData.maintenance.maintenanceDetails.map((item, index) => (
                            <div
                                key={index}
                                className='flex items-center text-2xl justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                            >
                                <div className='flex items-center gap-5'>
                                    <img
                                        loading='lazy'
                                        src={
                                            item?.part.part_image
                                                ? `/minio${item?.part.part_image}`
                                                : 'https://placehold.co/256'
                                        }
                                        alt='#Ảnh linh kiện'
                                        className='rounded-2xl size-64'
                                    />
                                    <div className='flex gap-2'>
                                        <span>{item?.part.part_name}</span>
                                        <span className='font-bold'>x{item?.quantity}</span>
                                    </div>
                                </div>
                                <span>{formatVND(Number(item?.price)) + ' ' + 'VNĐ'}</span>
                            </div>
                        ))}
                </div>
            )}
        </Modal>
    );
};

export default InvoiceModalDetail;
