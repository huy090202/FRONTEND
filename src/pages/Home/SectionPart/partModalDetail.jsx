/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Button, Image, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { formatVND } from '~/utils/formatVND';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '~/redux/slice/cartSlice';
import { toast } from 'react-toastify';

const PartModalDetail = ({ isVisible, onCancel, selectPart }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [partName, setPartName] = useState('');
    const [partPrice, setPartPrice] = useState('');
    const [partSale, setPartSale] = useState('');
    const [partAverageLife, setPartAverageLife] = useState('');
    const [partDescription, setPartDescription] = useState('');
    const [partImage, setPartImage] = useState('');
    const [partStock, setPartStock] = useState('');

    const partData = useMemo(() => selectPart, [selectPart]);

    useEffect(() => {
        if (partData) {
            setPartName(partData.part_name);
            setPartPrice(partData.part_price);
            setPartSale(partData.sale);
            setPartAverageLife(partData.average_life);
            setPartDescription(partData.description);
            setPartImage(partData.part_image);
            setPartStock(partData.stocks[0].quantity);
        }
    }, [partData]);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.warning('Bạn cần đăng nhập để có thể thêm phụ tùng vào giỏ hàng');
            return;
        }

        if (partStock <= 0) {
            toast.warning('Linh kiện tạm thời đã hết hàng');
            return;
        }

        dispatch(cartActions.addToCart({ part: partData }));
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
            style={{ fontFamily: 'LXGW WenKai TC' }}
        >
            <div className='py-10'>
                <div className='w-full mb-10 text-4xl font-bold text-center text-[#6699BB] uppercase'>
                    Thêm vào giỏ hàng
                </div>
                <div className='flex gap-5'>
                    <div className='flex-1'>
                        <Image
                            loading='lazy'
                            src={partImage ? `/minio${partImage}` : 'https://placehold.co/420x420'}
                            alt='#Ảnh linh kiện'
                        />
                    </div>
                    <div className='flex-1 bg-[#f9fafb] flex flex-col gap-8 p-5'>
                        <span className='text-4xl font-bold'>{partName}</span>
                        <div className='flex flex-col gap-2'>
                            <span className='text-2xl'>
                                <span className='font-bold'>Giá: </span>
                                {partSale > 0 ? (
                                    <>
                                        <span className='mr-3'>
                                            {formatVND(partPrice * (1 - partSale / 100))}
                                        </span>
                                        <span className='mr-3 text-xl text-gray-500 line-through'>
                                            {formatVND(partPrice)}
                                        </span>
                                    </>
                                ) : (
                                    <span className='mr-3'>{formatVND(partPrice)}</span>
                                )}
                                VNĐ
                            </span>
                            <span className='text-2xl'>
                                <span className='font-bold'>Tuổi thọ trung bình: </span>
                                <span>{partAverageLife} tháng</span>
                            </span>
                            <span className='flex gap-3 text-2xl'>
                                <span className='font-bold'>Tình trạng: </span>
                                <span>
                                    {partStock > 0 ? (
                                        <span className='flex items-center gap-2 text-green-500'>
                                            <CheckOutlined />
                                            Còn hàng
                                        </span>
                                    ) : (
                                        <span className='flex items-center gap-2 text-red-500'>
                                            <CloseOutlined />
                                            Linh kiện tạm thời đã hết hàng
                                        </span>
                                    )}
                                </span>
                            </span>
                        </div>
                        <span className='text-2xl'>
                            <span className='font-bold'>Mô tả: </span>
                            <br />
                            <span className='block text-justify'>{partDescription}</span>
                        </span>
                        <Button
                            type='light'
                            className='h-16 w-full text-2xl text-right bg-[#295255] hover:bg-[#577877] text-white uppercase cursor-pointer'
                            style={{
                                fontFamily: 'LXGW WenKai TC',
                                cursive: 'LXGW Wen'
                            }}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCartOutlined />
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PartModalDetail;
