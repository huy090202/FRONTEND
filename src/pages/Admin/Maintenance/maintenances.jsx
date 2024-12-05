/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { Input, Pagination, Select } from 'antd';
import MaintenanceModalDetail from './maintenanceModalDetail';
import { FormatDate } from '~/utils/formatDate.js';
import { selectFilteredMaintenances } from '~/redux/selector/maintenanceSelector';
import { maintenanceActions } from '~/redux/slice/maintenanceSlice';
import Loading from '~/components/shared/Loading/loading';

const Maintenances = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { maintenances, page, limit, total } = useSelector((state) => state.maintenance);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredMaintenances = useSelector((state) =>
        selectFilteredMaintenances(state, filterInput, statusFilter)
    );

    const statusOptions = [
        { value: 'Kiểm tra xe', label: 'Kiểm tra xe' },
        { value: 'Đang bảo dưỡng', label: 'Đang bảo dưỡng' },
        { value: 'Hoàn thành bảo dưỡng', label: 'Hoàn thành bảo dưỡng' },
        { value: 'Đã hủy', label: 'Đã hủy' }
    ];

    const dispatch = useDispatch();

    const handlePageChange = (page, limit) => {
        dispatch(maintenanceActions.fetchMaintenances({ token, page, limit }));
    };

    const showModal = (maintenance) => {
        setSelectedMaintenance(maintenance);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteMaintenance = useCallback(
        (id) => {
            if (!token || !id) return;
            dispatch(maintenanceActions.deleteMaintenance({ token, id }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'maintenance_code',
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
                accessor: 'motor',
                Cell: ({ value }) => (value ? `${value?.motor_name}` : 'Không có tên xe')
            },
            {
                Header: 'Tên khách hàng',
                accessor: 'appointment',
                Cell: ({ value }) =>
                    value ? `${value.user?.lastName} ${value.user?.firstName}` : 'Không có tên'
            },
            {
                Header: 'Tên kỹ thuật viên',
                accessor: 'user',
                Cell: ({ value }) =>
                    value ? `${value?.lastName} ${value?.firstName}` : 'Không có tên'
            },
            {
                Header: 'Ngày bảo dưỡng',
                accessor: 'maintenance_date',
                Cell: ({ value }) => FormatDate(value)
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
                Cell: ({ value, row }) => (
                    <Select
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                        value={value}
                        onChange={async (newStatus) => {
                            const maintenanceId = row.original.id;
                            try {
                                dispatch(
                                    maintenanceActions.updateMaintenanceStatus({
                                        token,
                                        id: maintenanceId,
                                        active: newStatus
                                    })
                                );
                                const updateData = data.map((maintenance) =>
                                    maintenance.id === maintenanceId
                                        ? { ...maintenance, status: newStatus }
                                        : maintenance
                                );
                                setData(updateData);
                            } catch (error) {
                                toast.error(error.response?.data?.message);
                            }
                        }}
                        disabled={value === 'Hoàn thành bảo dưỡng' || value === 'Đã hủy'}
                    >
                        {statusOptions.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) =>
                    (row.original.status === 'Hoàn thành bảo dưỡng' ||
                        row.original.status === 'Đã hủy') && (
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
        [token, maintenances.data.length]
    );

    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(maintenanceActions.fetchMaintenances({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu đơn bảo dưỡng thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, maintenances.data.length, page, limit, dispatch, totalPages]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredMaintenances
        },
        useGlobalFilter
    );

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
            {maintenances.loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='flex flex-col w-full'>
                <h1 className='text-4xl font-bold my-14'>Danh sách Đơn bảo dưỡng</h1>
                <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                    {/* Filter */}
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
                                { label: 'Trạng thái đơn bảo dưỡng', value: 'all' },
                                { value: 'Kiểm tra xe', label: 'Kiểm tra xe' },
                                { value: 'Đang bảo dưỡng', label: 'Đang bảo dưỡng' },
                                { value: 'Hoàn thành bảo dưỡng', label: 'Hoàn thành bảo dưỡng' },
                                { value: 'Đã hủy', label: 'Đã hủy' }
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
                    <MaintenanceModalDetail
                        isVisible={isModalVisible}
                        onCancel={handleCancel}
                        maintenance={selectedMaintenance}
                    />

                    {/* <PartModalCreate isVisible={isModalCreate} onCancel={handleCancel} /> */}
                </div>
            </div>
        </Fragment>
    );
};

export default Maintenances;
