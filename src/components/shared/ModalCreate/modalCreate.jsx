/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { UserOutlined, FormOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createStaff } from '~/services/userService';
import { getToken } from '~/utils/token';

const { Option } = Select;

const ModalCreate = ({ isVisible, onCancel }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Nhân viên');

    const clearHandler = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    };

    const createHandler = async () => {
        try {
            if (!firstName || !lastName || !email || !phoneNumber || !password || !role) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const token = getToken('auth').auth.access_token;

            const response = await createStaff(token, {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role
            });

            if (response.status === true) {
                toast.success(response.message);
                clearHandler();
                onCancel();
            } else {
                toast.error(response.message || 'Tạo nhân viên thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
        >
            <div className='mb-10 text-4xl font-semibold'>Tạo nhân viên mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên nhân viên:</label>
                    <Input
                        autoFocus
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Nhập vào tên nhân viên'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Họ nhân viên:</label>
                    <Input
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Nhập vào họ nhân viên'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Email:</label>
                    <Input
                        size='large'
                        prefix={<FormOutlined />}
                        placeholder='Nhập vào email của nhân viên'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Mật khẩu:</label>
                    <Input.Password
                        size='large'
                        prefix={<SafetyOutlined />}
                        placeholder='Nhập vào mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                    <Input
                        size='large'
                        prefix={<PhoneOutlined />}
                        placeholder='Nhập vào số điện thoại của nhân viên'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl w-[30%] text-left font-bold'>Vai trò:</label>
                    <Select
                        size='large'
                        value={role}
                        onChange={(value) => setRole(value)}
                        className='flex-2 w-[100%]'
                        style={{
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    >
                        <Option value='Nhân viên'>Nhân viên</Option>
                        <Option value='Kỹ thuật viên'>Kỹ thuật viên</Option>
                        <Option value='Thu ngân'>Thu ngân</Option>
                        <Option value='Quản trị viên'>Quản trị</Option>
                    </Select>
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={
                            !firstName.length ||
                            !lastName.length ||
                            !email.length ||
                            !phoneNumber.length ||
                            !password.length ||
                            !role.length
                        }
                        type='primary'
                        className='h-16 text-2xl text-right'
                        style={{
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalCreate;
