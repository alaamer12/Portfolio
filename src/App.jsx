import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
};

export default App;