import React, { useEffect, useRef, useState } from 'react';
import './components_css/Education.css';

const Education = () => {
  const [visibleBoxes, setVisibleBoxes] = useState([false, false, false]);
  const boxRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleBoxes((prev) =>
          prev.map((visible, index) =>
            boxRefs.current[index] && boxRefs.current[index].contains(entry.target)
              ? entry.isIntersecting
              : visible
          )
        );
      },
      { threshold: 0.3 }
    );

    boxRefs.current.forEach((box) => {
      if (box) observer.observe(box);
    });

    return () => {
      boxRefs.current.forEach((box) => {
        if (box) observer.unobserve(box);
      });
    };
  }, []);

  return (
    <section id="education" className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Education</h2>

        <div className="flex flex-col lg:flex-row gap-8 justify-between px-16">
          <div className={`sec bg-white shadow-md rounded-lg p-6 mx-auto w-full text-left box ${visibleBoxes[0] ? 'visible' : ''}`} ref={(el) => (boxRefs.current[0] = el)}>
            <div>
              <h3 className="text-2xl font-bold text-gray-700">University of Adelaide - <span className="text-gray-600">Bachelor of Computer Science</span></h3>
              <p className="text-gray-500 mt-2">Major: Artificial Intelligence</p>
              <p className="text-gray-500 font-bold text-lg">GPA: 6.25 / 7.00</p>
              <p className="text-gray-500">Graduated: July 2024</p>
              <p className="text-gray-500">Scholarship Awarded: University of Adelaide Global Citizens Scholarship</p>
            </div>
            <div className="absolute bottom-0 right-0 p-8">
              <img src="/UoA_logo_col_vert.png" alt="Icon" className="w-40 h-auto" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between px-16">
          <div className={`sec bg-white shadow-md rounded-lg p-6 mx-auto w-full text-left box ${visibleBoxes[1] ? 'visible' : ''}`} ref={(el) => (boxRefs.current[1] = el)}>
            <h2 className="text-2xl font-semibold text-gray-400 mb-8">Relevant Coursework</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Artificial Intelligence and Computer Vision</li>
              <li>Data Handling and Visualisation</li>
              <li>Algorithm Design & Data Structures</li>
              <li>Web & Database Computing</li>
              <li>Computer Networks & Applications</li>
              <li>3D Imaging and Virtual Reality Design</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between px-16">
          <div className={`sec bg-white shadow-md rounded-lg p-6 mx-auto w-full text-left box ${visibleBoxes[2] ? 'visible' : ''}`} ref={(el) => (boxRefs.current[2] = el)}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Notable Projects</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Since 2022, a VR game I developed for the university's Open Day has been featured in their promotional video.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
