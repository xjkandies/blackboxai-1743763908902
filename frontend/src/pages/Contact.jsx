import React, { useState } from 'react';
import Card from '../components/common/Card';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Select from '../components/common/Select';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const supportCategories = [
    { value: 'distribution', label: 'Music Distribution' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Management' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'codes', label: 'ISRC/UPC Codes' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
          <p className="mt-2 text-gray-600">
            Get help from our support team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Methods */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Available Mon-Fri, 9AM-5PM EST
                </p>
                <a
                  href="tel:+1-800-123-4567"
                  className="mt-2 inline-block text-blue-600 hover:text-blue-800"
                >
                  1-800-123-4567
                </a>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-comments text-xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                <p className="mt-1 text-sm text-gray-500">
                  24/7 Chat Support
                </p>
                <button
                  className="mt-2 text-green-600 hover:text-green-800"
                  onClick={() => window.open('https://chat.example.com')}
                >
                  Start Chat
                </button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-book text-xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Browse our help articles
                </p>
                <a
                  href="/docs"
                  className="mt-2 inline-block text-purple-600 hover:text-purple-800"
                >
                  View Articles
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-check text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Message Sent Successfully
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We'll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      required
                      placeholder="Enter your first name"
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      required
                      placeholder="Enter your last name"
                    />
                  </div>

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                  />

                  <Select
                    label="Support Category"
                    name="category"
                    required
                    options={supportCategories}
                    placeholder="Select a category"
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    required
                    placeholder="Enter message subject"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your message"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              )}
            </Card>
          </div>
        </div>

        {/* Office Information */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Office Hours
              </h3>
              <p className="text-gray-600">
                Monday - Friday<br />
                9:00 AM - 5:00 PM EST
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Office Location
              </h3>
              <p className="text-gray-600">
                123 Music Street<br />
                Nashville, TN 37203<br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Social Media
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
