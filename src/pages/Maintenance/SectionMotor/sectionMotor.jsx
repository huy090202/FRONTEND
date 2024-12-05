/* eslint-disable react/prop-types */
import { Image } from 'antd';
import Slider from 'react-slick';
import { FormatDate } from '~/utils/formatDate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SectionMotor = ({ motor }) => {
    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500
    };

    return (
        <div className='flex items-center gap-10'>
            <div className='w-[35%]'>
                <Slider {...sliderSettings} className='flex items-center gap-10'>
                    {motor && motor.motorImages && motor.motorImages.length > 0 ? (
                        motor.motorImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={`/minio${image.image_url}`}
                                    alt='motor'
                                    className='object-cover w-[287px] h-[161px]'
                                />
                            </div>
                        ))
                    ) : (
                        <Image
                            src='https://placehold.co/287x161'
                            alt='motor'
                            className='object-cover w-full'
                        />
                    )}
                </Slider>
            </div>
            <div className='w-[65%] flex items-center justify-between bg-[#e5eaf3] py-16 px-10 rounded-lg'>
                <div className='flex flex-col gap-5'>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Màu xe:</span>
                        <span className='text-2xl'>{motor.motor_color}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Model xe:</span>
                        <span className='text-2xl'>{motor.motor_model}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Ngày đăng ký:</span>
                        <span className='text-2xl'>{FormatDate(motor.created_at)}</span>
                    </p>
                </div>
                <div className='flex flex-col gap-5'>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Biển số xe:</span>
                        <span className='text-2xl'>{motor.license_plate}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Số khung xe:</span>
                        <span className='text-2xl'>{motor.chassis_number}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className='text-2xl font-bold'>Số máy xe:</span>
                        <span className='text-2xl'>{motor.engine_number} Km</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionMotor;
