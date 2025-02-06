import { useNavigate } from 'react-router-dom';
import { SmileOutlined, CheckCircleOutlined, AuditOutlined, ToolOutlined } from '@ant-design/icons';
import banner from '~/assets/images/banner.jpg';
import { WrapperButton } from '~/pages/Auth/style';

const SectionBanner = () => {
    const navigate = useNavigate();

    const goToAppointment = () => {
        navigate('/create-appointment');
    };

    return (
        <div
            className='w-full h-[600px] bg-center bg-no-repeat bg-cover'
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div
                className='w-full h-[600px] bg-[rgba(0,0,0,0.35)] text-white flex items-center justify-between'
                style={{ backdropFilter: 'blur(6px) saturate(180%)' }}
            >
                <div className='flex flex-col gap-10 ml-28'>
                    <h1 className='text-5xl uppercase'>Dịch vụ bảo dưỡng xe máy số 1 Việt Nam</h1>
                    <p className='text-3xl'>Được phục vụ bạn là niềm hạnh phúc của chúng tôi</p>
                    <WrapperButton
                        type='light'
                        className='h-16 text-2xl font-bold w-96'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                        onClick={goToAppointment}
                    >
                        Đăng ký bảo dưỡng ngay
                    </WrapperButton>
                </div>
                <ul
                    className='flex flex-col gap-10 p-20 text-3xl text-black bg-[rgba(255,255,255,0.6)] rounded-s-2xl'
                    style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
                >
                    <li className='flex items-center gap-5'>
                        <SmileOutlined />
                        Thái độ tích cực
                    </li>
                    <li className='flex items-center gap-5'>
                        <CheckCircleOutlined />
                        Phụ tùng hiện đại
                    </li>
                    <li className='flex items-center gap-5'>
                        <AuditOutlined />
                        Quản lý mọi thông tin xe
                    </li>
                    <li className='flex items-center gap-5'>
                        <ToolOutlined />
                        Dễ dàng đăng ký bảo dưỡng
                    </li>
                    <li className='flex items-center gap-5'>
                        <ToolOutlined />
                        Dễ dàng theo dõi bảo dưỡng
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SectionBanner;
