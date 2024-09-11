import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormOutlined, SafetyOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import backGround from '~/assets/images/bg-auth.jpg';
import { authActions } from '~/redux/slice/authSlice';
import { getAuth } from '~/utils/token';
import { getUser } from '~/services/userService';
import { WrapperButton } from '~/pages/Auth/style';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearHandler = () => {
        setEmail('');
        setPassword('');
    };

    const loginHandler = async () => {
        if (!email || !password) {
            toast.error('All fields are required');
            return;
        }
        dispatch(authActions.loginUser({ email, password }));
        clearHandler();

        setLoading(true);
        setTimeout(async () => {
            const dataAuth = getAuth('auth');
            const token = dataAuth?.auth?.access_token;
            try {
                const user = await getUser(token);
                const checkRole = user?.data?.role;
                if (
                    checkRole === 'ADMIN' ||
                    checkRole === 'STAFF' ||
                    checkRole === 'TECH' ||
                    checkRole === 'CASHIER'
                ) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } catch (e) {
                toast.error(e.message);
            }
            setLoading(false);
        }, 3000);
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
                    <div className='text-4xl font-bold text-center uppercase'>Login</div>
                    <div className='flex flex-col'>
                        <label className='text-2xl'>Email:</label>
                        <Input
                            autoFocus
                            size='large'
                            prefix={<FormOutlined />}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <label className='text-2xl'>Password:</label>
                            <Input.Password
                                size='large'
                                prefix={<SafetyOutlined />}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <WrapperButton
                        disabled={!email.length || !password.length}
                        type='light'
                        className='h-16 text-2xl font-bold'
                        onClick={() => loginHandler()}
                    >
                        Login
                    </WrapperButton>
                    <span className='text-center'>
                        {`Don't have an account?`}{' '}
                        <Link to={'/register'} className='text-blue-300 underline'>
                            Register
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default Login;
