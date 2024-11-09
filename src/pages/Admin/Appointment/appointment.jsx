/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined
} from '@ant-design/icons';
import { getAllAppoinmentsAdmin, updateAppoinmentStatus } from '~/services/appoinmentService';
import { useGlobalFilter, useTable } from 'react-table';
import { allMotors } from '~/services/motorService';
import AppointmentModalDetail from '~/pages/Appointment/HistoryAppointment/appointmentModalDetail';
import { Input, Select } from 'antd';
import { getAllTechs } from '~/services/userService';
import { FormatDate } from '~/utils/formatDate.js';

const Appointment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [dataAppointment, setDataAppointment] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState('');
    const limit = 5;

    const [selectedAppoint, setSelectedAppoint] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (appoint) => {
        setSelectedAppoint(appoint);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const statusOptions = [
        { value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
        { value: 'Đã xác nhận', label: 'Đã xác nhận' },
        { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
        { value: 'Đã hủy', label: 'Đã hủy' }
    ];

    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await getAllTechs(token, { page, limit: 30 });
                if (response.status === true) {
                    setTechnicians(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Không thể tải danh sách KTV');
            }
        };

        fetchTechnicians();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Tên xe',
                accessor: 'motor_name',
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
                accessor: 'status',
                Cell: ({ value, row }) => (
                    <Select
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                        value={value}
                        onChange={async (newStatus) => {
                            const appointmentId = row.original.id;
                            try {
                                const response = await updateAppoinmentStatus(
                                    token,
                                    appointmentId,
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
                        disabled={value === 'Đã hoàn thành' || value === 'Đã hủy'}
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
                Header: 'Người phụ trách',
                accessor: 'technician_name',
                Cell: ({ value, row }) => (
                    <Select
                        style={{ width: '100%' }}
                        value={value}
                        defaultValue={row.original.technicianId}
                        onChange={async (newTechnicianId) => {
                            const appointmentId = row.original.id;
                            // try {
                            //     const response = await updateTechnician(
                            //         token,
                            //         appointmentId,
                            //         newTechnicianId
                            //     );
                            //     if (response.status === true) {
                            //         toast.success(response.message);
                            //     } else {
                            //         toast.error(response.message);
                            //     }
                            // } catch (error) {
                            //     toast.error('Cập nhật kỹ thuật viên thất bại!');
                            // }
                        }}
                    >
                        {technicians.map((technician) => (
                            <Select.Option key={technician.id} value={technician.id}>
                                {technician.lastName} {technician.firstName}
                            </Select.Option>
                        ))}
                    </Select>
                )
            }
        ],
        [token, technicians]
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const motorsResponse = await allMotors(token);
                const motors = motorsResponse.data;

                const response = await getAllAppoinmentsAdmin(token, { page, limit });
                const appointments = response.data;
                console.log(appointments);

                const technicianMap = {};
                technicians.forEach((technician) => {
                    technicianMap[technician.id] = `${technician.lastName} ${technician.firstName}`;
                });

                const appointmentsWithMotorName = appointments.map((appointment) => {
                    console.log(appointment);
                    // const motorName = motors.find((m) => m.id === appointment.motor_id);
                    return {
                        ...appointment,
                        motor_name: appointment ? appointment.motor.motor_name : 'Không có tên xe',
                        technician_name:
                            technicianMap[appointment.technicianId] || 'Chưa có kỹ thuật viên'
                    };
                });
                setDataAppointment(appointmentsWithMotorName);
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
                data: dataAppointment
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
    const isLastPage = page === totalPages;

    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-4xl font-bold my-14'>Danh sách lịch hẹn</h1>
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
                    {/* Modal */}
                </div>
                <AppointmentModalDetail
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    appoint={selectedAppoint}
                />
            </div>
        </div>
    );
};

export default Appointment;
