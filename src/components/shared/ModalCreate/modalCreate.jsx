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
    const [role, setRole] = useState('STAFF');

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
                toast.error('All fields are required');
                return;
            }

            console.log('input', firstName, lastName, email, phoneNumber, password, role);

            const token = getToken('auth').auth.access_token;

            const response = await createStaff(token, {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role
            });
            clearHandler();

            if (response.status === true) {
                toast.success(response.message);
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            className='p-10'
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
            <div className='mb-10 text-3xl font-semibold'>Create</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>First name:</label>
                    <Input
                        autoFocus
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Enter your first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Last name:</label>
                    <Input
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Enter your last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Email:</label>
                    <Input
                        size='large'
                        prefix={<FormOutlined />}
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Password:</label>
                    <Input.Password
                        size='large'
                        prefix={<SafetyOutlined />}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Phone number:</label>
                    <Input
                        size='large'
                        prefix={<PhoneOutlined />}
                        placeholder='Enter your phone number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl w-[30%] text-left'>Role:</label>
                    <Select
                        size='large'
                        value={role}
                        onChange={(value) => setRole(value)}
                        className='flex-2 w-[100%]'
                    >
                        <Option value='STAFF'>STAFF</Option>
                        <Option value='TECH'>TECH</Option>
                        <Option value='CASHIER'>CASHIER</Option>
                        <Option value='ADMIN'>ADMIN</Option>
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
                    >
                        Create
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalCreate;
