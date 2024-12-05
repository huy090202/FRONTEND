/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { useTable } from 'react-table';
import Loading from '~/components/shared/Loading/loading';
import { Input, Pagination, Select } from 'antd';
import { selectFilteredMaintenancesByUser } from '~/redux/selector/maintenanceSelector';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import { FormatDate } from '~/utils/formatDate';
import HistoryMaintenanceModalDetail from './historyMaintenanceModalDetail';

const HistoryMaintenance = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { maintenancesByUser, page, limit, total } = useSelector((state) => state.maintenance);

    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [selectedMain, setSelectedMain] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const filteredMaintenancesByUser = useSelector((state) =>
        selectFilteredMaintenancesByUser(state, filterInput, statusFilter)
    );

    const dispatch = useDispatch();

    const showModal = (main) => {
        setSelectedMain(main);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePageChange = (page, limit) => {
        dispatch(maintenanceActions.fetchMaintenancesByUser({ token, page, limit }));
    };

    // Xử lý xóa lịch hẹn
    const handleDeleteMaintenance = useCallback(
        (id) => {
            if (!token || !id) {
                return;
            }
            dispatch(maintenanceActions.deleteMaintenanceByUser({ token, id }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'maintenance.maintenance_code',
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
                Header: 'Tên xe',
                accessor: 'maintenance.motor',
                Cell: ({ value }) => (value ? `${value?.motor_name}` : 'Không có tên xe')
            },
            {
                Header: 'Tên khách hàng',
                accessor: 'maintenance.appointment',
                Cell: ({ value }) =>
                    value ? `${value?.user?.lastName} ${value?.user?.firstName}` : 'Không có tên'
            },
            {
                Header: 'Tên kỹ thuật viên',
                accessor: 'maintenance.user',
                Cell: ({ value }) =>
                    value ? `${value?.lastName} ${value?.firstName}` : 'Không có tên'
            },
            {
                Header: 'Ngày bảo dưỡng',
                accessor: 'maintenance.maintenance_date',
                Cell: ({ value }) => FormatDate(value)
            },
            {
                Header: 'Trạng thái',
                accessor: 'maintenance.status',
                Cell: ({ value }) => value
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) =>
                    (row.original.maintenance.status === 'Hoàn thành bảo dưỡng' ||
                        row.original.maintenance.status === 'Đã hủy') && (
                        <div className='flex items-center w-full'>
                            <DeleteOutlined
                                className='text-3xl'
                                onClick={() => handleDeleteMaintenance(row.original.id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        </div>
                    )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [maintenancesByUser.data.length]
    );

    // Lấy danh sách lịch hẹn
    const fetchData = useCallback(() => {
        if (!token) {
            return;
        }
        try {
            dispatch(maintenanceActions.fetchMaintenancesByUser({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu đơn bảo dưỡng thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, maintenancesByUser.data.length, page, limit, dispatch, totalPages]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: filteredMaintenancesByUser
    });

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

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
            {maintenancesByUser.loading && (
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
                                { label: 'Trạng thái đơn bảo dưỡng', value: 'all' },
                                { value: 'Kiểm tra xe', label: 'Kiểm tra xe' },
                                { value: 'Đang bảo dưỡng', label: 'Đang bảo dưỡng' },
                                { value: 'Hoàn thành bảo dưỡng', label: 'Hoàn thành bảo dưỡng' },
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
                </div>
            </div>
            <HistoryMaintenanceModalDetail
                isVisible={isModalVisible}
                onCancel={handleCancel}
                maintenance={selectedMain}
            />
        </Fragment>
    );
};

export default HistoryMaintenance;
