import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MusicUpload from './pages/MusicUpload';
import DistributionStatus from './pages/DistributionStatus';
import Analytics from './pages/Analytics';
import MarketingTools from './pages/MarketingTools';
import CodeManagement from './pages/CodeManagement';
import ISRC from './pages/ISRC';
import UPC from './pages/UPC';
import Success from './pages/codes/Success';
import Cancel from './pages/codes/Cancel';
import UserProfile from './pages/UserProfile';
import Subscription from './pages/Subscription';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<MusicUpload />} />
          <Route path="/distribution/:id" element={<DistributionStatus />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/marketing" element={<MarketingTools />} />
          <Route path="/codes" element={<CodeManagement />} />
          <Route path="/isrc" element={<ISRC />} />
          <Route path="/upc" element={<UPC />} />
          <Route path="/codes/success" element={<Success />} />
          <Route path="/codes/cancel" element={<Cancel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
