import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Card from '../components/common/Card';

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      
      // TODO: Implement registration logic
      console.log('Registration data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start distributing your music globally
            </p>
          </div>

          {error && (
            <Alert
              type="error"
              message={error}
              className="mb-6"
            />
          )}

          <Form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Artist/Band Name"
                name="artistName"
                type="text"
                required
                placeholder="Enter your artist or band name"
              />
            </div>

            <div>
              <Input
                label="Email Address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
              />
            </div>

            <div>
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                loading={loading}
              >
                Create Account
              </Button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-600 text-center">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Registration;