/* eslint-disable react/prop-types */
const SectionUser = ({ user }) => {
    return (
        <div className='bg-[#e5eaf3] w-full p-10 rounded-lg'>
            <div className='flex flex-col gap-5'>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Tên khách hàng:</span>
                    <span className='text-2xl'>
                        {user.lastName} {user.firstName}
                    </span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Email:</span>
                    <span className='text-2xl'>{user.email}</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Số điện thoại:</span>
                    <span className='text-2xl'>{user.phoneNumber}</span>
                </p>
            </div>
        </div>
    );
};

export default SectionUser;
