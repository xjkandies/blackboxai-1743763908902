import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Toast from '../components/common/Toast';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header Logo */}
      <div className="fixed top-0 left-0 p-6">
        <Link to="/" className="flex items-center text-white text-2xl font-bold hover:text-blue-400 transition-colors">
          <i className="fas fa-music mr-2"></i>
          MusicDist
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </div>

      {/* Background Design Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Toast Container for Notifications */}
      <div className="fixed bottom-4 right-4 z-50">
        <Toast />
      </div>

      {/* Footer Links */}
      <div className="fixed bottom-0 left-0 w-full p-6 text-center text-gray-400">
        <div className="flex justify-center space-x-4 text-sm">
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/help" className="hover:text-white transition-colors">Help</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>

      {/* Add animation styles */}
      <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout;