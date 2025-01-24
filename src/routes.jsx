import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import About from './pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="projects" element={<Projects />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
