/* eslint-disable react/prop-types */
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Pagination, Select } from 'antd';
import Switch from '~/components/shared/Switch/switch';
import CategoryModalDetail from './categoryModalDetail';
import CategoryModalCreate from './categoryModalCreate';
import { selectFilteredCategories } from '~/redux/selector/categorySelector';
import { categoryActions } from '~/redux/slice/categorySlice';
import Loading from '~/components/shared/Loading/loading';

const Categories = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const { categoriesAdmin, loading, page, limit, total } = useSelector((state) => state.category);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredCategories = useSelector((state) =>
        selectFilteredCategories(state, filterInput, activeFilter)
    );

    const showModal = (category) => {
        setSelectedCategory(category);
        setIsModalVisible(true);
    };

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalCreate(false);
    };

    const dispatch = useDispatch();

    const handlePageChange = (page, limit) => {
        dispatch(categoryActions.fetchCategoriesAdmin({ token, page, limit }));
    };

    const handleDeleteCategory = useCallback(
        (id) => {
            if (!token || !id) {
                return;
            }
            dispatch(categoryActions.deleteCategory({ token, id }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Tên danh mục',
                accessor: 'name',
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
                Header: 'Mô tả',
                accessor: 'description'
            },
            {
                Header: 'Trạng thái',
                accessor: 'active',
                Cell: ({ row }) => (
                    <Switch
                        checked={row.original.active}
                        onChange={async (checked) => {
                            if (!token) {
                                toast.error('Token không tồn tại');
                                return;
                            }
                            try {
                                dispatch(
                                    categoryActions.updateCategoryStatus({
                                        token,
                                        id: row.original.id,
                                        active: checked
                                    })
                                );
                                const updatedData = data.map((category) =>
                                    category.id === row.original.id
                                        ? { ...category, active: checked }
                                        : category
                                );
                                setData(updatedData);
                            } catch (error) {
                                toast.error(error.response?.data?.message);
                            }
                        }}
                    />
                )
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <div className='flex items-center w-full'>
                        {row.original.active ? null : (
                            <DeleteOutlined
                                className='text-3xl'
                                onClick={() => handleDeleteCategory(row.original.id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        )}
                    </div>
                )
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token, categoriesAdmin.length]
    );

    const fetchData = useCallback(() => {
        if (!token) {
            toast.error('Token không tồn tại');
            return;
        }
        try {
            dispatch(categoryActions.fetchCategoriesAdmin({ token, page, limit }));
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error.message);
            toast.error('Lấy dữ liệu danh mục thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, page, limit, dispatch, categoriesAdmin.length, totalPages]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredCategories
        },
        useGlobalFilter
    );

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

    const handleActiveFilterChange = (value) => {
        setActiveFilter(value);
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
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='flex flex-col w-full'>
                <div className='flex items-center justify-between my-10'>
                    <h1 className='text-4xl font-bold '>Danh sách danh mục</h1>
                    <button
                        className='px-6 py-5 mr-2 text-xl text-white bg-green-600 rounded-2xl'
                        onClick={showModalCreate}
                    >
                        <PlusOutlined /> {'  '}
                        Thêm
                    </button>
                </div>
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
                            onChange={handleActiveFilterChange}
                            style={{ width: 150, height: 50 }}
                            options={[
                                { label: 'Tất cả', value: 'all' },
                                { label: 'Kích hoạt', value: 'true' },
                                { label: 'Không kích hoạt', value: 'false' }
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
                    <CategoryModalDetail
                        isVisible={isModalVisible}
                        onCancel={handleCancel}
                        category={selectedCategory}
                    />

                    <CategoryModalCreate isVisible={isModalCreate} onCancel={handleCancel} />
                </div>
            </div>
        </Fragment>
    );
};

export default Categories;
