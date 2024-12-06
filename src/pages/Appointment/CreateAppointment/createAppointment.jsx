import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { DatePicker, Button, TimePicker, Image, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { createAppoinment, createAppoinmentImage } from '~/services/appoinmentService';
import { allMotors } from '~/services/motorService';
import { WrapperSelect } from './style';
import { createGuest } from '~/services/userService';
import MotorTempModalCreate from './motorTempModalCreate';
import MotorModalCreate from '~/pages/Motor/motorModalCreate';
import { useNavigate } from 'react-router-dom';
import { motorActions } from '~/redux/slice/motorSlice';
import Loading from '~/components/shared/Loading/loading';

const CreateAppointment = () => {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.auth.auth.access_token);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const motorTemps = useSelector((state) => state.motor.motorTemps);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phoneNumber || '');

    useEffect(() => {
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setEmail(user?.email || '');
        setPhone(user?.phoneNumber || '');
    }, [user]);

    const [appointDate, setAppointDate] = useState('');
    const [appointTime, setAppointTime] = useState('');
    const [appointNote, setAppointNote] = useState('');
    const [checkedNotes, setCheckedNotes] = useState([]);

    const [motorData, setMotorData] = useState([]);
    const [selectedMotor, setSelectedMotor] = useState(null);

    // Xe tạm
    // eslint-disable-next-line no-unused-vars
    const [motorTempData, setMotorTempData] = useState([]);
    const [selectedMotorTemp, setSelectedMotorTemp] = useState();

    useEffect(() => {
        if (motorTemps.length > 0) {
            setSelectedMotorTemp({ value: motorTemps[0].id, label: motorTemps[0].motor_name });
        }
    }, [motorTemps]);

    const [loading, setLoading] = useState(false);
    const [images, setimages] = useState([]);

    // Modal
    const [isModalCreateMotor, setIsModalCreateMotor] = useState(false);

    const showModalCreateMotor = () => {
        setIsModalCreateMotor(true);
    };

    const handleCancelCreate = () => {
        setIsModalCreateMotor(false);
    };

    const [isModalCreate, setIsModalCreate] = useState(false);

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCancel = () => {
        setIsModalCreate(false);
    };

    // Hàm để vô hiệu hóa các giờ không nằm trong khoảng từ 8 đến 17
    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            if (i < 8 || i > 17) {
                // Vô hiệu hóa trước 8 giờ và sau 17 giờ
                hours.push(i);
            }
        }
        return hours;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await allMotors(token);
                const motors = response.data;
                setMotorData(motors);

                if (motors.length > 0) {
                    setSelectedMotor({ value: motors[0].id, label: motors[0].motor_name });
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(motorActions.fetchMotorTemps());
    }, [dispatch]);

    const createAppointmentHandler = async () => {
        try {
            if (!isAuthenticated) {
                setLoading(true);
                if (!firstName || !lastName || !email || !phone || !appointDate || !appointTime) {
                    toast.error('Các bắc buộc trường không được để trống');
                    return;
                }

                // Tạo tài khoản tự động cho người dùng vãng lai
                const newUser = await createGuest({ firstName, lastName, email, phone });

                // Chuyển đổi thời gian sang định dạng HH:mm:ss
                const formattedAppointTime = appointTime
                    ? dayjs(appointTime).format('HH:mm:ss')
                    : null;

                // Tạo lịch hẹn
                const response = await createAppoinment({
                    appointmentDate: appointDate,
                    appointmentTime: formattedAppointTime,
                    notes: appointNote,
                    userId: newUser.data.id
                });

                if (response.status === true) {
                    toast.success(response.message);
                    const appointmentId = response.data.id;
                    if (images.length > 0) {
                        const formData = new FormData();
                        formData.append('appointment_id', appointmentId);
                        images.forEach((image) => {
                            formData.append('image_url', image.file);
                        });

                        // Tạo ảnh lịch hẹn
                        const responseImage = await createAppoinmentImage(formData);
                        if (responseImage.status === false) toast.error(responseImage.message);
                    }

                    setTimeout(() => {
                        toast.success(
                            'Tài khoản đã được tạo tự động và gửi về email của bạn. Vui lòng kiểm tra sau đó đăng nhập để tiếp tục!'
                        );
                        navigate('/login');
                    }, 1000);

                    // Reset form
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setAppointDate('');
                    setAppointTime('');
                    setAppointNote('');
                    setimages([]);
                    if (motorTempData.length > 0) {
                        setSelectedMotorTemp({
                            value: motorData[0].id,
                            label: motorData[0].motor_name
                        });
                    }
                }
            } else {
                setLoading(true);
                if (!appointDate || !appointTime || !selectedMotor) {
                    toast.error('Các bắc buộc trường không được để trống');
                    return;
                }

                // Chuyển đổi thời gian sang định dạng HH:mm:ss
                const formattedAppointTime = appointTime
                    ? dayjs(appointTime).format('HH:mm:ss')
                    : null;

                // Tạo lịch hẹn
                const response = await createAppoinment({
                    appointmentDate: appointDate,
                    appointmentTime: formattedAppointTime,
                    notes: appointNote,
                    motorId: selectedMotor.value,
                    userId: user?.id
                });

                if (response.status === true) {
                    toast.success(response.message);
                    const appointmentId = response.data.id;
                    if (images.length > 0) {
                        const formData = new FormData();
                        formData.append('appointment_id', appointmentId);

                        images.forEach((image) => {
                            formData.append('image_url', image.file);
                        });

                        // Tạo ảnh lịch hẹn
                        const responseImage = await createAppoinmentImage(formData);
                        if (responseImage.status === false) toast.error(responseImage.message);
                    }

                    // Reset form
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setAppointDate('');
                    setAppointTime('');
                    setAppointNote('');
                    setimages([]);
                    if (motorData.length > 0) {
                        setSelectedMotor({
                            value: motorData[0].id,
                            label: motorData[0].motor_name
                        });
                    }
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Đã xảy ra lỗi');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUploadFilesImageAppoint = (e) => {
        const files = Array.from(e.target.files);
        const imagesPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setimages(imagesPreview);
    };

    const handleReviewImageAppoint = () => {
        return images.map((image, index) => (
            <div key={index}>
                <Image src={image.preview} alt={`image-preview-${index}`} className='size-60' />
            </div>
        ));
    };

    const trimmedEmail = email.trim();

    // Dữ liệu mẫu ghi chú
    const notes = [
        {
            id: 1,
            note: 'Xe bị hỏng gương chiếu hậu'
        },
        {
            id: 2,
            note: 'Xe bị hư lọc gió'
        },
        {
            id: 3,
            note: 'Xe bị hư lọc nhớt'
        },
        {
            id: 4,
            note: 'Xe bị hỏng bộ phanh'
        }
    ];

    // Hàm xử lý khi checkbox được chọn hoặc bỏ chọn
    const handleCheckboxChange = (noteId, noteText, isChecked) => {
        setCheckedNotes((prevChecked) => {
            const updatedCheckedNotes = isChecked
                ? [...prevChecked, noteId]
                : prevChecked.filter((id) => id !== noteId);

            // Cập nhật appointNote dựa trên trạng thái của checkbox
            setAppointNote((prevNote) => {
                const notesArray = prevNote.split('\n').filter(Boolean);
                if (isChecked) {
                    return [...notesArray, noteText].join('\n');
                } else {
                    return notesArray.filter((note) => note !== noteText).join('\n');
                }
            });

            return updatedCheckedNotes;
        });
    };

    // Hàm xử lý khi thay đổi nội dung của TextArea
    const handleTextAreaChange = (e) => {
        const newText = e.target.value;
        setAppointNote(newText);

        // Cập nhật trạng thái checkbox dựa trên nội dung hiện tại trong TextArea
        const updatedCheckedNotes = notes
            .filter((item) => newText.includes(item.note))
            .map((item) => item.id);

        setCheckedNotes(updatedCheckedNotes);
    };

    // Kiểm tra checkbox nào cần được bật hoặc tắt
    const isChecked = (id) => checkedNotes.includes(id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Loading />
                </div>
            )}
            <section className='flex items-center justify-center w-full py-12 bg-white h-fit'>
                <div
                    className='w-[60%] shadow-2xl bg-[rgba(0,0,0,0.11)] p-20 rounded-xl
                '
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <h1 className='mb-10 text-4xl font-bold text-center uppercase'>
                        Đăng ký lịch bảo dưỡng
                    </h1>

                    <div className='flex flex-col gap-5'>
                        <div className='flex items-start justify-between gap-10'>
                            <div className='flex flex-col w-full gap-5'>
                                <div className='flex items-center justify-between gap-5'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label className='text-2xl'>
                                            <span className='mr-2 text-red-500'>*</span>
                                            Tên:
                                        </label>
                                        <Input
                                            size='medium'
                                            placeholder='Nhập vào tên của bạn'
                                            style={{
                                                backgroundColor: 'transparent',
                                                fontFamily: 'LXGW WenKai TC',
                                                cursive: 'LXGW Wen'
                                            }}
                                            className='hover:border-[#d6d6d6] focus:border-[#d6d6d6]'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label className='text-2xl'>
                                            <span className='mr-2 text-red-500'>*</span>
                                            Họ:
                                        </label>
                                        <Input
                                            size='medium'
                                            placeholder='Nhập vào họ của bạn'
                                            style={{
                                                backgroundColor: 'transparent',
                                                fontFamily: 'LXGW WenKai TC',
                                                cursive: 'LXGW Wen'
                                            }}
                                            className='hover:border-[#d6d6d6] focus:border-[#d6d6d6]'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-2xl'>
                                        <span className='mr-2 text-red-500'>*</span>
                                        Email:
                                    </label>
                                    <Input
                                        size='medium'
                                        placeholder='Nhập vào email của bạn'
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        className='hover:border-[#d6d6d6] focus:border-[#d6d6d6]'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-2xl'>
                                        <span className='mr-2 text-red-500'>*</span>
                                        Số điện thoại:
                                    </label>
                                    <Input
                                        size='medium'
                                        placeholder='Nhập vào số điện thoại của bạn'
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        className='hover:border-[#d6d6d6] focus:border-[#d6d6d6]'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-2xl'>
                                        <span className='mr-2 text-red-500'>*</span>
                                        Ngày mang xe đến cửa hàng:
                                    </label>
                                    <DatePicker
                                        value={appointDate}
                                        onChange={(date) => setAppointDate(date)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        className='hover:border-[#d6d6d6]'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-2xl'>
                                        <span className='mr-2 text-red-500'>*</span>
                                        Thời gian (vui lòng chọn giờ giữa 8:00 - 17:00):
                                    </label>
                                    <TimePicker
                                        value={appointTime}
                                        onChange={(time) => setAppointTime(time)}
                                        disabledHours={disabledHours}
                                        showNow={false}
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        className='hover:border-[#d6d6d6]'
                                    />
                                </div>
                                {/* Là người dùng đã có tài khoản, đã đăng nhập và đã có xe */}
                                {isAuthenticated && motorData.length > 0 && (
                                    <>
                                        <div className='flex flex-col gap-2'>
                                            <label className='text-2xl'>
                                                <span className='mr-2 text-red-500'>*</span>
                                                Chọn xe của bạn:
                                            </label>
                                            <WrapperSelect
                                                style={{
                                                    fontFamily: 'LXGW WenKai TC',
                                                    cursive: 'LXGW Wen'
                                                }}
                                                labelInValue
                                                value={selectedMotor}
                                                onChange={(e) => setSelectedMotor(e)}
                                                options={
                                                    Array.isArray(motorData)
                                                        ? motorData.map((motor) => ({
                                                              value: motor.id,
                                                              label: motor.motor_name
                                                          }))
                                                        : []
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className='text-2xl'>
                                                <span className='mr-2 text-red-500'>*</span>
                                                Vui lòng điền đầy đủ thông tin trước khi thêm xe:
                                            </label>
                                            <div className='flex items-center mt-2'>
                                                <button
                                                    className='px-6 py-3 text-xl hover:bg-[#6699BB] text-[#6699BB] uppercase hover:text-white rounded-lg cursor-pointer'
                                                    style={{
                                                        border: '1px solid #6699BB'
                                                    }}
                                                    onClick={showModalCreateMotor}
                                                    disabled={email === ''}
                                                >
                                                    <PlusOutlined /> Thêm xe
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* Là người dùng đã có tài khoản, đã đăng nhập nhưng chưa có xe */}
                                {isAuthenticated && motorData.length === 0 && (
                                    <div>
                                        <label className='text-2xl'>
                                            <span className='mr-2 text-red-500'>*</span>
                                            Vui lòng điền đầy đủ thông tin trước khi thêm xe:
                                        </label>
                                        <div className='flex items-center mt-2'>
                                            <button
                                                className='px-6 py-3 text-xl hover:bg-[#6699BB] text-[#6699BB] uppercase hover:text-white rounded-lg cursor-pointer'
                                                style={{
                                                    border: '1px solid #6699BB'
                                                }}
                                                onClick={showModalCreateMotor}
                                                disabled={email === ''}
                                            >
                                                <PlusOutlined /> Thêm xe
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Là người dùng vãng lai nhưng đã thêm xe */}
                                {!isAuthenticated && motorTemps.length > 0 && (
                                    <>
                                        {/* Kiểm tra nếu có xe nào trùng email */}
                                        {trimmedEmail &&
                                        motorTemps.some(
                                            (motorTem) => motorTem.email === trimmedEmail
                                        ) ? (
                                            <>
                                                {/* Hiển thị phần "Chọn xe của bạn" khi email trùng */}
                                                <div className='flex flex-col gap-2'>
                                                    <label className='text-2xl'>
                                                        <span className='mr-2 text-red-500'>*</span>
                                                        Chọn xe của bạn:
                                                    </label>
                                                    <WrapperSelect
                                                        style={{
                                                            fontFamily: 'LXGW WenKai TC',
                                                            cursive: 'LXGW Wen'
                                                        }}
                                                        labelInValue
                                                        value={selectedMotorTemp}
                                                        onChange={(e) => setSelectedMotorTemp(e)}
                                                        options={motorTemps
                                                            .filter(
                                                                (motorTem) =>
                                                                    motorTem.email === trimmedEmail
                                                            ) // Lọc xe theo email
                                                            .map((motor) => ({
                                                                value: motor.id,
                                                                label: motor.motor_name
                                                            }))}
                                                    />
                                                </div>
                                                <div>
                                                    <label className='text-2xl'>
                                                        <span className='mr-2 text-red-500'>*</span>
                                                        Vui lòng điền đầy đủ thông tin trước khi
                                                        thêm xe:
                                                    </label>
                                                    <div className='flex items-center mt-2'>
                                                        <button
                                                            className='px-6 py-3 text-xl hover:bg-[#6699BB] text-[#6699BB] uppercase hover:text-white rounded-lg cursor-pointer'
                                                            style={{
                                                                border: '1px solid #6699BB'
                                                            }}
                                                            onClick={showModalCreate}
                                                            disabled={email === ''}
                                                        >
                                                            <PlusOutlined /> Thêm xe
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <label className='text-2xl'>
                                                    <span className='mr-2 text-red-500'>*</span>
                                                    Vui lòng điền đầy đủ thông tin trước khi thêm
                                                    xe:
                                                </label>
                                                <div className='flex items-center mt-2'>
                                                    <button
                                                        className='px-6 py-3 text-xl hover:bg-[#6699BB] text-[#6699BB] uppercase hover:text-white rounded-lg cursor-pointer'
                                                        style={{
                                                            border: '1px solid #6699BB'
                                                        }}
                                                        onClick={showModalCreate}
                                                        disabled={email === ''}
                                                    >
                                                        <PlusOutlined /> Thêm xe
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {/* Là người dùng vãng lai nhưng chua thêm xe */}
                                {!isAuthenticated && motorTemps.length === 0 && (
                                    <div>
                                        <label className='text-2xl'>
                                            <span className='mr-2 text-red-500'>*</span>
                                            Vui lòng điền đầy đủ thông tin trước khi thêm xe:
                                        </label>
                                        <div className='flex items-center mt-2'>
                                            <button
                                                className='px-6 py-3 text-xl hover:bg-[#6699BB] text-[#6699BB] uppercase hover:text-white rounded-lg cursor-pointer'
                                                style={{
                                                    border: '1px solid #6699BB'
                                                }}
                                                onClick={showModalCreate}
                                                disabled={email === ''}
                                            >
                                                <PlusOutlined /> Thêm xe
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-2xl'>Ghi chú (nếu có):</label>
                            {notes.map((item) => (
                                <ul key={item.id} className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id={item.id}
                                        checked={isChecked(item.id)}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                item.id,
                                                item.note,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label className='text-2xl' htmlFor={item.id}>
                                        {item.note}
                                    </label>
                                </ul>
                            ))}
                            <TextArea
                                rows={4}
                                value={appointNote}
                                onChange={handleTextAreaChange}
                                placeholder='Nhập vào ghi chú của bạn'
                                style={{
                                    backgroundColor: 'transparent',
                                    fontFamily: 'LXGW WenKai TC',
                                    cursive: 'LXGW Wen'
                                }}
                                className='hover:border-[#d6d6d6]'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='text-2xl'>Chọn ảnh (nếu có):</span>
                            <div className='flex'>
                                <label htmlFor='file' className='text-5xl cursor-pointer'>
                                    <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-60'>
                                        <PlusOutlined />
                                    </div>
                                </label>
                                <div className='flex items-center justify-center w-full gap-5'>
                                    {handleReviewImageAppoint()}
                                </div>
                                <input
                                    id='file'
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    onChange={handleUploadFilesImageAppoint}
                                    hidden
                                />
                            </div>
                        </div>
                    </div>

                    <div className='text-right'>
                        <Button
                            className='w-[15%] h-16 hover:bg-[#6699BB] border-[#6699BB] text-[#6699BB] uppercase hover:text-white'
                            type='light'
                            onClick={createAppointmentHandler}
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </section>
            <MotorTempModalCreate
                isVisible={isModalCreate}
                onCancel={handleCancel}
                isEmail={email}
                isPhone={phone}
            />

            <MotorModalCreate isVisible={isModalCreateMotor} onCancel={handleCancelCreate} />
        </Fragment>
    );
};

export default CreateAppointment;
