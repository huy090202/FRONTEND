/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, DatePicker, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { motorActions } from '~/redux/slice/motorSlice';

const { Option } = Select;

const MotorTempModalCreate = ({ isVisible, onCancel, isEmail, isPhone }) => {
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState(isEmail ? isEmail : '');
    const [phone, setPhone] = useState(isPhone ? isPhone : '');
    const [motorName, setmotorName] = useState('');
    const [motorType, setmotorType] = useState('Xe số');
    const [motorPlate, setmotorPlate] = useState('');
    const [motorEngine, setmotorEngine] = useState('');
    const [motorChassis, setmotorChassis] = useState('');
    const [motorModel, setmotorModel] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [motorColor, setmotorColor] = useState('');

    const clearHandler = () => {
        setEmail('');
        setPhone('');
        setmotorName('');
        setmotorType('');
        setmotorPlate('');
        setmotorEngine('');
        setmotorChassis('');
        setmotorModel('');
        setCreatedAt('');
        setmotorColor('');
    };

    const createHandler = async () => {
        if (
            !motorName ||
            !motorType ||
            !motorPlate ||
            !motorEngine ||
            !motorChassis ||
            !motorModel ||
            !createdAt ||
            !motorColor
        ) {
            toast.error('Các trường bắc buộc không được để trống');
            return;
        }

        dispatch(
            motorActions.addMotorTemp({
                email: isEmail,
                phone: isPhone,
                motorName,
                motorType,
                motorPlate,
                motorEngine,
                motorChassis,
                motorModel,
                createdAt,
                motorColor
            })
        );

        clearHandler();
        onCancel();
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
            width={900}
        >
            <div className='mb-10 text-4xl font-semibold text-center'>Tạo xe mới</div>
            <div className='flex items-center justify-between gap-10'>
                <div className='flex flex-col items-start justify-center w-full gap-5'>
                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input
                            autoFocus
                            size='medium'
                            placeholder='Nhập vào email'
                            value={isEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Số điện thoại:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào số điện thoại'
                            value={isPhone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào tên xe'
                            value={motorName}
                            onChange={(e) => setmotorName(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold text-left'>Loại xe:</label>
                        <Select
                            size='medium'
                            value={motorType}
                            onChange={(value) => setmotorType(value)}
                            className='flex-2 w-[100%]'
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            <Option value='Xe số'>Xe số</Option>
                            <Option value='Xe ga'>Xe tay ga</Option>
                            <Option value='Xe côn'>Xe tay côn</Option>
                            <Option value='Xe phân khối lớn'>Xe phân khối lớn</Option>
                            <Option value='Xe khác'>Xe khác</Option>
                        </Select>
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Ngày đăng ký xe:</label>
                        <DatePicker value={createdAt} onChange={(date) => setCreatedAt(date)} />
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center w-full gap-5'>
                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Biển số xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào biển số xe'
                            value={motorPlate}
                            onChange={(e) => setmotorPlate(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Số khung xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào số khung xe'
                            value={motorChassis}
                            onChange={(e) => setmotorChassis(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Số máy xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào số máy xe'
                            value={motorEngine}
                            onChange={(e) => setmotorEngine(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Model xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào model xe'
                            value={motorModel}
                            onChange={(e) => setmotorModel(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2 text-gray-800'>
                        <label className='text-2xl font-bold'>Màu xe:</label>
                        <Input
                            size='medium'
                            placeholder='Nhập vào màu xe'
                            value={motorColor}
                            onChange={(e) => setmotorColor(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full text-right'>
                <Button
                    onClick={createHandler}
                    type='primary'
                    className='h-16 mt-10 text-2xl text-right'
                    style={{
                        fontFamily: 'LXGW WenKai TC',
                        cursive: 'LXGW Wen'
                    }}
                >
                    Xác nhận
                </Button>
            </div>
        </Modal>
    );
};

export default MotorTempModalCreate;
