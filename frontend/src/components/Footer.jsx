import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Music Distribution', path: '/distribution' },
        { label: 'Marketing Tools', path: '/marketing-tools' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'UPC & ISRC Codes', path: '/codes' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Blog', path: '/blog' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Pricing', path: '/pricing' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'DMCA', path: '/dmca' }
      ]
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook', url: 'https://facebook.com' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-white flex items-center">
                <i className="fas fa-music mr-2"></i>
                MusicDist
              </Link>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${social.icon} text-xl`}></i>
                  <span className="sr-only">{social.icon.split('-')[2]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MusicDist. All rights reserved.
            </p>

            <div className="flex space-x-4 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;