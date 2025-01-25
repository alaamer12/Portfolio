import {  lazy, Suspense, memo  } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// Route configurations
const ROUTES = {
  HOME: {
    path: '/',
    title: 'Amr Muhamed | Full Stack Developer',
    description: 'Experienced Full Stack Developer specializing in React, Django, and modern web technologies. View my portfolio of innovative projects.',
    Component: lazy(() => import('./pages/LandingPage')),
  },
  ABOUT: {
    path: '/about',
    title: 'About Me | Amr Muhamed',
    description: 'Learn about my journey as a Full Stack Developer, my skills, experiences, and what drives me to create innovative web solutions.',
    Component: lazy(() => import('./pages/About')),
  },
  PROJECTS: {
    path: '/projects',
    title: 'Projects | Amr Muhamed',
    description: 'Explore my portfolio of web development projects, featuring React, Django, and other modern technologies.',
    Component: lazy(() => import('./pages/Projects')),
  },
  NOT_FOUND: {
    path: '*',
    title: '404 - Page Not Found | Amr Muhamed',
    description: 'The page you are looking for could not be found.',
    Component: lazy(() => import('./pages/NotFound')),
  },
};
// Memoized SEO component
const SEOHelmet = memo(({ title, description, pathname }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`https://amrmuhamed.com${pathname}`} />
    <link rel="canonical" href={`https://amrmuhamed.com${pathname}`} />
  </Helmet>
));
// Memoized page wrapper
const PageWrapper = memo(({ children }) => {
  const location = useLocation();
  const route = Object.values(ROUTES).find(r => r.path === location.pathname) || ROUTES.HOME;
  return (
    <>
      <SEOHelmet
        title={route.title}
        description={route.description}
        pathname={location.pathname}
      />
      <Navbar />
      <main className="min-h-screen pt-16">
        {location.pathname !== '/' && <Breadcrumb />}
        {children}
      </main>
      <Footer />
    </>
  );
});
// Route component with error boundary
const RouteWithErrorBoundary = memo(({ Component }) => (
  <ErrorBoundary>
    <Component />
  </ErrorBoundary>
));
const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            {Object.values(ROUTES).map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  path === '*' ? (
                    <RouteWithErrorBoundary Component={Component} />
                  ) : (
                    <PageWrapper>
                      <RouteWithErrorBoundary Component={Component} />
                    </PageWrapper>
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
);
export default memo(App);