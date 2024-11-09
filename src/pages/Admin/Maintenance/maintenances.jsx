/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Input, Select } from 'antd';
import { changeMaintenanceStatus, getAllMaintenances } from '~/services/maintenanceService';
import MaintenanceModalDetail from './maintenanceModalDetail';
import { FormatDate } from '~/utils/formatDate.js';

const Maintenances = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const limit = 5;

    const statusOptions = [
        { value: 'Nhận xe', label: 'Nhận xe' },
        { value: 'Kiểm tra xe', label: 'Kiểm tra xe' },
        { value: 'Đang bảo dưỡng', label: 'Đang bảo dưỡng' },
        { value: 'Hoàn thành bảo dưỡng', label: 'Hoàn thành bảo dưỡng' }
    ];

    const showModal = (maintenance) => {
        setSelectedMaintenance(maintenance);
        setIsModalVisible(true);
    };

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalCreate(false);
    };

    const handleDeletePart = async (maintenanceId) => {
        alert(`Xóa đơn bảo dưỡng có id: ${maintenanceId}`);
        // try {
        //     const res = await deletePart(token, maintenanceId);
        //     if (res.status) {
        //         toast.success(res.message);
        //         setData(data.filter((maintenance) => maintenance.id !== maintenanceId));
        //     } else {
        //         toast.error(res.message);
        //     }
        // } catch (error) {
        //     toast.error('Xóa đơn bảo dưỡng thất bại');
        // }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Ngày bảo dưỡng',
                accessor: 'maintenance_date',
                Cell: ({ value, row }) => (
                    <span
                        className='text-gray-500 cursor-pointer hover:underline'
                        onClick={() => showModal(row.original)}
                    >
                        {FormatDate(value)}
                    </span>
                )
            },
            {
                Header: 'Ghi chú trước bảo dưỡng',
                accessor: 'notes_before'
            },
            {
                Header: 'Ghi chú sau bảo dưỡng',
                accessor: 'notes_after'
            },
            {
                Header: 'Phần trăm hao mòn trước',
                accessor: 'wear_percentage_before',
                Cell: ({ value }) => <span>{value} %</span>
            },
            {
                Header: 'Phần trăm hao mòn sau',
                accessor: 'wear_percentage_after',
                Cell: ({ value }) => <span>{value} %</span>
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
                                const response = await changeMaintenanceStatus(
                                    token,
                                    maintenanceId,
                                    newStatus
                                );
                                if (response.status === true) {
                                    toast.success(response.message);
                                } else {
                                    toast.error(response.message);
                                }
                            } catch (error) {
                                toast.error('Cập nhật trạng thái thất bại!');
                            }
                        }}
                        disabled={value === 'Hoàn thành bảo dưỡng'}
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
                Cell: ({ row }) => (
                    <div className='flex items-center w-full'>
                        <DeleteOutlined
                            className='text-3xl'
                            onClick={() => handleDeletePart(row.original.id)}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                )
            }
        ],
        [token, data]
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                toast.error('Token không tồn tại');
                return;
            }
            try {
                const response = await getAllMaintenances(token, { page, limit });
                setData(response.data);
                setTotalPages(Math.ceil(response.total / limit));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token, page]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
        useTable(
            {
                columns,
                data
            },
            useGlobalFilter
        );

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

    const handleApplyFilter = () => {
        setGlobalFilter(filterInput);
    };

    const handleClearFilter = () => {
        setFilterInput('');
        setGlobalFilter(undefined);
    };

    const handleGoToFirstPage = () => {
        setPage(1);
    };

    const handleGoToLastPage = () => {
        setPage(totalPages);
    };

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages + 1;

    return (
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
                    <button
                        className='px-6 py-1 mr-2 text-xl text-white bg-black rounded-2xl'
                        onClick={handleApplyFilter}
                    >
                        Tìm kiếm
                    </button>
                    {filterInput && (
                        <button
                            className='px-6 py-1 mr-2 text-xl text-white bg-red-600 rounded-2xl'
                            onClick={handleClearFilter}
                        >
                            Xóa
                        </button>
                    )}
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
                <div className='flex items-center justify-between px-10 mt-5 text-2xl'>
                    <span className='text-black'>
                        Trang {page} / {totalPages}
                    </span>
                    <div className='flex gap-4 text-gray-500'>
                        <DoubleLeftOutlined
                            onClick={handleGoToFirstPage}
                            className={`p-3 rounded-xl ${
                                isFirstPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <LeftOutlined
                            onClick={() => !isFirstPage && setPage((prev) => prev - 1)}
                            className={`p-3 rounded-xl ${
                                isFirstPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <RightOutlined
                            onClick={() => !isLastPage && setPage((prev) => prev + 1)}
                            className={`p-3 rounded-xl ${
                                isLastPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <DoubleRightOutlined
                            onClick={handleGoToLastPage}
                            className={`p-3 rounded-xl ${
                                isLastPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
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
    );
};

export default Maintenances;
