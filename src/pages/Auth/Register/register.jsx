import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserOutlined, MailOutlined, PhoneOutlined, KeyOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import backGround from '~/assets/images/bg-auth.jpg';
import { register } from '~/services/userService';
import { WrapperButton } from '~/pages/Auth/style';
import Loading from '~/components/shared/Loading/loading';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const clearHandler = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    };

    const registerHandler = async () => {
        try {
            setLoading(true);
            if (!firstName || !lastName || !email || !phoneNumber || !password) {
                toast.error('Các trường bắt buộc không được để trống');
                return;
            }

            const response = await register({ firstName, lastName, email, phoneNumber, password });
            clearHandler();

            if (response.status === true) {
                toast.success(response.message);

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <div
                className='flex items-center justify-center min-h-screen mx-auto my-0 bg-center bg-no-repeat bg-cover'
                style={{ backgroundImage: `url(${backGround})` }}
            >
                <form
                    className='w-1/3 h-fit bg-[rgba(0,0,0,0.57)] text-white rounded-xl flex flex-col justify-center py-32 px-10 gap-10'
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <div className='text-4xl font-bold text-center uppercase'>
                        Đăng ký tài khoản
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label className='text-2xl'>Tên:</label>
                            <Input
                                autoFocus
                                size='large'
                                prefix={<UserOutlined />}
                                placeholder='Nhập vào tên của bạn'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='flex items-center gap-2 rounded-lg'
                            />
                        </div>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label className='text-2xl'>Họ:</label>
                            <Input
                                size='large'
                                prefix={<UserOutlined />}
                                placeholder='Nhập vào họ của bạn'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='flex items-center gap-2 rounded-lg'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-2xl'>Email:</label>
                        <Input
                            size='large'
                            prefix={<MailOutlined />}
                            placeholder='Nhập vào email của bạn'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-2xl'>Số điện thoại:</label>
                        <Input
                            size='large'
                            prefix={<PhoneOutlined />}
                            placeholder='Nhập vào số điện thoại của bạn'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-2xl'>Mật khẩu:</label>
                        <Input.Password
                            size='large'
                            prefix={<KeyOutlined />}
                            placeholder='Nhập vào mật khẩu của bạn'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='flex items-center gap-2 rounded-lg'
                        />
                    </div>
                    <WrapperButton
                        disabled={
                            !firstName.length ||
                            !lastName.length ||
                            !email.length ||
                            !phoneNumber.length ||
                            !password.length
                        }
                        type='light'
                        className='h-16 text-2xl font-bold'
                        onClick={() => registerHandler()}
                    >
                        Đăng ký
                    </WrapperButton>
                    <span className='text-center'>
                        Bạn đã có tài khoản?{' '}
                        <Link to={'/login'} className='text-blue-300 underline'>
                            Đăng nhập ngay
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default Register;
