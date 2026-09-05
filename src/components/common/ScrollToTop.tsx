import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        const scrollableElements = document.querySelectorAll('*');
        scrollableElements.forEach((el) => {
            if (el.scrollTop > 0) {
                el.scrollTop = 0;
            }
        });
    }, [pathname]);

    return null;
}