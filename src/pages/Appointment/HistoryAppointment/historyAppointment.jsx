/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { useTable } from 'react-table';
import AppointmentModalDetail from './appointmentModalDetail';
import { FormatDate } from '~/utils/formatDate.js';
import { selectFilteredAppointmentsUser } from '~/redux/selector/appointmentSelector';
import { appointmentActions } from '~/redux/slice/appointmentSlice';
import Loading from '~/components/shared/Loading/loading';
import { Input, Pagination, Select } from 'antd';

const HistoryAppointment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { appointmentsByUser, page, limit, total } = useSelector((state) => state.appointment);

    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [selectedAppoint, setSelectedAppoint] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const filteredAppointments = useSelector((state) =>
        selectFilteredAppointmentsUser(state, filterInput, statusFilter)
    );

    const dispatch = useDispatch();

    const showModal = (appoint) => {
        setSelectedAppoint(appoint);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePageChange = (page, limit) => {
        dispatch(appointmentActions.fetchAppointmentsByUser({ token, page, limit }));
    };

    // Xử lý xóa lịch hẹn
    const handleDeleteAppoint = useCallback(
        (id) => {
            if (!token || !id) {
                return;
            }
            dispatch(appointmentActions.deleteAppointmentByUser({ token, appointmentId: id }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Tên xe',
                accessor: 'motor',
                Cell: ({ value, row }) => (
                    <span
                        className='text-gray-500 cursor-pointer hover:underline'
                        onClick={() => showModal(row.original)}
                    >
                        {value ? value.motor_name : 'Không có tên xe'}
                    </span>
                )
            },
            {
                Header: 'Tên khách hàng',
                accessor: 'user',
                Cell: ({ value }) =>
                    value ? value.lastName + ' ' + value.firstName : 'Không có tên'
            },
            {
                Header: 'Ngày hẹn',
                accessor: 'appointment_date',
                Cell: ({ value }) => FormatDate(value)
            },
            {
                Header: 'Giờ bắt đầu',
                accessor: 'appointment_time'
            },
            {
                Header: 'Ghi chú',
                accessor: 'content'
            },
            {
                Header: 'Trạng thái',
                accessor: 'status'
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) =>
                    (row.original.status === 'Đã hoàn thành' ||
                        row.original.status === 'Đã hủy') && (
                        <div className='flex items-center w-full'>
                            <DeleteOutlined
                                className='text-3xl'
                                onClick={() => handleDeleteAppoint(row.original.id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        </div>
                    )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [appointmentsByUser.data.length]
    );

    // Lấy danh sách lịch hẹn
    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(appointmentActions.fetchAppointmentsByUser({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu lịch hẹn thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, appointmentsByUser.data.length, page, limit, dispatch, totalPages]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: filteredAppointments
    });

    const handleFilterChange = useCallback((e) => {
        setFilterInput(e.target.value);
    }, []);

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
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
            {appointmentsByUser.loading && (
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
                            placeholder='Từ khóa tìm kiếm...'
                            value={filterInput}
                            onChange={handleFilterChange}
                        />
                        <Select
                            defaultValue='all'
                            onChange={handleStatusFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Trạng thái lịch hẹn', value: 'all' },
                                { value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
                                { value: 'Đã xác nhận', label: 'Đã xác nhận' },
                                { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
                                { value: 'Đã hủy', label: 'Đã hủy' }
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
                    <AppointmentModalDetail
                        isVisible={isModalVisible}
                        onCancel={handleCancel}
                        appoint={selectedAppoint}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default HistoryAppointment;
