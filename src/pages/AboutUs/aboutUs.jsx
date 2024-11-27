import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return <div>AboutUs</div>;
};

export default AboutUs;
