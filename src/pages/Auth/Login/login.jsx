import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import backGround from '~/assets/images/bg-auth.jpg';
import { authActions } from '~/redux/slice/authSlice';
import { getToken } from '~/utils/token';
import { getUser } from '~/services/userService';
import { WrapperButton } from '~/pages/Auth/style';
import Loading from '~/components/shared/Loading/loading';

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
            toast.error('Các trường không được để trống');
            return;
        }
        dispatch(authActions.loginUser({ email, password }));
        clearHandler();

        setLoading(true);
        setTimeout(async () => {
            const dataAuth = getToken('auth');
            const token = dataAuth?.auth?.access_token;
            try {
                const user = await getUser(token);
                const checkRole = user?.data?.role;
                if (
                    checkRole === 'Quản trị viên' ||
                    checkRole === 'Nhân viên' ||
                    checkRole === 'Kỹ thuật viên' ||
                    checkRole === 'Thu ngân'
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
                    <div className='text-4xl font-bold text-center uppercase'>Đăng nhập</div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-2xl'>Tài khoản:</label>
                        <Input
                            autoFocus
                            size='large'
                            prefix={<MailOutlined />}
                            placeholder='Nhập vào email của bạn'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        disabled={!email.length || !password.length}
                        type='light'
                        className='h-16 text-2xl font-bold'
                        onClick={() => loginHandler()}
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        Đăng nhập
                    </WrapperButton>
                    <span className='text-center'>
                        {`Bạn chưa có tài khoản?`}{' '}
                        <Link to={'/register'} className='text-blue-300 underline'>
                            Đăng ký ngay
                        </Link>
                    </span>
                    <span className='text-center'>
                        <Link to={'/'} className='text-blue-300 underline'>
                            Về trang chủ
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default Login;
