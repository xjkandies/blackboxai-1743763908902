import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import Progress from '../components/common/Progress';
import Button from '../components/common/Button';

const Dashboard = () => {
  const recentReleases = [
    { id: 1, title: 'Summer Vibes', status: 'Live', streams: '50K', revenue: '$500' },
    { id: 2, title: 'Night Drive', status: 'Pending', streams: '10K', revenue: '$100' },
    { id: 3, title: 'Sunset Dreams', status: 'Processing', streams: '25K', revenue: '$250' }
  ];

  const stats = [
    { title: 'Total Streams', value: '85K', icon: 'fas fa-play', color: 'bg-blue-500' },
    { title: 'Monthly Revenue', value: '$850', icon: 'fas fa-dollar-sign', color: 'bg-green-500' },
    { title: 'Active Releases', value: '3', icon: 'fas fa-music', color: 'bg-purple-500' },
    { title: 'Platform Reach', value: '12', icon: 'fas fa-globe', color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Artist!</h1>
        <p className="text-gray-600">Here's what's happening with your music</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full mr-4`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Releases */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Releases</h2>
              <Link to="/upload">
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  New Release
                </Button>
              </Link>
            </div>
            <Table
              headers={['Title', 'Status', 'Streams', 'Revenue']}
              data={recentReleases.map(release => [
                release.title,
                <Badge
                  key={release.id}
                  text={release.status}
                  color={
                    release.status === 'Live' ? 'green' :
                    release.status === 'Pending' ? 'yellow' : 'blue'
                  }
                />,
                release.streams,
                release.revenue
              ])}
            />
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link to="/upload">
                <Button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                  <i className="fas fa-upload mr-2"></i> Upload Music
                </Button>
              </Link>
              <Link to="/codes">
                <Button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg">
                  <i className="fas fa-barcode mr-2"></i> Get UPC/ISRC
                </Button>
              </Link>
              <Link to="/marketing-tools">
                <Button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg">
                  <i className="fas fa-bullhorn mr-2"></i> Marketing Tools
                </Button>
              </Link>
            </div>
          </Card>

          {/* Distribution Progress */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Distribution Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Spotify</span>
                  <span>100%</span>
                </div>
                <Progress value={100} color="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Apple Music</span>
                  <span>75%</span>
                </div>
                <Progress value={75} color="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Amazon Music</span>
                  <span>50%</span>
                </div>
                <Progress value={50} color="bg-yellow-500" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;