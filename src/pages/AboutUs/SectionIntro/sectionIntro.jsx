import imageIntro1 from '~/assets/images/AboutUs/sectionIntro1.png';
import imageIntro2 from '~/assets/images/AboutUs/sectionIntro2.png';
import imageIntro3 from '~/assets/images/AboutUs/sectionIntro3.png';
import imageContentRightBackground from '~/assets/images/bg-auth.jpg';

const SectionIntro = () => {
    return (
        <div className='relative mb-5 section-intro-container'>
            <div className='flex gap-4 intro-left'>
                <div className='flex flex-col gap-4'>
                    <img
                        loading='lazy'
                        className='object-cover shadow-md intro-image-1 rounded-xl'
                        src={imageIntro1}
                        alt='#Intro1'
                    />

                    <img
                        loading='lazy'
                        className='object-fill shadow-md intro-image-2 rounded-xl'
                        src={imageIntro2}
                        alt='#Intro2'
                    />
                </div>

                <img
                    loading='lazy'
                    className='object-cover shadow-md intro-image-3 rounded-xl'
                    src={imageIntro3}
                    alt='#Intro3'
                />
            </div>

            <div
                className='absolute px-16 text-center bg-center bg-no-repeat bg-cover py-44 intro-right md:top-24 md:right-0 drop-shadow-2xl'
                style={{ backgroundImage: `url(${imageContentRightBackground})` }}
            >
                <div className='text-[#6699BB] text-4xl font-bold'>
                    Dịch vụ bảo dưỡng số 1 Việt Nam
                </div>

                <div className='py-10 text-2xl font-bold text-white intro-content'>
                    Huy Motorbike là địa chỉ tin cậy cho dịch vụ bảo dưỡng xe máy tại Việt Nam. Với
                    đội ngũ kỹ thuật viên chuyên nghiệp, chúng tôi cam kết sẽ mang lại cho bạn những
                    dịch vụ tốt nhất.
                </div>

                <button className='text-xl font-bold text-gray-900 border border-solid border-black rounded-lg bg-white cursor-pointer mt-5 px-5 py-2.5'>
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default SectionIntro;
