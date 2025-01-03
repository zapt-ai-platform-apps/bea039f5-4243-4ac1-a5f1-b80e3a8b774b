import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OwnerDashboard from './pages/OwnerDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddProperty from './pages/AddProperty';
import PropertyDetail from './pages/PropertyDetail';
import AppointmentRequests from './pages/AppointmentRequests';
import UserProfile from './pages/UserProfile';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/add-property" element={<AddProperty />} />
              <Route path="/investor/dashboard" element={<InvestorDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/appointments" element={<AppointmentRequests />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <footer className="bg-gray-800 text-white text-center p-4">
            Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="underline">ZAPT</a>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}