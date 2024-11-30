import { useState } from 'react';
import { Badge, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { formatVND } from '~/utils/formatVND';
import { WrapperMenuScroll } from '../style';
import PartModalDetail from '~/pages/Home/SectionPart/partModalDetail';

/* eslint-disable react/prop-types */
const SectionParts = ({ parts }) => {
    // Hiển thị modal chi tiết
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectPart, setSelectPart] = useState(null);

    const showModal = (part) => {
        setSelectPart(part);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='block sm:px-28 lg:p-0'>
            <WrapperMenuScroll className='pr-10'>
                <div className='grid grid-cols-1 gap-7 px-28 lg:p-0 lg:pb-10 sm:grid-cols-2 lg:grid-cols-4'>
                    {parts.map((part) => {
                        return part.sale ? (
                            <Badge.Ribbon text={`Giảm giá ${part.sale}%`} color='red' key={part.id}>
                                <div className='flex flex-col gap-4 px-3 py-5 bg-white border rounded-lg shadow-md w-96'>
                                    <div className='flex items-center justify-center'>
                                        <img
                                            loading='lazy'
                                            src={
                                                part.part_image
                                                    ? `/minio${part.part_image}`
                                                    : 'https://placehold.co/384x384'
                                            }
                                            alt='#Ảnh linh kiện'
                                            className='rounded-lg size-80'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-5 px-5 my-5'>
                                        <span className='overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap'>
                                            {part.part_name}
                                        </span>
                                        <span className='text-2xl'>
                                            <span className='font-bold'>Giá: </span>
                                            <span className='font-[400]'>
                                                {formatVND(part.part_price * (1 - part.sale / 100))}{' '}
                                                VNĐ
                                            </span>
                                        </span>
                                        <span className='text-2xl'>
                                            <span className='font-bold'>Tuổi thọ trung bình: </span>
                                            <span className='font-[400]'>
                                                {part.average_life} tháng
                                            </span>
                                        </span>
                                    </div>
                                    <div className='flex justify-center w-full'>
                                        <Button
                                            type='light'
                                            className='h-14 text-2xl bg-[#295255] hover:bg-[#577877] text-white'
                                            style={{
                                                fontFamily: 'LXGW WenKai TC',
                                                cursive: 'LXGW Wen'
                                            }}
                                            onClick={() => showModal(part)}
                                        >
                                            <EyeOutlined /> Chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                        ) : (
                            <div
                                className='flex flex-col gap-4 px-3 py-5 border rounded-lg shadow-xl w-96'
                                key={part.id}
                            >
                                <div className='flex items-center justify-center'>
                                    <img
                                        loading='lazy'
                                        src={
                                            part.part_image
                                                ? `/minio${part.part_image}`
                                                : 'https://placehold.co/384x384'
                                        }
                                        alt='#Ảnh linh kiện'
                                        className='rounded-lg size-80'
                                    />
                                </div>
                                <div className='flex flex-col gap-5 px-5 my-5'>
                                    <span className='overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap'>
                                        {part.part_name}
                                    </span>
                                    <span className='text-2xl'>
                                        <span className='font-bold'>Giá: </span>
                                        <span>{formatVND(part.part_price)} VNĐ</span>
                                    </span>
                                    <span className='text-2xl'>
                                        <span className='font-bold'>Tuổi thọ trung bình: </span>
                                        <span>{part.average_life} tháng</span>
                                    </span>
                                </div>
                                <div className='flex justify-center w-full'>
                                    <Button
                                        type='light'
                                        className='h-14 text-2xl bg-[#295255] hover:bg-[#577877] text-white'
                                        style={{
                                            fontFamily: 'LXGW WenKai TC',
                                            cursive: 'LXGW Wen'
                                        }}
                                        onClick={() => showModal(part)}
                                    >
                                        <EyeOutlined /> Chi tiết
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </WrapperMenuScroll>
            <PartModalDetail
                isVisible={isModalVisible}
                onCancel={handleCancel}
                selectPart={selectPart}
            />
        </div>
    );
};

export default SectionParts;
