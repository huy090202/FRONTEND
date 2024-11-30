import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Badge, Carousel } from 'antd';
import { allTechs } from '~/services/userService';

const SectionTech = () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        const fetchTechs = async () => {
            try {
                const res = await allTechs();
                if (res.status === true) {
                    setTechs(res.data);
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };

        fetchTechs();
    }, []);

    return (
        <div className='mb-10 px-28'>
            <div className='flex flex-col gap-10'>
                <h1 className='text-3xl font-bold text-center uppercase'>
                    Kỹ thuật viên của hệ thống
                </h1>
                <Carousel
                    arrows
                    infinite={true}
                    dots={false}
                    slidesToShow={4}
                    slidesToScroll={1}
                    autoplay
                    style={{
                        marginInline: '0 10px',
                        fontFamily: 'LXGW WenKai TC',
                        cursive: 'LXGW Wen'
                    }}
                >
                    {techs &&
                        techs.length > 0 &&
                        techs.map((tech, index) => (
                            <div className='px-5' key={index}>
                                <div className='flex flex-col items-center justify-center p-4 text-center border rounded-lg'>
                                    {tech.avatar ? (
                                        <Badge
                                            dot
                                            offset={[-5, 6]}
                                            style={{
                                                backgroundColor:
                                                    tech.work_status === 'Đang rảnh'
                                                        ? 'green'
                                                        : 'red'
                                            }}
                                        >
                                            <img
                                                loading='lazy'
                                                src={`/minio${tech.avatar}`}
                                                alt='#Avatar'
                                                className='object-cover rounded-full w-28 h-28'
                                            />
                                        </Badge>
                                    ) : (
                                        <Badge
                                            dot
                                            offset={[-5, 6]}
                                            style={{
                                                backgroundColor:
                                                    tech.work_status === 'Đang rảnh'
                                                        ? 'green'
                                                        : 'red'
                                            }}
                                        >
                                            <img
                                                loading='lazy'
                                                src='https://placehold.co/400x400'
                                                alt='#Avatar'
                                                className='object-cover rounded-full w-28 h-28'
                                            />
                                        </Badge>
                                    )}
                                    <div className='flex flex-col gap-3 mt-4'>
                                        <h1 className='text-2xl font-bold'>
                                            {tech.lastName} {tech.firstName}
                                        </h1>
                                        <p className='text-2xl'>
                                            <span className='font-bold'>Email: </span>
                                            {tech.email}
                                        </p>
                                        <div className='text-2xl'>
                                            <span className='font-bold'>Số điện thoại: </span>
                                            {tech.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default SectionTech;
