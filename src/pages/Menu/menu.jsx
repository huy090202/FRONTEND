import { useEffect } from 'react';

const Menu = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return <div>Menu</div>;
};

export default Menu;
