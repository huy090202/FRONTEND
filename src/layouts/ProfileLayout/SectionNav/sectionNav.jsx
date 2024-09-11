import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionNav = () => {
    const nav = [
        {
            id: 1,
            name: 'Profile',
            path: 'profile'
        },
        {
            id: 2,
            name: 'Change password',
            path: 'change-password'
        },
        {
            id: 3,
            name: 'Maintenance history',
            path: 'history'
        }
    ];

    const [activeId, setActiveId] = useState(1);
    const navigate = useNavigate();

    const handleClick = (id, path) => {
        setActiveId(id);
        navigate(path);
    };

    return (
        <div className='w-full h-fit border-2 border-[#eeefee] rounded-2xl my-5'>
            <div className='flex items-center justify-start gap-5 px-10 py-4'>
                {nav.map((item) => (
                    <div
                        key={item.id}
                        className={`p-5 rounded-xl text-2xl font-bold cursor-pointer ${
                            activeId === item.id ? 'bg-[#f1f1f1] text-black' : 'text-black'
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
