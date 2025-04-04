import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributionStatus } from '../store/slices/distributionSlice';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

const Analytics = () => {
  const dispatch = useDispatch();
  const { status, loading, error } = useSelector((state) => state.distribution);

  useEffect(() => {
    dispatch(getDistributionStatus());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Distributions">
          <div className="text-4xl font-bold">
            {status.pending.length + status.approved.length + status.rejected.length}
          </div>
        </Card>
        
        <Card title="Pending">
          <div className="text-4xl font-bold text-yellow-500">
            {status.pending.length}
          </div>
        </Card>
        
        <Card title="Approved">
          <div className="text-4xl font-bold text-green-500">
            {status.approved.length}
          </div>
        </Card>
        
        <Card title="Rejected">
          <div className="text-4xl font-bold text-red-500">
            {status.rejected.length}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
