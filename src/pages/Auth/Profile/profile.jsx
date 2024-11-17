import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select } from 'antd';
import {
    MailOutlined,
    UserOutlined,
    PhoneOutlined,
    HomeOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { getToken } from '~/utils/token';
import defaultAvatar from '~/assets/images/avatar.jpg';
import { userActions } from '~/redux/slice/userSlice';
import Loading from '~/components/shared/Loading/loading';

const { Option } = Select;

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(user.avatar || null);
    const [gender, setGender] = useState(user.gender || 'Khác');
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [address, setAddress] = useState(user.address || '');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAvatar(user.avatar || null);
        setGender(user.gender || 'Khác');
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
        setAddress(user.address || '');
    }, [user]);

    const handleUploadFilesImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedAvatar = URL.createObjectURL(file);
            setAvatar(uploadedAvatar);
        }
    };

    const handleReviewImage = () => {
        if (avatar) {
            return (
                <div>
                    <img
                        src={avatar.includes('blob') ? avatar : `/minio${avatar}`}
                        className='object-cover rounded-full size-60'
                        alt='User Avatar'
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <img
                        src={defaultAvatar}
                        className='object-cover rounded-full size-60'
                        alt='Default Avatar'
                    />
                </div>
            );
        }
    };

    const handleUpdateProfile = () => {
        const formData = new FormData();

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            formData.append('avatar', fileInput.files[0]);
        }

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('gender', gender);
        formData.append('address', address);

        const token = getToken('auth').auth.access_token;
        setLoading(true);
        setTimeout(() => {
            dispatch(userActions.updateUser({ formData, token }));
            setLoading(false);
        }, 1000);
    };

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div className='w-[60%] my-5 text-center border-2 border-[#eeefee] rounded-2xl p-5 bg-white shadow-xl'>
                <form className='flex flex-col justify-center gap-5 p-5'>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center w-full gap-5 my-5'>
                            {handleReviewImage()}
                        </div>
                        <div className='relative w-60'>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleUploadFilesImage}
                                className='absolute inset-0 h-full opacity-0 cursor-pointer w-60'
                            />
                            <div className='flex items-center justify-center px-4 py-2 font-semibold text-white transition-all bg-blue-500 rounded-md shadow-md cursor-pointer hover:bg-blue-600'>
                                <PictureOutlined className='mr-2' />
                                Chọn ảnh đại diện
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Tên:</label>
                        <Input
                            size='large'
                            prefix={<UserOutlined />}
                            placeholder='Tên của bạn'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Họ:</label>
                        <Input
                            size='large'
                            prefix={<UserOutlined />}
                            placeholder='Họ của bạn'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Email:</label>
                        <Input
                            size='large'
                            disabled
                            prefix={<MailOutlined />}
                            placeholder='Email của bạn'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Số điện thoại:</label>
                        <Input
                            size='large'
                            prefix={<PhoneOutlined />}
                            placeholder='Số điện thoại'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Địa chỉ:</label>
                        <Input
                            size='large'
                            prefix={<HomeOutlined />}
                            placeholder='Địa chỉ của bạn'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Giới tính:</label>
                        <Select
                            size='large'
                            value={gender}
                            onChange={(value) => setGender(value)}
                            className='flex-2 w-[100%]'
                        >
                            <Option value='Nam'>Nam</Option>
                            <Option value='Nữ'>Nữ</Option>
                            <Option value='Khác'>Khác</Option>
                        </Select>
                    </div>
                    <Button
                        type='primary'
                        className='mt-5 text-2xl font-bold h-14'
                        onClick={handleUpdateProfile}
                    >
                        Lưu những thay đổi
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};

export default Profile;
