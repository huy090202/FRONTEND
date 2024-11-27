import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    GoogleOutlined,
    TwitterOutlined
} from '@ant-design/icons';
import logo from '~/assets/images/logo.png';

export default function Footer() {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <Fragment>
            <hr />
            <footer className='w-full py-5 bg-white h-fit px-28'>
                <Row className='flex items-end py-5'>
                    <Col span={6} style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}>
                        <div
                            className='flex items-end gap-2 text-[#6699BB] cursor-pointer'
                            onClick={handleOnClick}
                        >
                            <img src={logo} alt='Logo' />
                            <span className='mb-2 text-3xl font-bold uppercase'>HuyMotorbike</span>
                        </div>
                    </Col>
                    <Col
                        span={6}
                        className='mb-2 text-2xl font-bold'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        Về chúng tôi
                    </Col>
                    <Col
                        span={6}
                        className='mb-2 text-2xl font-bold'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        Thời gian mở cửa
                    </Col>
                    <Col
                        span={6}
                        className='mb-2 text-2xl font-bold'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        Liên hệ
                    </Col>
                </Row>
                <Row className='flex items-start py-5'>
                    <Col
                        span={6}
                        className='flex flex-col gap-5 text-2xl'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        <Link to='/' className='hover:text-[#6699BB]'>
                            Trang chủ
                        </Link>
                        <Link to='/' className='hover:text-[#6699BB]'>
                            Phụ tùng
                        </Link>
                        <Link to='/create-appointment' className='hover:text-[#6699BB]'>
                            Đăng ký bảo dưỡng
                        </Link>
                    </Col>
                    <Col
                        span={6}
                        className='flex flex-col gap-5 text-2xl'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        <Link to='/about-us' className='hover:text-[#6699BB]'>
                            Về chúng tôi
                        </Link>
                    </Col>
                    <Col
                        span={6}
                        className='flex flex-col gap-5 text-2xl'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        <span>Từ thứ 2 đến chủ nhật</span>
                        <span>8:00 - 17:00</span>
                    </Col>
                    <Col
                        span={6}
                        className='flex flex-col gap-5 text-2xl'
                        style={{ fontFamily: 'LXGW WenKai TC', cursive: 'LXGW Wen' }}
                    >
                        <span>Hẻm 66A, An Hòa, Ninh Kiều, Cần Thơ</span>
                        <span>0788793092</span>
                    </Col>
                </Row>
                <div className='flex items-start justify-between pt-5 text-2xl'>
                    <div className='flex flex-col gap-2 font-bold'>
                        <span>Copyright ©2024 All rights reserved</span>
                        <span className='text-[#6699BB] uppercase'>HuyMotorbike</span>
                    </div>
                    <div className='flex gap-5'>
                        <div
                            className='py-3 text-3xl text-blue-900 rounded-lg px-7 hover:text-blue-500'
                            style={{ border: '1px solid #6699BB' }}
                        >
                            <Link to='https://facebook.com'>
                                <FacebookOutlined />
                            </Link>
                        </div>
                        <div
                            className='py-3 text-3xl text-red-900 rounded-lg px-7 hover:text-red-500'
                            style={{ border: '1px solid #6699BB' }}
                        >
                            <Link to='https://instagram.com'>
                                <InstagramOutlined />
                            </Link>
                        </div>
                        <div
                            className='py-3 text-3xl text-red-500 rounded-lg px-7 hover:text-red-900'
                            style={{ border: '1px solid #6699BB' }}
                        >
                            <Link to='https://google.com'>
                                <GoogleOutlined />
                            </Link>
                        </div>
                        <div
                            className='py-3 text-3xl text-blue-400 rounded-lg px-7 hover:text-blue-900'
                            style={{ border: '1px solid #6699BB' }}
                        >
                            <Link to='https://twitter.com'>
                                <TwitterOutlined />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}
