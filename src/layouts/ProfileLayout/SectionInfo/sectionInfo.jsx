import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'antd';
import { MailOutlined, PhoneOutlined, MoreOutlined } from '@ant-design/icons';
import backGround from '~/assets/images/bg-auth.jpg';
import defaultAvatar from '~/assets/images/avatar.jpg';
import { removeToken } from '~/utils/token';

const SectionInfo = () => {
    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const goToHomeHandler = () => {
        navigate('/');
        removeToken('activeProfileId');
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <div className='w-full h-fit border-2 border-[#eeefee] rounded-2xl px-3 pt-2'>
            <div
                className='h-[160px] w-full rounded-xl bg-center bg-no-repeat bg-cover opacity-90 relative'
                style={{ backgroundImage: `url(${backGround})` }}
            >
                <img
                    src={user.avatar ? `/minio${user.avatar}` : defaultAvatar}
                    className='absolute -bottom-7 size-60 rounded-full left-10 border-2 border-[#e2e3e2]'
                />
            </div>
            <div className='flex items-center justify-between px-10'>
                <div className=''>
                    <div className='mt-12 text-4xl font-bold'>
                        {user.firstName + ' ' + user.lastName}
                    </div>
                    <div className='flex items-center gap-10 mt-5 mb-2 text-2xl text-gray-500'>
                        <span className='flex gap-3'>
                            <MailOutlined />
                            {user.email}
                        </span>
                        <span className='flex gap-3'>
                            <PhoneOutlined />
                            {user.phoneNumber}
                        </span>
                    </div>
                </div>
                <Popover
                    content={
                        <span
                            className='my-2 text-2xl text-red-500 cursor-pointer'
                            onClick={goToHomeHandler}
                            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                        >
                            Về trang chủ
                        </span>
                    }
                    trigger='click'
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <div className='border-2 border-[#e2e3e2] rounded-xl p-1 cursor-pointer'>
                        <MoreOutlined className='text-5xl' />
                    </div>
                </Popover>
            </div>
        </div>
    );
};

export default SectionInfo;
