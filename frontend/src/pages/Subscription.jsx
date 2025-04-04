import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const plans = {
    basic: {
      name: 'Basic',
      price: {
        monthly: 9.99,
        yearly: 99.99
      },
      features: [
        'Up to 10 releases per year',
        'Basic analytics',
        'Standard support',
        'Basic marketing tools',
        'Distribution to major platforms'
      ]
    },
    pro: {
      name: 'Pro',
      price: {
        monthly: 19.99,
        yearly: 199.99
      },
      features: [
        'Unlimited releases',
        'Advanced analytics',
        'Priority support',
        'Advanced marketing tools',
        'Custom release scheduling',
        'Playlist pitching',
        'Social media integration'
      ],
      popular: true
    },
    enterprise: {
      name: 'Enterprise',
      price: {
        monthly: 49.99,
        yearly: 499.99
      },
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom solutions',
        'API access',
        'Advanced team management',
        'Custom reporting',
        'White-label options'
      ]
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle subscription
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Choose Your Plan
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Get the tools you need to distribute and promote your music
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'}
            `}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Object.entries(plans).map(([key, plan]) => (
          <Card
            key={key}
            className={`relative ${
              plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                  Popular
                </span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price[billingCycle]}
                </span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  variant={selectedPlan === key ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => setSelectedPlan(key)}
                >
                  {selectedPlan === key ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onClick={handleSubscribe}
        >
          Get Started with {plans[selectedPlan].name}
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          No credit card required. Cancel anytime.
        </p>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: 'Can I change my plan later?',
              a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
            },
            {
              q: 'Is there a contract or commitment?',
              a: 'No, all our plans are subscription-based with no long-term commitment. You can cancel at any time.'
            },
            {
              q: 'What happens when I upgrade or downgrade?',
              a: 'When you upgrade, you\'ll get immediate access to new features. When downgrading, you\'ll keep your current features until the end of your billing period.'
            }
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;