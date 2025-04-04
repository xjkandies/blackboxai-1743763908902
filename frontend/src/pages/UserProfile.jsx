import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Form from '../components/common/Form';
import Alert from '../components/common/Alert';
import Tabs from '../components/common/Tabs';
import Avatar from '../components/common/Avatar';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Billing' }
  ];

  const handleProfileUpdate = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Password updated successfully');
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar
            size="xl"
            src={user?.avatarUrl}
            alt={user?.name}
            className="ring-4 ring-gray-100"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <Form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                defaultValue={user?.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                defaultValue={user?.lastName}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              defaultValue={user?.email}
              required
            />

            <Input
              label="Artist Name"
              name="artistName"
              defaultValue={user?.artistName}
            />

            <Input
              label="Bio"
              name="bio"
              as="textarea"
              rows={4}
              defaultValue={user?.bio}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Connected Accounts
        </h3>
        <div className="space-y-4">
          {['spotify', 'apple', 'youtube', 'soundcloud'].map((platform) => (
            <div key={platform} className="flex items-center justify-between">
              <div className="flex items-center">
                <i className={`fab fa-${platform} text-2xl text-gray-600 mr-3`}></i>
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {platform} Music
                  </div>
                  <div className="text-sm text-gray-500">
                    {user?.[`${platform}Connected`] ? 'Connected' : 'Not connected'}
                  </div>
                </div>
              </div>
              <Button
                variant={user?.[`${platform}Connected`] ? 'outline' : 'primary'}
                size="sm"
              >
                {user?.[`${platform}Connected`] ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Change Password
      </h3>
      <Form onSubmit={handlePasswordUpdate} className="space-y-6">
        <Input
          label="Current Password"
          type="password"
          name="currentPassword"
          required
        />
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          required
        />
        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          required
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Update Password
          </Button>
        </div>
      </Form>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Two-Factor Authentication
        </h3>
        <p className="text-gray-600 mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <Button variant="outline">
          Enable 2FA
        </Button>
      </div>
    </Card>
  );

  const renderNotifications = () => (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Notification Preferences
      </h3>
      <div className="space-y-4">
        {[
          { id: 'releases', label: 'New Releases', desc: 'Get notified about your release status' },
          { id: 'analytics', label: 'Analytics Updates', desc: 'Weekly performance reports' },
          { id: 'marketing', label: 'Marketing Campaigns', desc: 'Campaign status and results' },
          { id: 'platform', label: 'Platform Updates', desc: 'Important platform and feature updates' }
        ].map((pref) => (
          <div key={pref.id} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={pref.id}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="ml-3">
              <label htmlFor={pref.id} className="font-medium text-gray-900">
                {pref.label}
              </label>
              <p className="text-sm text-gray-500">{pref.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Email Preferences
        </h3>
        <div className="space-y-4">
          {[
            { id: 'newsletter', label: 'Newsletter', desc: 'Monthly industry insights and tips' },
            { id: 'promos', label: 'Promotions', desc: 'Special offers and discounts' }
          ].map((pref) => (
            <div key={pref.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={pref.id}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor={pref.id} className="font-medium text-gray-900">
                  {pref.label}
                </label>
                <p className="text-sm text-gray-500">{pref.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Current Plan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Pro Plan</div>
            <div className="text-sm text-gray-500">$19.99/month</div>
          </div>
          <Button variant="outline">
            Upgrade Plan
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fab fa-cc-visa text-2xl text-gray-600 mr-3"></i>
            <div>
              <div className="font-medium text-gray-900">Visa ending in 4242</div>
              <div className="text-sm text-gray-500">Expires 12/24</div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Billing History
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Pro Plan - Monthly</div>
                <div className="text-sm text-gray-500">Jan {i}, 2024</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">$19.99</span>
                <Button variant="link" size="sm">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {(success || error) && (
          <Alert
            type={success ? 'success' : 'error'}
            message={success || error}
            className="mb-6"
          />
        )}

        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'billing' && renderBilling()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;