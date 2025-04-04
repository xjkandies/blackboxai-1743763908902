import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Table from '../components/common/Table';
import Tabs from '../components/common/Tabs';

const MarketingTools = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'social', label: 'Social Media' },
    { id: 'promo', label: 'Promo Links' },
    { id: 'analytics', label: 'Performance' }
  ];

  const platformOptions = [
    { value: 'spotify', label: 'Spotify' },
    { value: 'apple', label: 'Apple Music' },
    { value: 'youtube', label: 'YouTube Music' },
    { value: 'soundcloud', label: 'SoundCloud' },
    { value: 'all', label: 'All Platforms' }
  ];

  const campaignTypes = [
    { value: 'release', label: 'New Release' },
    { value: 'playlist', label: 'Playlist Pitch' },
    { value: 'presave', label: 'Pre-Save' },
    { value: 'social', label: 'Social Media' }
  ];

  const renderCampaigns = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Campaign
        </Button>
      </div>

      <Card>
        <Table
          columns={[
            {
              key: 'name',
              label: 'Campaign',
              render: (name, campaign) => (
                <div>
                  <div className="font-medium text-gray-900">{name}</div>
                  <div className="text-sm text-gray-500">{campaign.type}</div>
                </div>
              )
            },
            {
              key: 'platform',
              label: 'Platform',
              render: (platform) => (
                <div className="flex items-center">
                  <i className={`fab fa-${platform} text-lg mr-2`}></i>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </div>
              )
            },
            {
              key: 'status',
              label: 'Status',
              render: (status) => (
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${status === 'active' ? 'bg-green-100 text-green-800' :
                    status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    status === 'ended' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )
            },
            {
              key: 'performance',
              label: 'Performance',
              render: (performance) => (
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{performance.reach} Reach</div>
                  <div className="text-gray-500">{performance.engagement}% Engagement</div>
                </div>
              )
            },
            {
              key: 'actions',
              label: '',
              render: () => (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              )
            }
          ]}
          data={[
            {
              name: 'Summer Release',
              type: 'New Release Campaign',
              platform: 'spotify',
              status: 'active',
              performance: { reach: '10.2K', engagement: 4.8 }
            },
            {
              name: 'Playlist Push',
              type: 'Playlist Pitch Campaign',
              platform: 'apple',
              status: 'scheduled',
              performance: { reach: '5.1K', engagement: 3.2 }
            }
          ]}
        />
      </Card>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          <Button variant="outline" size="sm">
            Edit Links
          </Button>
        </div>
        <div className="space-y-4">
          {['spotify', 'youtube', 'instagram', 'twitter'].map((platform) => (
            <div key={platform} className="flex items-center justify-between">
              <div className="flex items-center">
                <i className={`fab fa-${platform} text-2xl text-gray-600 mr-3`}></i>
                <span className="text-gray-900 capitalize">{platform}</span>
              </div>
              <Button variant="link" size="sm">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Auto-Posting</h3>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </div>
        <div className="space-y-4">
          {['New Releases', 'Milestones', 'Playlists', 'Updates'].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-gray-900">{type}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPromoLinks = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Smart Links</h3>
          <Button variant="primary" size="sm">
            Create Link
          </Button>
        </div>
        <Table
          columns={[
            {
              key: 'name',
              label: 'Name',
              render: (name, link) => (
                <div>
                  <div className="font-medium text-gray-900">{name}</div>
                  <div className="text-sm text-gray-500">{link.url}</div>
                </div>
              )
            },
            {
              key: 'clicks',
              label: 'Clicks',
              render: (clicks) => (
                <span className="font-medium text-gray-900">{clicks}</span>
              )
            },
            {
              key: 'conversion',
              label: 'Conversion',
              render: (conversion) => (
                <span className="text-green-600">{conversion}%</span>
              )
            },
            {
              key: 'actions',
              label: '',
              render: () => (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Copy</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              )
            }
          ]}
          data={[
            {
              name: 'New Single',
              url: 'music.link/newsingle',
              clicks: 1243,
              conversion: 68
            },
            {
              name: 'Album Pre-Save',
              url: 'music.link/album',
              clicks: 856,
              conversion: 72
            }
          ]}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">QR Codes</h3>
          <Button variant="primary" size="sm">
            Generate QR
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <i className="fas fa-qrcode text-4xl text-gray-600"></i>
              </div>
              <div className="font-medium text-gray-900">Album QR #{i}</div>
              <div className="text-sm text-gray-500 mt-1">234 scans</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Reach</h3>
          <div className="mt-2 flex items-baseline">
            <div className="text-3xl font-semibold text-gray-900">24.3K</div>
            <div className="ml-2 text-sm text-green-600">+12.4%</div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
          <div className="mt-2 flex items-baseline">
            <div className="text-3xl font-semibold text-gray-900">4.8%</div>
            <div className="ml-2 text-sm text-green-600">+2.1%</div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <div className="mt-2 flex items-baseline">
            <div className="text-3xl font-semibold text-gray-900">3.2%</div>
            <div className="ml-2 text-sm text-red-600">-0.4%</div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Performance Chart</span>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>
          <p className="mt-1 text-sm text-gray-500">
            Promote your music across platforms
          </p>
        </div>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'social' && renderSocialMedia()}
        {activeTab === 'promo' && renderPromoLinks()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Campaign"
      >
        <Form className="space-y-4">
          <Input
            label="Campaign Name"
            placeholder="Enter campaign name"
            required
          />

          <Select
            label="Campaign Type"
            options={campaignTypes}
            placeholder="Select campaign type"
            required
          />

          <Select
            label="Platform"
            options={platformOptions}
            placeholder="Select platform"
            required
          />

          <Input
            label="Start Date"
            type="date"
            required
          />

          <Input
            label="End Date"
            type="date"
            required
          />

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              loading={loading}
            >
              Create Campaign
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MarketingTools;