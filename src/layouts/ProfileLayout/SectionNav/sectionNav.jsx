import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from '~/utils/token';

const SectionNav = () => {
    const nav = [
        {
            id: 1,
            name: 'Cài đặt tài khoản',
            path: 'profile'
        },
        {
            id: 2,
            name: 'Đổi mật khẩu',
            path: 'change-password'
        },
        {
            id: 3,
            name: 'Lịch sử bảo dưỡng',
            path: 'history'
        },
        {
            id: 4,
            name: 'Xe của bạn',
            path: 'motor'
        },
        {
            id: 5,
            name: 'Lịch sử đặt lịch',
            path: 'history-appointment'
        }
    ];

    const [activeProfileId, setActiveProfileId] = useState(() => {
        return getToken('activeProfileId') ? Number(getToken('activeProfileId')) : 1;
    });
    const navigate = useNavigate();

    const handleClick = (id, path) => {
        setActiveProfileId(id);
        setToken('activeProfileId', id);
        navigate(path);
    };

    return (
        <div className='w-full h-fit border-2 border-[#eeefee] rounded-2xl my-5'>
            <div className='flex items-center justify-start gap-5 px-10 py-4'>
                {nav.map((item) => (
                    <div
                        key={item.id}
                        className={`p-5 rounded-xl text-2xl font-bold cursor-pointer ${
                            activeProfileId === item.id ? 'bg-[#f1f1f1] text-black' : 'text-black'
                        }`}
                        onClick={() => handleClick(item.id, item.path)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionNav;
