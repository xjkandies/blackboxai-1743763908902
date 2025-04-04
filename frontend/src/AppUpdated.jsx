import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Registration from './pages/Registration';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MusicUpload from './pages/MusicUpload';
import CodeManagement from './pages/CodeManagement';
import UPC from './pages/UPC';
import ISRC from './pages/ISRC';
import MarketingTools from './pages/MarketingTools';
import Analytics from './pages/Analytics';
import Subscription from './pages/Subscription';
import DistributionStatus from './pages/DistributionStatus';
import UserProfile from './pages/UserProfile';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';

// Import styles
import './styles.css';

const AppUpdated = () => {
  // Mock authentication state - replace with actual auth state management
  const isAuthenticated = true;

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>

          {/* Main Routes */}
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsAndConditions />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <MusicUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/codes"
              element={
                <ProtectedRoute>
                  <CodeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upc"
              element={
                <ProtectedRoute>
                  <UPC />
                </ProtectedRoute>
              }
            />
            <Route
              path="/isrc"
              element={
                <ProtectedRoute>
                  <ISRC />
                </ProtectedRoute>
              }
            />
            <Route
              path="/distribution/:id"
              element={
                <ProtectedRoute>
                  <DistributionStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketing-tools"
              element={
                <ProtectedRoute>
                  <MarketingTools />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppUpdated;