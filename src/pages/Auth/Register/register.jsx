import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserOutlined, FormOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import backGround from '~/assets/images/bg-auth.jpg';
import { register } from '~/services/userService';
import { WrapperButton } from '~/pages/Auth/style';

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
                toast.error('All fields are required');
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
                toast.error(response.message || 'Registration failed');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Spin size='large' />
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
                    <div className='text-4xl font-bold text-center uppercase'>Register</div>
                    <div className='flex items-center justify-between gap-5'>
                        <div className='flex flex-col flex-1'>
                            <label className='text-2xl'>First name:</label>
                            <Input
                                autoFocus
                                size='large'
                                prefix={<UserOutlined />}
                                placeholder='Enter your first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label className='text-2xl'>Last name:</label>
                            <Input
                                size='large'
                                prefix={<UserOutlined />}
                                placeholder='Enter your last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl'>Email:</label>
                        <Input
                            size='large'
                            prefix={<FormOutlined />}
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl'>Phone number:</label>
                        <Input
                            size='large'
                            prefix={<PhoneOutlined />}
                            placeholder='Enter your phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl'>Password:</label>
                        <Input.Password
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        Register
                    </WrapperButton>
                    <span className='text-center'>
                        Already have an account?{' '}
                        <Link to={'/login'} className='text-blue-300 underline'>
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default Register;
