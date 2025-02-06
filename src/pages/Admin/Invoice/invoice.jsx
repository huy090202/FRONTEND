/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { toast } from 'react-toastify';
import { Input, Pagination, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/shared/Loading/loading';
import { formatVND } from '~/utils/formatVND';
import { selectFilteredInvoices } from '~/redux/selector/invoiceSelector';
import { invoiceActions } from '~/redux/slice/invoiceSlice';
import InvoiceModalDetail from './invoiceModalDetail';

const Invoice = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { invoices, page, limit, total } = useSelector((state) => state.invoice);

    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

    const filteredInvoices = useSelector((state) =>
        selectFilteredInvoices(state, filterInput, paymentStatusFilter, paymentMethodFilter)
    );

    const showModal = (order) => {
        setSelectedInvoice(order);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const dispatch = useDispatch();

    const handlePageChange = (page, limit) => {
        dispatch(invoiceActions.fetchInvoices({ token, page, limit }));
    };

    const handleDeleteInvoice = useCallback(
        (code) => {
            if (!token || !code) {
                return;
            }
            dispatch(invoiceActions.deleteInvoice({ token, code }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'invoices_code',
                Cell: ({ value, row }) => (
                    <span
                        className='text-gray-500 cursor-pointer hover:underline'
                        onClick={() => showModal(row.original)}
                    >
                        {value}
                    </span>
                )
            },
            {
                Header: 'Thời gian tạo hóa đơn',
                accessor: 'create_at'
            },
            {
                Header: 'Tổng tiền',
                accessor: 'total_amount',
                Cell: ({ value }) => formatVND(Number(value))
            },
            {
                Header: 'Trạng thái thanh toán',
                accessor: 'payment_status'
            },
            {
                Header: 'Phương thức thanh toán',
                accessor: 'payment_method'
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <div className='flex items-center w-full'>
                        {row.original.payment_status === 'Đã thanh toán' ? (
                            <DeleteOutlined
                                className='text-3xl'
                                onClick={() => handleDeleteInvoice(row.original.invoices_code)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        ) : null}
                    </div>
                )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token, invoices.data.length]
    );

    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(invoiceActions.fetchInvoices({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu hóa đơn thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, page, limit, dispatch, invoices.data.length, totalPages]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredInvoices
        },
        useGlobalFilter
    );

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

    const handlePaymentStatusFilterChange = (value) => {
        setPaymentStatusFilter(value);
    };

    const handlePaymentMethodFilterChange = (value) => {
        setPaymentMethodFilter(value);
    };

    const vietnameseLocale = {
        items_per_page: '/ trang',
        jump_to: 'Đi đến',
        page: '',
        prev_page: 'Trang trước',
        next_page: 'Trang sau',
        prev_5: '5 trang trước',
        next_5: '5 trang sau'
    };

    return (
        <Fragment>
            {invoices.loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='flex flex-col w-full'>
                <h1 className='text-4xl font-bold my-14'>Danh sách hóa đơn</h1>
                <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                    {/* Filter */}
                    <div className='flex gap-4 px-10 mb-4'>
                        <Input
                            size='large'
                            className='w-1/4 px-4 py-5 text-2xl border rounded-2xl'
                            type='text'
                            placeholder='Nhập vào code'
                            value={filterInput}
                            onChange={handleFilterChange}
                        />
                        <Select
                            defaultValue='all'
                            onChange={handlePaymentStatusFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Trạng thái thanh toán', value: 'all' },
                                { label: 'Đã thanh toán', value: 'Đã thanh toán' },
                                { label: 'Chưa thanh toán', value: 'Chưa thanh toán' }
                            ]}
                        />
                        <Select
                            defaultValue='all'
                            onChange={handlePaymentMethodFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Phương thức thanh toán', value: 'all' },
                                { label: 'Tiền mặt', value: 'Tiền mặt' },
                                { label: 'ZALOPAY', value: 'ZALOPAY' }
                            ]}
                        />
                    </div>
                    {/* Table */}
                    <table {...getTableProps()} className='w-full'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            key={column.id}
                                            className='h-24 text-left bg-[#f4f6f8] py-5 px-10 text-2xl'
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        key={row.id}
                                        className='border-gray-200 border-y-2 hover:bg-[#f4f6f8] text-2xl text-gray-500'
                                    >
                                        {row.cells.map((cell) => (
                                            <td key={cell.column.id} className='h-24 px-10 py-5'>
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {/* Page */}
                    <div className='flex items-center justify-center px-10 mt-5 text-2xl'>
                        <div className='flex gap-4 text-gray-500'>
                            <Pagination
                                current={page}
                                pageSize={limit}
                                total={total}
                                onChange={handlePageChange}
                                showSizeChanger
                                locale={vietnameseLocale}
                            />
                        </div>
                    </div>
                    {/* Modal */}
                    <InvoiceModalDetail
                        isVisible={isModalVisible}
                        onCancel={handleCancel}
                        invoice={selectedInvoice}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Invoice;
