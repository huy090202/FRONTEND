import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Spin } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getToken } from '~/utils/token';
import { userActions } from '~/redux/slice/userSlice';

const ChangePassword = () => {
    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const clearHandler = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleChangePassword = async () => {
        setLoading(true);
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới không khớp!');
            setLoading(false);
            return;
        }

        const token = getToken('auth').auth.access_token;
        setTimeout(() => {
            dispatch(userActions.changePassword({ token, data: { currentPassword, newPassword } }));
            clearHandler();
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
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Mật khẩu hiện tại:</label>
                        <Input.Password
                            autoFocus
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Nhập vào mật khẩu hiện tại'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Mật khẩu mới:</label>
                        <Input.Password
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Nhập vào mật khẩu mới'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        <label className='text-2xl w-[30%] text-left'>Xác nhận mật khẩu:</label>
                        <Input.Password
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Xác nhận mật khẩu mới'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={
                            !currentPassword.length ||
                            !newPassword.length ||
                            !confirmPassword.length
                        }
                        type='primary'
                        className='mt-5 text-2xl font-bold h-14'
                        onClick={handleChangePassword}
                    >
                        Lưu thay đổi
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};
export default ChangePassword;
