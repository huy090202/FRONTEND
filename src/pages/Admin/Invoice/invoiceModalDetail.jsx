/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { formatVND } from '~/utils/formatVND';

const InvoiceModalDetail = ({ isVisible, onCancel, invoice }) => {
    const [technician, setTechnician] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceCode, setInvoiceCode] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const [invoiceDetailData, setInvoiceDetailData] = useState([]);

    const invoiceData = useMemo(() => invoice, [invoice]);

    useEffect(() => {
        if (invoiceData) {
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

    useEffect(() => {
        const fetchInvoiceDetail = async () => {
            if (!invoiceData) return;

            const invoiceDetailArray = [];
            for (let i = 0; i < invoice.maintenance.maintenanceDetails.length; i++) {
                invoiceDetailArray.push(invoiceData.maintenance.maintenanceDetails[i].part);
            }
            setInvoiceDetailData(invoiceDetailArray);
        };
        fetchInvoiceDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData]);

    return (
        <Modal open={isVisible} onCancel={onCancel} footer={null} width={900} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold text-center'>Chi tiết hóa đơn</div>
            {invoice && (
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <div className='w-[60%] flex flex-col items-start gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Code:</label>
                                    <Input size='large' readOnly value={invoiceCode} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ngày đặt hàng:</label>
                                    <Input size='large' readOnly value={invoiceDate} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Kỹ thuật viên phụ trách:
                                    </label>
                                    <Input size='large' readOnly value={technician} />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
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
                    {invoiceData.maintenance.maintenanceDetails.length > 0 &&
                        invoiceData.maintenance.maintenanceDetails.map((item, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                            >
                                <div className='flex items-center gap-10'></div>
                            </div>
                        ))}
                </div>
            )}
        </Modal>
    );
};

export default InvoiceModalDetail;
