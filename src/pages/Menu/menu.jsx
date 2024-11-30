import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SectionCarts from './SectionCarts/sectionCarts';
import SectionParts from './SectionPartsList/sectionParts';
import { allCategoriesPublic } from '~/services/categoryService';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { partsByCategoryPublic } from '~/services/partService';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [partsData, setPartsData] = useState([]);

    // Lấy tất cả danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await allCategoriesPublic();
            if (data.status === true) {
                setCategories(data.data);

                if (data.data.length > 0) {
                    setSelectedCategory(data.data[0].id);
                }
                return;
            }
            toast.error(data.message);
        };
        fetchCategories();
    }, []);

    // Lấy phụ tùng theo danh mục
    useEffect(() => {
        const fetchPartsByCategory = async () => {
            if (!selectedCategory) return;

            setPartsData([]);

            const data = await partsByCategoryPublic(selectedCategory);
            if (data.status === true) {
                setPartsData(data.data);
                return;
            }
            toast.error(data.message);
        };
        fetchPartsByCategory();
    }, [selectedCategory]);

    // Cuộn lên đầu trang khi chuyển qua trang khác
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Cài đặt slider
    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    };

    return (
        <div className='pt-12 pb-5'>
            {/* Màn hình lớn */}
            <div className='hidden w-full min-h-screen lg:flex px-28'>
                <div className='w-[75%] flex flex-col'>
                    <Slider {...sliderSettings} className='flex items-center gap-10'>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <div
                                    className={`py-4 mr-2 text-2xl font-bold text-center cursor-pointer ${
                                        selectedCategory === category.id
                                            ? 'bg-[#f1f1f1] text-black border-b-4 border-[#6699BB]'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <hr className='my-2' />
                    <SectionParts parts={partsData} />
                </div>
                <div className='w-[25%] pt-10 px-5'>
                    <SectionCarts />
                </div>
            </div>

            {/* Màn hình nhỏ */}
            <div className='block lg:hidden'>
                <Slider {...sliderSettings} className='mb-5 px-28'>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <div
                                className={`py-4 text-2xl font-bold rounded-lg cursor-pointer ${
                                    selectedCategory === category.id
                                        ? 'bg-[#f1f1f1] text-black'
                                        : ''
                                }`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </div>
                        </div>
                    ))}
                </Slider>
                <SectionParts parts={partsData} />
            </div>
        </div>
    );
};

export default Menu;
