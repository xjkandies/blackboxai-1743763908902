import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: 'fas fa-home' },
    { name: 'Upload Music', path: '/upload', icon: 'fas fa-upload' },
    { name: 'Analytics', path: '/analytics', icon: 'fas fa-chart-line' },
    { name: 'Marketing', path: '/marketing', icon: 'fas fa-bullhorn' },
    { name: 'Code Management', path: '/codes', icon: 'fas fa-barcode' },
    { name: 'ISRC', path: '/isrc', icon: 'fas fa-fingerprint' },
    { name: 'UPC', path: '/upc', icon: 'fas fa-qrcode' }
  ];

  const userMenu = [
    { name: 'Profile', path: '/profile', icon: 'fas fa-user' },
    { name: 'Subscription', path: '/subscription', icon: 'fas fa-crown' }
  ];

  const helpMenu = [
    { name: 'FAQ', path: '/faq', icon: 'fas fa-question-circle' },
    { name: 'Contact', path: '/contact', icon: 'fas fa-envelope' },
    { name: 'Terms', path: '/terms', icon: 'fas fa-file-contract' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-music text-blue-600 text-2xl"></i>
            <span className="text-xl font-bold text-gray-900">Music Dist</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-2 py-2 text-sm font-medium rounded-lg
                  ${isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="mt-8">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </h3>
            <div className="mt-2 space-y-1">
              {userMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-2 py-2 text-sm font-medium rounded-lg
                    ${isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Help Menu */}
          <div className="mt-8">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Help & Support
            </h3>
            <div className="mt-2 space-y-1">
              {helpMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-2 py-2 text-sm font-medium rounded-lg
                    ${isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {navigation.find((item) => isActive(item.path))?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-bell text-xl"></i>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <img
                    src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">User Name</span>
                  <i className="fas fa-chevron-down text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;