import imageBanner from '~/assets/images/AboutUs/sectionBanner.png';

const SectionBanner = () => {
    return (
        <div className='flex items-center justify-center'>
            <img
                loading='lazy'
                className='object-fill w-full h-[400px]'
                src={imageBanner}
                alt='#Banner'
            />
        </div>
    );
};

export default SectionBanner;
