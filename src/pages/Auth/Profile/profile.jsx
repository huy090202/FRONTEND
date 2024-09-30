import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select, Spin } from 'antd';
import {
    FormOutlined,
    UserOutlined,
    PhoneOutlined,
    HomeOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { getToken } from '~/utils/token';
import defaultAvatar from '~/assets/images/avatar.jpg';
import { userActions } from '~/redux/slice/userSlice';

const { Option } = Select;

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(user.avatar || null);
    const [gender, setGender] = useState(user.gender || 'OTHER');
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [address, setAddress] = useState(user.address || '');

    const [loading, setLoading] = useState(false);

    let urlImage = import.meta.env.URL_IMAGE || 'http://localhost:3001/images/';

    useEffect(() => {
        const authData = getToken('auth');
        const userData = getToken('user');
        if (userData) {
            setAvatar(userData.avatar || null);
            setGender(userData.gender || 'OTHER');
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setEmail(userData.email || '');
            setPhoneNumber(userData.phoneNumber || '');
            setAddress(userData.address || '');
        }

        if (authData && authData.auth && authData.auth.access_token) {
            dispatch(userActions.getUser(authData.auth.access_token));
        }
    }, [dispatch]);

    useEffect(() => {
        setAvatar(user.avatar || null);
        setGender(user.gender || 'OTHER');
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
                        src={avatar.includes('blob') ? avatar : `${urlImage}${avatar}`}
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
                    <Spin size='large' />
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
                                Upload Avatar
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>First name:</label>
                        <Input
                            size='large'
                            prefix={<UserOutlined />}
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Last name:</label>
                        <Input
                            size='large'
                            prefix={<UserOutlined />}
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Email:</label>
                        <Input
                            size='large'
                            disabled
                            prefix={<FormOutlined />}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Phone number:</label>
                        <Input
                            size='large'
                            prefix={<PhoneOutlined />}
                            placeholder='Phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Address:</label>
                        <Input
                            size='large'
                            prefix={<HomeOutlined />}
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Gender:</label>
                        <Select
                            size='large'
                            value={gender}
                            onChange={(value) => setGender(value)}
                            className='flex-2 w-[100%]'
                        >
                            <Option value='MALE'>MALE</Option>
                            <Option value='FEMALE'>FEMALE</Option>
                            <Option value='OTHER'>OTHER</Option>
                        </Select>
                    </div>
                    <Button
                        type='primary'
                        className='mt-5 text-2xl font-bold h-14'
                        onClick={handleUpdateProfile}
                    >
                        Save changes
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};

export default Profile;
