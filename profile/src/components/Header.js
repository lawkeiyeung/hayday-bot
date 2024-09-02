import React, { useState, useEffect } from 'react';
import './components_css/Header.css';
import { adjustScrollPosition } from './scrollAdjustment';
import { applyTheme, getInitialTheme, toggleTheme as themeToggle } from './theme'; // Import functions

const Header = () => {
  const [theme, setTheme] = useState(getInitialTheme()); // Get the initial theme

  useEffect(() => {
    adjustScrollPosition();
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    themeToggle(); // Update the theme in local storage
  };

  return (
    <header className="fixed-header">
      <div className="hidden xl:block container">
        <nav className="items-center relative flex justify-between my-2">
          <a href="#home" className="flex items-center no-underline hover:no-underline">
            <div>
              <img src="/icon_circle_crop.png" alt="Icon" />
            </div>
            <span className="ml-4 font-semibold">Kei Yeung Law</span>
          </a>
          <div>
            <a href="#education" className="btn hover:bg-gray-300 tracking-normal px-6 py-3 mr-2 rounded">Education</a>
            <a href="#experience" className="btn hover:bg-gray-300 tracking-normal px-6 py-3 mr-2 rounded">Experience</a>
            <a href="#skills" className="btn hover:bg-gray-300 tracking-normal px-6 py-3 mr-2 rounded">Skills</a>
            <a href="#contact" className="btn hover:bg-gray-300 tracking-normal px-6 py-3 mr-2 rounded">Contact</a>
          </div>

          <div className="absolute top-0 bottom-0 right-0 flex -mr-12 -mt-1">
            <button
              type="button"
              onClick={handleThemeToggle} // Handle theme toggle
              className="bulb group self-center flex items-center justify-center p-3 rounded hover:bg-neutral-muted text-inverted-muted hover:text-highlight focus:text-highlight transition duration-200"
            >
              <span className="sr-only">Toggle Theme</span>
              <img src={theme === 'light' ?  "/bulb.png":"/bulb_on.png" } alt="Icon" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
