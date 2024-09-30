import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChartOutlined,
    ProductOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    ContainerOutlined,
    SettingOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { WrapperMenuScroll } from './style';
import { getToken, setToken } from '~/utils/token';

const SectionMenu = () => {
    const overview = [
        {
            id: 1,
            name: 'Dashboard',
            path: 'dashboard',
            element: <LineChartOutlined />
        }
    ];
    const application = [
        {
            id: 2,
            name: 'Parts',
            path: 'part',
            element: <ProductOutlined />
        },
        {
            id: 3,
            name: 'Categories',
            path: 'category',
            element: <MenuUnfoldOutlined />
        },
        {
            id: 4,
            name: 'Manufacturers',
            path: 'manufacturer',
            element: <HomeOutlined />
        },
        {
            id: 5,
            name: 'Warehouses',
            path: 'warehouse',
            element: <ContainerOutlined />
        },
        {
            id: 6,
            name: 'Maintenances',
            path: 'maintenance',
            element: <SettingOutlined />
        }
    ];
    const account = [
        {
            id: 7,
            name: 'Customers',
            path: 'customer',
            element: <TeamOutlined />
        },
        {
            id: 8,
            name: 'Staffs',
            path: 'staff',
            element: <TeamOutlined />
        },
        {
            id: 9,
            name: 'Technicians',
            path: 'technician',
            element: <TeamOutlined />
        },
        {
            id: 10,
            name: 'Cashiers',
            path: 'cashier',
            element: <TeamOutlined />
        },
        {
            id: 11,
            name: 'Supervisors',
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
                            Overview
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
                            Application
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
                            Account
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
