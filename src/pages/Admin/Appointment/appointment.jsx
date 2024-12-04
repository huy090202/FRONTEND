/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { useGlobalFilter, useTable } from 'react-table';
import { Input, Pagination, Select } from 'antd';
import { allTechs, getUserById } from '~/services/userService';
import { FormatDate } from '~/utils/formatDate.js';
import { createMaintenance } from '~/services/maintenanceService';
import { appointmentActions } from '~/redux/slice/appointmentSlice';
import { selectFilteredAppointments } from '~/redux/selector/appointmentSelector';
import Loading from '~/components/shared/Loading/loading';
import AppointmentModalDetail from './appointmentModalDetail';

const Appointment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { appointments, page, limit, total } = useSelector((state) => state.appointment);

    const [dataAppointment, setDataAppointment] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [selectedAppoint, setSelectedAppoint] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const filteredAppointments = useSelector((state) =>
        selectFilteredAppointments(state, filterInput, statusFilter)
    );

    const dispatch = useDispatch();

    const showModal = (appoint) => {
        setSelectedAppoint(appoint);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const statusOptions = useMemo(
        () => [
            { value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
            { value: 'Đã xác nhận', label: 'Đã xác nhận' },
            { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
            { value: 'Đã hủy', label: 'Đã hủy' }
        ],
        []
    );

    const handlePageChange = (page, limit) => {
        dispatch(appointmentActions.fetchAppointments({ token, page, limit }));
    };

    const [technicians, setTechnicians] = useState([]);

    // Lấy danh sách kỹ thuật viên
    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await allTechs();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Lấy danh sách lịch hẹn
    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(appointmentActions.fetchAppointments({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu lịch hẹn thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, appointments.data.length, page, limit, dispatch, totalPages]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    // Xử lý xóa lịch hẹn
    const handleDeleteAppoint = useCallback(
        (id) => {
            if (!token || !id) {
                return;
            }
            dispatch(appointmentActions.deleteAppointment({ token, appointmentId: id }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Tên xe',
                accessor: 'motor',
                Cell: ({ value, row }) => {
                    return (
                        <span
                            className='text-gray-500 cursor-pointer hover:underline'
                            onClick={() => showModal(row.original)}
                        >
                            {value ? value.motor_name : 'Không có tên xe'}
                        </span>
                    );
                }
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
                accessor: 'status',
                Cell: ({ value, row }) => (
                    <Select
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                        value={value}
                        onChange={async (newStatus) => {
                            if (!token) {
                                toast.error('Token không tồn tại');
                                return;
                            }
                            try {
                                dispatch(
                                    appointmentActions.updateAppoimentStatus({
                                        token,
                                        appointmentId: row.original.id,
                                        status: newStatus
                                    })
                                );
                                const updatedData = dataAppointment.map((appointment) =>
                                    appointment.id === row.original.id
                                        ? { ...appointment, status: newStatus }
                                        : appointment
                                );
                                setDataAppointment(updatedData);
                            } catch (error) {
                                toast.error(error.response?.data?.message);
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
                Cell: ({ value, row }) =>
                    row.original.status === 'Chờ xác nhận' && (
                        <Select
                            style={{ width: '100%' }}
                            value={value || 'default'}
                            disabled={
                                !!row.original.technicianId ||
                                row.original.status !== 'Chờ xác nhận'
                            }
                            onChange={async (newTechnicianId) => {
                                const appointId = row.original.id;
                                const techId = newTechnicianId;

                                try {
                                    // Gọi API tạo bảo dưỡng
                                    const resMain = await createMaintenance(token, {
                                        techId,
                                        appointId
                                    });
                                    if (resMain.status === true) {
                                        toast.success(resMain.message);

                                        // Cập nhật thông tin kỹ thuật viên
                                        const resTech = await getUserById(
                                            token,
                                            resMain.data.user_id
                                        );

                                        // Cập nhật danh sách lịch hẹn
                                        setDataAppointment((prevAppointments) =>
                                            prevAppointments.map((appointment) =>
                                                appointment.id === appointId
                                                    ? {
                                                          ...appointment,
                                                          technicianId: techId,
                                                          technician_name: `${resTech.data.lastName} ${resTech.data.firstName}`,
                                                          status: 'Đã xác nhận'
                                                      }
                                                    : appointment
                                            )
                                        );

                                        // Cập nhật trạng thái lịch hẹn
                                        dispatch(
                                            appointmentActions.updateAppoimentStatus({
                                                token,
                                                appointmentId: appointId,
                                                status: 'Đã xác nhận'
                                            })
                                        );
                                    } else {
                                        toast.error(resMain.message);
                                    }
                                } catch (error) {
                                    toast.error(
                                        'Không thể tạo đơn bảo dưỡng hoặc cập nhật trạng thái!'
                                    );
                                }
                            }}
                        >
                            <Select.Option key='default' value='default' disabled>
                                Chọn kỹ thuật viên
                            </Select.Option>

                            {technicians.map((technician) => (
                                <Select.Option key={technician.id} value={technician.id}>
                                    {technician.lastName} {technician.firstName}
                                </Select.Option>
                            ))}
                        </Select>
                    )
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
        [token, technicians, appointments.data.length]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredAppointments
        },
        useGlobalFilter
    );

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
            {appointments.loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
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

export default Appointment;
