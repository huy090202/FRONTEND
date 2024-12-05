/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { useTable } from 'react-table';
import Loading from '~/components/shared/Loading/loading';
import { Input, Pagination, Select } from 'antd';
import { selectFilteredOrdersUser } from '~/redux/selector/orderSelector';
import { orderActions } from '~/redux/slice/orderSlice';
import { formatVND } from '~/utils/formatVND';
import OrderHistoryModalDetail from './orderHistoryModalDetail';

const OrderHistory = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { ordersByUser, page, limit, total } = useSelector((state) => state.order);

    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
    const [deliveryMethodFilter, setDeliveryMothodFilter] = useState('all');

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const filteredOrdersByUser = useSelector((state) =>
        selectFilteredOrdersUser(
            state,
            filterInput,
            statusFilter,
            paymentStatusFilter,
            paymentMethodFilter,
            deliveryMethodFilter
        )
    );

    const dispatch = useDispatch();

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePageChange = (page, limit) => {
        dispatch(orderActions.fetchOrdersByUser({ token, page, limit }));
    };

    // Xử lý xóa lịch hẹn
    const handleDeleteOrder = useCallback(
        (code) => {
            if (!token || !code) {
                return;
            }
            dispatch(orderActions.deleteOrderUser({ token, code }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'order_code',
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
                Header: 'Thời gian đặt',
                accessor: 'order_date'
            },
            {
                Header: 'Tên khách hàng',
                accessor: 'name'
            },
            {
                Header: 'Tổng tiền',
                accessor: 'total_price',
                Cell: ({ value }) => formatVND(Number(value))
            },
            {
                Header: 'Trạng thái',
                accessor: 'order_status'
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
                Header: 'Phương thức giao hàng',
                accessor: 'delivery_method'
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <div className='flex items-center w-full'>
                        {row.original.order_status === 'Đã giao hàng' ||
                        row.original.order_status === 'Đã hủy' ||
                        row.original.order_status === 'Đơn hàng không hợp lệ' ||
                        row.original.order_status === 'Đơn hàng thất bại' ? (
                            <DeleteOutlined
                                className='text-3xl'
                                onClick={() => handleDeleteOrder(row.original.order_code)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        ) : null}
                    </div>
                )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ordersByUser.data.length]
    );

    // Lấy danh sách lịch hẹn
    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(orderActions.fetchOrdersByUser({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu đơn hàng thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, ordersByUser.data.length, page, limit, dispatch, totalPages]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: filteredOrdersByUser
    });

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const handlePaymentStatusFilterChange = (value) => {
        setPaymentStatusFilter(value);
    };

    const handlePaymentMethodFilterChange = (value) => {
        setPaymentMethodFilter(value);
    };

    const handleDeliveryMethodFilterChange = (value) => {
        setDeliveryMothodFilter(value);
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
            {ordersByUser.loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='border-2 border-[#eeefee] rounded-2xl bg-white shadow-xl my-5'>
                <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                    <div className='flex gap-4 px-10 mb-4'>
                        <Input
                            size='large'
                            className='w-[300px] px-4 py-5 text-2xl border rounded-2xl'
                            type='text'
                            placeholder='Nhập vào code hoặc tên khách hàng'
                            value={filterInput}
                            onChange={handleFilterChange}
                        />
                        <Select
                            defaultValue='all'
                            onChange={handleStatusFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Trạng thái đơn hàng', value: 'all' },
                                { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
                                { label: 'Đã xác nhận', value: 'Đã xác nhận' },
                                { label: 'Đang chuẩn bị', value: 'Đang chuẩn bị' },
                                { label: 'Đang giao hàng', value: 'Đang giao hàng' },
                                { label: 'Đã giao hàng', value: 'Đã giao hàng' },
                                { label: 'Đã hủy', value: 'Đã hủy' },
                                { label: 'Đơn hàng không hợp lệ', value: 'Đơn hàng không hợp lệ' },
                                { label: 'Đơn hàng thất bại', value: 'Đơn hàng thất bại' }
                            ]}
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
                        <Select
                            defaultValue='all'
                            onChange={handleDeliveryMethodFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Phương thức vận chuyển', value: 'all' },
                                { label: 'Giao hàng', value: 'Giao hàng' },
                                { label: 'Nhận tại cửa hàng', value: 'Nhận tại cửa hàng' }
                            ]}
                        />
                    </div>
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
                </div>
            </div>
            <OrderHistoryModalDetail
                onCancel={handleCancel}
                order={selectedOrder}
                isVisible={isModalVisible}
            />
        </Fragment>
    );
};

export default OrderHistory;
