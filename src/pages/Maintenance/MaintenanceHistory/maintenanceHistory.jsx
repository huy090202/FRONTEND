/* eslint-disable react/prop-types */
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '~/components/shared/Loading/loading';
import { getMaintenancesByUser } from '~/services/maintenanceService';
import { FormatDate } from '~/utils/formatDate';
import { Input, Select } from 'antd';

const MaintenanceHistory = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const id = useParams().maintenanceId;

    const [isLoading, setIsLoading] = useState(false);
    const [maintenanceHistory, setMaintenanceHistory] = useState([]);

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'maintenance.maintenance_code',
                Cell: ({ value, row }) => (
                    <span
                        className='text-gray-500 cursor-pointer hover:underline'
                        // onClick={() => showModal(row.original)}
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
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token, maintenanceHistory.length]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: maintenanceHistory
        },
        useGlobalFilter
    );

    useEffect(() => {
        const fetchMaintenanceHistory = async () => {
            setIsLoading(true);
            try {
                const response = await getMaintenancesByUser(token, { id });
                if (response.status === true) {
                    setMaintenanceHistory(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMaintenanceHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Fragment>
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <section className='flex items-center justify-center w-full py-12 bg-white h-fit'>
                <div
                    className='w-[80%] shadow-2xl bg-[rgba(0,0,0,0.11)] p-20 rounded-xl flex flex-col gap-10'
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <h1 className='text-4xl font-bold text-center uppercase'>
                        Lịch sử bảo dưỡng trước đó
                    </h1>
                    <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                        {/* Filter */}
                        {/* <div className='flex gap-4 px-10 mb-4'>
                            <Input
                                size='large'
                                className='w-[300px] px-4 py-5 text-2xl border rounded-2xl'
                                type='text'
                                placeholder='Từ khóa tìm kiếm...'
                                // value={filterInput}
                                // onChange={handleFilterChange}
                            />
                            <Select
                                defaultValue='all'
                                // onChange={handleStatusFilterChange}
                                style={{ width: 150, height: 50 }}
                                options={[
                                    { label: 'Trạng thái đơn bảo dưỡng', value: 'all' },
                                    { value: 'Kiểm tra xe', label: 'Kiểm tra xe' },
                                    { value: 'Đang bảo dưỡng', label: 'Đang bảo dưỡng' },
                                    {
                                        value: 'Hoàn thành bảo dưỡng',
                                        label: 'Hoàn thành bảo dưỡng'
                                    },
                                    { value: 'Đã hủy', label: 'Đã hủy' }
                                ]}
                            />
                        </div> */}
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
                                                <td
                                                    key={cell.column.id}
                                                    className='h-24 px-10 py-5'
                                                >
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
                                {/* <Pagination
                                    current={page}
                                    pageSize={limit}
                                    total={total}
                                    onChange={handlePageChange}
                                    showSizeChanger
                                    locale={vietnameseLocale}
                                /> */}
                            </div>
                        </div>
                        {/* Modal */}
                        {/* <MaintenanceModalDetail
                            isVisible={isModalVisible}
                            onCancel={handleCancel}
                            maintenance={selectedMaintenance}
                        /> */}

                        {/* <PartModalCreate isVisible={isModalCreate} onCancel={handleCancel} /> */}
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default MaintenanceHistory;
