/* eslint-disable react/prop-types */
import { Carousel, Image } from 'antd';
import { FormatDate } from '~/utils/formatDate';

const SectionMotor = ({ motor }) => {
    return (
        <div className='flex items-center gap-10'>
            <div className='w-[55%]'>
                <Carousel arrows infinite={false}>
                    {motor && motor.motorImages && motor.motorImages.length > 0 ? (
                        motor.motorImages.map((image, index) => (
                            <Image
                                key={index}
                                src={`/minio${image.image_url}`}
                                alt='motor'
                                className='object-cover'
                                height={161}
                            />
                        ))
                    ) : (
                        <Image
                            src='https://placehold.co/300x170'
                            alt='motor'
                            className='object-cover'
                        />
                    )}
                </Carousel>
            </div>
            <div className='flex items-center justify-between bg-[#e5eaf3] w-full py-16 px-10 rounded-lg'>
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
