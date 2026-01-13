import React, { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';

// UPDATED IMPORTS
import Login from './pages/Login';
import Register from './pages/Register';

import CreateBusiness from './pages/CreateBusiness';
import LinkSelection from './pages/LinkSelection';
import PublicReviewPage from './pages/PublicReviewPage';
import LinkInBioPage from './pages/LinkInBioPage';
import Dashboard from './pages/Dashboard';
import RegistrationSuccess from './pages/RegistrationSuccess';
import AIReviewPage from './pages/AIReviewPage';
import './index.css';

// Layout for the main website (Landing, Login, Register)
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

// Layout for the Protected Dashboard
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 relative">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-100 px-6 flex items-center justify-between z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-primary-600">
            <Sparkles size={24} fill="currentColor" />
          </div>
          <span className="text-lg font-black text-zinc-900 tracking-tight font-sans">RevLinko</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-[260px] pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

// Public Route (Redirect to dashboard if logged in)
const PublicRoute = ({ children, useLayout = true }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return useLayout ? <MainLayout>{children}</MainLayout> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />

        {/* UPDATED: Separate Login and Register Routes */}
        <Route path="/login" element={<PublicRoute useLayout={false}><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute useLayout={false}><Register /></PublicRoute>} />

        <Route path="/registration-success" element={<RegistrationSuccess />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-business" element={<ProtectedRoute><CreateBusiness /></ProtectedRoute>} />
        <Route path="/link-selection" element={<ProtectedRoute><LinkSelection /></ProtectedRoute>} />

        <Route path="/my-page" element={<Navigate to="/create-business" replace />} />

        {/* Public Pages */}
        <Route path="/r/:id" element={<PublicReviewPage />} />
        <Route path="/:identifier/review" element={<AIReviewPage />} />
        <Route path="/:id" element={<LinkInBioPage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;