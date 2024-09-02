import React, { useState, useEffect, useRef } from 'react';
import './components_css/Home.css';

const Home = () => {
  const [flipped, setFlipped] = useState(false);
  const [initialFlipDone, setInitialFlipDone] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    window.open('https://www.linkedin.com/in/kei-yeung-law/', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !initialFlipDone) {
          setFlipped(true);
          setTimeout(() => {
            setFlipped(false);
            //setInitialFlipDone(true); // Mark the initial flip as done
          }, 450); // Adjust the delay to match the flip-back timing
        }
      },
      { threshold: 0.9 } // Trigger when 50% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [initialFlipDone]);

  return (
    <div>
      <section id="home" className="section">
        <div>
          <section className="container">
            <div className="md:flex md:-mx-8 py-8 items-center md:flex-row-normal">
              <div className="w-full md:w-5/12 md:mx-8 mb-6" ref={containerRef}>
                <div className="rounded-lg flip-container" style={{ display: 'block', overflow: 'hidden', position: 'relative', width: '500px', height: '500px' }}>
                  <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
                    <div className="flip-card-front p-4">
                      <img style={{ display: 'block', width: '100%', height: '100%' }} src="./icon_circle.png" role="presentation" alt="Icon" />
                    </div>
                    <div className="flip-card-back p-4">
                      <img style={{ display: 'block', width: '100%', height: '100%' }} src="./Linkedin-logo.png" role="presentation" alt="LinkedIn" onClick={handleClick} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-7/12 md:mx-8">
                <h2></h2>
                <div>
                  <p className="text-left">I’m a passionate Computer Science graduate specializing in AI, data management, and web development.</p>
                  <p className="text-left">I graduated from the University of Adelaide in 2024, achieving a GPA of 6.25 out of 7. During my studies, I was honored with University of Adelaide Global Citizens Scholarship recognizing my academic excellence and commitment to the field.</p>
                  <p className="text-left">My professional background includes hands-on experience in data management, along with significant involvement in web development projects.</p>
                  <p className="text-left">Explore my projects and experiences to see how I can contribute to your next endeavor!!</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Home;
