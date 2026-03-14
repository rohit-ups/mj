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
import PackagesPage from './pages/PackagesPage';
import PropertiesPage from './pages/PropertiesPage';
import InstructorsPage from './pages/InstructorsPage';
import FAQsPage from './pages/FAQsPage';

// Placeholder for new management pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 space-y-8">
    <h1 className="font-display text-5xl uppercase tracking-tighter">{title}</h1>
    <p className="font-display text-sm uppercase tracking-widest opacity-60">Management interface for {title.toLowerCase()} coming soon.</p>
    <div className="border-4 border-dashed border-black/10 h-64 flex items-center justify-center font-mono text-xs uppercase opacity-20">
      Section Under Construction
    </div>
  </div>
);

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
          
          {/* Management Routes */}
          <Route path="packages" element={<PackagesPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="instructors" element={<InstructorsPage />} />
          
          {/* Content Routes */}
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="settings" element={<PlaceholderPage title="Site Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
