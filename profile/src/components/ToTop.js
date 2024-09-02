import React from 'react';
import './components_css/ToTop.css';

const ToTop = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <i class="scroll-up" id="scroll-up" onClick={scrollToAbout}>
            <img
                src="/up-arrow.gif"
                class="socicon up-arrow"
                alt="scroll-up"
            />
        </i>
    );
};

export default ToTop;
