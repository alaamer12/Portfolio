import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load pages
const LandingPage = React.lazy(() => import('../pages/LandingPage'));
const More = React.lazy(() => import('../pages/More'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="animate-pulse space-y-4">
      <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      <div className="h-96 w-full max-w-3xl bg-gray-200 dark:bg-gray-800 rounded-xl" />
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
