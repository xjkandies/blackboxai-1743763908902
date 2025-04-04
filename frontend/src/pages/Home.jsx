import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const features = [
    {
      title: 'Music Distribution',
      description: 'Distribute your music to all major streaming platforms',
      icon: 'fas fa-music'
    },
    {
      title: 'UPC & ISRC Codes',
      description: 'Get unique identifiers for your releases',
      icon: 'fas fa-barcode'
    },
    {
      title: 'Marketing Tools',
      description: 'Promote your music effectively',
      icon: 'fas fa-bullhorn'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Music, Everywhere
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Distribute your music globally and reach millions of listeners
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/pricing">
              <Button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="text-center">
                <i className={`${feature.icon} text-4xl text-blue-500 mb-4`}></i>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-blue-500">100+</h3>
              <p className="text-gray-300 mt-2">Platforms</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-500">1M+</h3>
              <p className="text-gray-300 mt-2">Artists</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-500">50M+</h3>
              <p className="text-gray-300 mt-2">Monthly Listeners</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Your Music?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of artists who trust us with their music
          </p>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;