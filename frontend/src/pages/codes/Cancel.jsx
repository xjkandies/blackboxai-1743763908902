import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to codes page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/codes');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto text-center p-8">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled and you have not been charged.
          You can try purchasing codes again whenever you're ready.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="primary"
            onClick={() => navigate('/codes')}
          >
            Return to Codes
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          You will be redirected automatically in a few seconds...
        </p>
      </Card>
    </div>
  );
};

export default Cancel;