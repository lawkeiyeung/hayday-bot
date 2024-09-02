import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ToTop from './components/ToTop';
import './styles.css';
import './normal.css';
import { applyTheme, getInitialTheme } from './components/theme';

function App() {

  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  return (
    <div className="App">
      <Header />
      <About />
      <Home />
      <Education />
      <Experience />
      <Skills />
      <Contact />
      <ToTop />
      <Footer />
    </div>
  );
}

export default App;
