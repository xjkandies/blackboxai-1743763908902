import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCodes } from '../../store/slices/codesSlice';
import Card from '../../components/common/Card';

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Refresh codes list after successful payment
      dispatch(getCodes({ type: 'ISRC' }));
      dispatch(getCodes({ type: 'UPC' }));
    }
    
    // Redirect to codes page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/codes');
    }, 5000);

    return () => clearTimeout(timer);
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto text-center p-8">
        <div className="text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your codes are being generated and will be available shortly.
        </p>
        <p className="text-sm text-gray-500">
          You will be redirected to your codes page in a few seconds...
        </p>
      </Card>
    </div>
  );
};

export default Success;