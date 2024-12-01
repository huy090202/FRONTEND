import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChartOutlined,
    ProductOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    ContainerOutlined,
    SettingOutlined,
    TeamOutlined,
    InboxOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { WrapperMenuScroll } from './style';
import { getToken, setToken } from '~/utils/token';

const SectionMenu = () => {
    const overview = [
        {
            id: 1,
            name: 'Thống kê',
            path: 'dashboard',
            element: <LineChartOutlined />
        }
    ];
    const application = [
        {
            id: 2,
            name: 'Danh sách linh kiện',
            path: 'part',
            element: <ProductOutlined />
        },
        {
            id: 3,
            name: 'Danh mục linh kiện',
            path: 'category',
            element: <MenuUnfoldOutlined />
        },
        {
            id: 4,
            name: 'Nhà sản xuất',
            path: 'manufacturer',
            element: <HomeOutlined />
        },
        {
            id: 5,
            name: 'Kho hàng',
            path: 'warehouse',
            element: <ContainerOutlined />
        },
        {
            id: 6,
            name: 'Đơn hàng',
            path: 'order',
            element: <ShoppingOutlined />
        },
        {
            id: 7,
            name: 'Danh sách lịch hẹn',
            path: 'appointment',
            element: <InboxOutlined />
        },
        {
            id: 8,
            name: 'Danh sách bảo dưỡng',
            path: 'maintenance',
            element: <SettingOutlined />
        }
    ];
    const account = [
        {
            id: 9,
            name: 'Khách hàng',
            path: 'customer',
            element: <TeamOutlined />
        },
        {
            id: 10,
            name: 'Nhân viên cửa hàng',
            path: 'staff',
            element: <TeamOutlined />
        },
        {
            id: 11,
            name: 'Kỹ thuật viên',
            path: 'technician',
            element: <TeamOutlined />
        },
        {
            id: 12,
            name: 'Thu ngân',
            path: 'cashier',
            element: <TeamOutlined />
        },
        {
            id: 13,
            name: 'Quản lý',
            path: 'supervisor',
            element: <TeamOutlined />
        }
    ];

    const [activeId, setActiveId] = useState(() => {
        return getToken('activeId') ? Number(getToken('activeId')) : 1;
    });
    const navigate = useNavigate();

    const handleClick = (id, path) => {
        setActiveId(id);
        setToken('activeId', id);
        navigate(path);
    };

    return (
        <WrapperMenuScroll className='w-full pr-5'>
            <div className='flex flex-col items-start justify-center'>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 pt-10 pb-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Tổng quan
                        </span>
                        {overview.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center hover:bg-[#eaedf0] rounded-2xl text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#dcf1ff] text-[#2f76a5] hover:bg-[#dcf1ff]'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 py-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Danh mục quản lý
                        </span>
                        {application.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center rounded-2xl hover:bg-[#eaedf0] text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#dcf1ff] text-[#2f76a5] hover:bg-[#dcf1ff]'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 py-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Tài khoản
                        </span>
                        {account.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center rounded-2xl hover:bg-[#eaedf0] text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#dcf1ff] text-[#2f76a5] hover:bg-[#dcf1ff]'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WrapperMenuScroll>
    );
};

export default SectionMenu;
