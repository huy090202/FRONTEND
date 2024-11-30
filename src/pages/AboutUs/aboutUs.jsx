import { useEffect } from 'react';
import SectionIntro from './SectionIntro/sectionIntro';
import SectionOriginalStyle from './SectionOriginalStyle/sectionOriginalStyle';
import SectionBanner from './SectionBanner/sectionBanner';
import './aboutUsResponsive.scss';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='py-12 pt-8 space-y-8 lg:px-28 sm:px-28 md:space-y-12'>
            <div className='py-5 mt-12 text-4xl font-bold text-center uppercase'>
                Về Huy Motorbike
            </div>
            <SectionIntro />
            <SectionOriginalStyle />
            <SectionBanner />
        </div>
    );
};

export default AboutUs;
