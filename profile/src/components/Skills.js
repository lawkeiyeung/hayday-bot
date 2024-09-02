import React, { useState, useEffect, useRef } from 'react';
import './components_css/Skills.css';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('game');
  const [fadeClass, setFadeClass] = useState('fade-in');
  const categories = ['programming', 'web', 'game'];
  let index = categories.indexOf(selectedCategory);

  const iconSets = {
    programming: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    ],
    web: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    ],
    game: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
    ],
  };

  const intervalIdRef = useRef(null); // useRef to store interval ID

  const handleButtonClick = (category) => {
    if (category !== selectedCategory) {
      setFadeClass('fade-out');
      index = categories.indexOf(category);
      setTimeout(() => {
        setSelectedCategory(category);
        setFadeClass('fade-in');
        resetInterval(); // Reset the interval on button click
      }, 500); // Match the duration with the CSS transition
    }
  };

  useEffect(() => {
    startInterval(); // Start interval on component mount

    return () => clearInterval(intervalIdRef.current); // Cleanup interval on component unmount
  }, [selectedCategory]); // Depend on selectedCategory

  const startInterval = () => {
    intervalIdRef.current = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        index = (index + 1) % categories.length;
        setSelectedCategory(categories[index]);
        setFadeClass('fade-in');
      }, 500); // Wait for the fade-out transition to complete
    }, 4000); // Change every 4 seconds
  };

  const resetInterval = () => {
    clearInterval(intervalIdRef.current); // Clear the current interval
    startInterval(); // Start a new interval
  };

  return (
    <section id="skills" className="section">
      <h2 className="skill-header">My Top Skills</h2>

      <div className="px-80">
        <div className="flex my-8 justify-center xl:justify-between">
          <button
            className={`skillsbtn skillsbtn-muted ${selectedCategory === 'programming' ? 'skillsbtn-active' : ''}`}
            onClick={() => handleButtonClick('programming')}
          >
            Programming Languages
          </button>
          <button
            className={`skillsbtn skillsbtn-muted ${selectedCategory === 'web' ? 'skillsbtn-active' : ''}`}
            onClick={() => handleButtonClick('web')}
          >
            Web Development
          </button>
          <button
            className={`skillsbtn skillsbtn-muted ${selectedCategory === 'game' ? 'skillsbtn-active' : ''}`}
            onClick={() => handleButtonClick('game')}
          >
            Game Development
          </button>
        </div>

        <div className="maccontainer z-20" style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="image-wrapper">
            <img src="./macframe.png" alt="Macbook Frame" />
          </div>

          <div className={`content ${fadeClass}`}>
            <div className="set">
              {iconSets[selectedCategory].map((src, index) => (
                <img key={index} src={src} alt="" loading="lazy" className="icon icon-card" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
