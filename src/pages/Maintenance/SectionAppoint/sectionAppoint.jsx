/* eslint-disable react/prop-types */
import { Carousel, Image } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormatDate } from '~/utils/formatDate';

const SectionAppoint = ({ appoint }) => {
    return (
        <div className='flex items-center gap-10'>
            <div className='flex flex-col gap-5 bg-[#e5eaf3] w-full p-10 rounded-lg'>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Thời gian bắt đầu:</span>
                    <span className='text-2xl'>{appoint.appointment_time}</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Ngày đặt lịch:</span>
                    <span className='text-2xl'>{FormatDate(appoint.appointment_date)}</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>Ngày bắt đầu:</span>
                    <span className='text-2xl'>{FormatDate(appoint.created_at)}</span>
                </p>
                <p className='flex flex-col items-start gap-2'>
                    <span className='text-2xl font-bold'>Ghi chú:</span>
                    <TextArea
                        rows={4}
                        value={appoint.content}
                        style={{
                            backgroundColor: 'transparent',
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    />
                </p>
            </div>
            <div className='w-[55%]'>
                <Carousel arrows infinite={false}>
                    {appoint && appoint.images && appoint.images.length > 0 ? (
                        appoint.images.map((image, index) => (
                            <div className='text-center' key={index}>
                                <Image
                                    src={`/minio${image.image_url}`}
                                    alt='appoint'
                                    className='object-cover'
                                    height={265}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='text-center'>
                            <Image
                                src='https://placehold.co/400x450'
                                alt='appoint'
                                className='object-cover'
                                height={265}
                            />
                        </div>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default SectionAppoint;
