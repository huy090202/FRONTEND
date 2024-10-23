/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { deleteMotor, getAllMotors } from '~/services/motorService';
import MotorModalDetail from './motorModalDetail';
import MotorModalCreate from './motorModalCreate';

const Motor = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [dataMotor, setDataMotor] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const [selectedMotor, setSelectedMotor] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);

    const showModal = (motor) => {
        setSelectedMotor(motor);
        setIsModalVisible(true);
    };

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalCreate(false);
    };

    const handleDeleteMotor = async (motorId) => {
        try {
            await deleteMotor(token, motorId);
            toast.success('Xe đã được xóa thành công');
            setDataMotor(dataMotor.filter((motor) => motor.id !== motorId));
        } catch (error) {
            toast.error('Xóa xe thất bại');
        }
    };

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
                Header: 'Biển số xe',
                accessor: 'license_plate'
            },
            {
                Header: 'Số khung',
                accessor: 'chassis_number'
            },
            {
                Header: 'Số máy',
                accessor: 'engine_number'
            },
            {
                Header: 'Loại',
                accessor: 'motor_type'
            },
            {
                Header: 'Model',
                accessor: 'motor_model'
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <div className='flex items-center justify-center w-full'>
                        <DeleteOutlined
                            className='text-3xl'
                            onClick={() => handleDeleteMotor(row.original.id)}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const motorsResponse = await getAllMotors(token, { page, limit });
                const motors = motorsResponse.data;

                setDataMotor(motors);
                setTotalPages(Math.ceil(motorsResponse.total / limit));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token, page]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: dataMotor
    });

    const handleGoToFirstPage = () => {
        setPage(1);
    };

    const handleGoToLastPage = () => {
        setPage(totalPages);
    };

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;
    return (
        <div className='border-2 border-[#eeefee] rounded-2xl bg-white shadow-xl my-5'>
            <div className='flex items-center justify-end my-5 mr-8'>
                <button
                    className='px-6 py-5 mr-2 text-xl text-white bg-green-600 rounded-2xl'
                    onClick={showModalCreate}
                >
                    <PlusOutlined /> {'  '}
                    Thêm
                </button>
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
                <MotorModalDetail
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    motor={selectedMotor}
                />
                <MotorModalCreate isVisible={isModalCreate} onCancel={handleCancel} />
            </div>
        </div>
    );
};

export default Motor;
