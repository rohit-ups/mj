import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './globals.css';

// Fonts
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';

import { Sidebar } from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import BatchesPage from './pages/BatchesPage';
import RosterPage from './pages/RosterPage';
import BookingsPage from './pages/BookingsPage';
import BookingDetailPage from './pages/BookingDetailPage';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen relative bg-sand-50 font-sans antialiased selection:bg-accent selection:text-white">
      <div className="grain pointer-events-none fixed inset-0 z-[9999] opacity-[0.05]" />
      <Sidebar />
      <main className="flex-1 flex flex-col relative min-w-0">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/:id" element={<BookingDetailPage />} />
          <Route path="batches" element={<BatchesPage />} />
          <Route path="roster" element={<RosterPage />} />
          <Route path="settings" element={
            <div className="p-8 text-center uppercase font-display text-2xl opacity-40 mt-20">
              Settings coming soon
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
