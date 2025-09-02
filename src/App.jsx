import {memo, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {ThemeProvider} from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SpeedInsights from './components/SpeedInsights/SpeedInsights';
import ToastProvider from './components/Toast/ToastProvider';
import FloatingContactButton from './components/FloatingContactButton';
import {OptimizedBlock} from './components/OptimizedMillion';
import {ROUTES} from "./data/config.jsx";

// Memoized SEO component
const SEOHelmet = memo(({title, description, pathname}) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={`https://amrmuhamed.com${pathname}`}/>
        <link rel="canonical" href={`https://amrmuhamed.com${pathname}`}/>
    </Helmet>
));
// Memoized page wrapper
const PageWrapper = memo(({children}) => {
    const location = useLocation();
    const route = Object.values(ROUTES).find(r => r.path === location.pathname) || ROUTES.NOT_FOUND;

    return (
        <OptimizedBlock enableCache={true} threshold={20}>
            <div className="flex flex-col min-h-screen">
                <SEOHelmet
                    title={route.title}
                    description={route.description}
                    pathname={location.pathname}
                />
                <Navbar/>
                <Breadcrumb/>
                <main className="flex-grow">
                    {children}
                </main>
                <Footer/>
            </div>
        </OptimizedBlock>
    );
});
// Route component with error boundary
const RouteWithErrorBoundary = memo(({Component}) => (
    <OptimizedBlock enableCache={true} threshold={20}>
        <ErrorBoundary>
            <Component/>
        </ErrorBoundary>
    </OptimizedBlock>
));
const App = () => (
    <ErrorBoundary>
        <ThemeProvider>
            <Router>
                <ScrollToTop/>
                <SpeedInsights/>
                <ToastProvider/>
                <OptimizedBlock>
                    <Navbar/>
                    {/* <OptimizedBlock>
                        <ChatBot />
                    </OptimizedBlock> */}
                </OptimizedBlock>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        {Object.values(ROUTES).map(({path, Component}) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    path === '*' ? (
                                        <RouteWithErrorBoundary Component={Component}/>
                                    ) : (
                                        <PageWrapper>
                                            <RouteWithErrorBoundary Component={Component}/>
                                        </PageWrapper>
                                    )
                                }
                            />
                        ))}
                    </Routes>
                </Suspense>
                <FloatingContactButton/>
            </Router>
        </ThemeProvider>
    </ErrorBoundary>
);
export default memo(App);
