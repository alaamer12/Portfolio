import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageWrapper = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      {children}
    </main>
    <Footer />
  </>
);

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <ErrorBoundary>
                      <LandingPage />
                    </ErrorBoundary>
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <ErrorBoundary>
                      <About />
                    </ErrorBoundary>
                  </PageWrapper>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageWrapper>
                    <ErrorBoundary>
                      <Projects />
                    </ErrorBoundary>
                  </PageWrapper>
                }
              />
              {/* 404 route */}
              <Route
                path="*"
                element={
                  <ErrorBoundary>
                    <NotFound />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;