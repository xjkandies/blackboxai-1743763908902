import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './common/Button';
import Dropdown from './common/Dropdown';
import Avatar from './common/Avatar';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock authentication state - replace with actual auth state management
  const isAuthenticated = true;
  const user = {
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Upload Music', path: '/upload' },
    { label: 'Distribution', path: '/distribution' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Marketing', path: '/marketing-tools' }
  ];

  const userMenuItems = [
    {
      label: 'Dashboard',
      icon: 'fas fa-chart-line',
      onClick: () => navigate('/dashboard')
    },
    {
      label: 'Profile Settings',
      icon: 'fas fa-user-cog',
      onClick: () => navigate('/profile')
    },
    {
      label: 'Subscription',
      icon: 'fas fa-crown',
      onClick: () => navigate('/subscription')
    },
    {
      label: 'Sign Out',
      icon: 'fas fa-sign-out-alt',
      onClick: () => {
        // Implement sign out logic
        navigate('/login');
      }
    }
  ];

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                <i className="fas fa-music mr-2"></i>
                MusicDist
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side buttons/menu */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => navigate('/upload')}
                >
                  <i className="fas fa-upload mr-2"></i>
                  Upload
                </Button>

                <Dropdown
                  trigger={
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full cursor-pointer"
                    />
                  }
                  items={userMenuItems}
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;