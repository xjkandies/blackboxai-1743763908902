import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributionStatus } from '../store/slices/distributionSlice';
import Card from '../components/common/Card';
import Progress from '../components/common/Progress';
import Badge from '../components/common/Badge';

const DistributionStatus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentDistribution, loadingStatus } = useSelector((state) => state.distribution);

  useEffect(() => {
    if (id) {
      const interval = setInterval(() => {
        dispatch(getDistributionStatus(id));
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [id, dispatch]);

  const getPlatformStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loadingStatus === 'loading' && !currentDistribution) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentDistribution) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-xl rounded-lg p-8">
            <div className="text-center text-gray-600">
              Distribution not found
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Distribution Status</h1>
          <p className="mt-2 text-gray-600">Track your music distribution progress</p>
        </div>

        <Card className="bg-white shadow-xl rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDistribution.title}
              </h2>
              <p className="text-gray-600">{currentDistribution.artist}</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>YouTube</span>
                  <Badge
                    text={currentDistribution.youtube_status}
                    color={getPlatformStatusColor(currentDistribution.youtube_status)}
                  />
                </div>
                <Progress
                  value={currentDistribution.youtube_status === 'completed' ? 100 : 50}
                  color="bg-red-500"
                />
                {currentDistribution.youtube_url && (
                  <a
                    href={currentDistribution.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-600 hover:text-red-800 mt-1 inline-block"
                  >
                    View on YouTube
                  </a>
                )}
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Spotify</span>
                  <Badge
                    text={currentDistribution.spotify_status}
                    color={getPlatformStatusColor(currentDistribution.spotify_status)}
                  />
                </div>
                <Progress
                  value={currentDistribution.spotify_status === 'completed' ? 100 : 50}
                  color="bg-green-500"
                />
                {currentDistribution.spotify_url && (
                  <a
                    href={currentDistribution.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-800 mt-1 inline-block"
                  >
                    View on Spotify
                  </a>
                )}
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>SoundCloud</span>
                  <Badge
                    text={currentDistribution.soundcloud_status}
                    color={getPlatformStatusColor(currentDistribution.soundcloud_status)}
                  />
                </div>
                <Progress
                  value={currentDistribution.soundcloud_status === 'completed' ? 100 : 50}
                  color="bg-orange-500"
                />
                {currentDistribution.soundcloud_url && (
                  <a
                    href={currentDistribution.soundcloud_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-600 hover:text-orange-800 mt-1 inline-block"
                  >
                    View on SoundCloud
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ISRC Code</span>
                  <p className="font-medium">{currentDistribution.isrc_code || 'Not assigned'}</p>
                </div>
                <div>
                  <span className="text-gray-500">UPC Code</span>
                  <p className="font-medium">{currentDistribution.upc_code || 'Not assigned'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Upload Date</span>
                  <p className="font-medium">
                    {new Date(currentDistribution.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated</span>
                  <p className="font-medium">
                    {new Date(currentDistribution.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DistributionStatus;