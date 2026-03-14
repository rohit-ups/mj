import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css';

// Fonts
import '@fontsource/unbounded/400.css';
import '@fontsource/unbounded/700.css';
import '@fontsource/unbounded/900.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import { ErrorBoundary, WebLoadingFallback } from './components/ErrorBoundary';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-mono antialiased selection:bg-[#ff5c00] selection:text-white bg-[#f0f0f0] min-h-screen flex flex-col">
      <div className="scanlines pointer-events-none fixed inset-0 z-50" />
      <main className="relative min-h-screen flex flex-col flex-1">
        {children}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<WebLoadingFallback />}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
