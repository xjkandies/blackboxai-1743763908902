import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDistribution, resetUploadStatus } from '../store/slices/distributionSlice';
import Card from '../components/common/Card';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Progress from '../components/common/Progress';

const MusicUpload = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 'Electronic',
    'Classical', 'Country', 'Folk', 'Latin', 'Metal', 'Other'
  ];

  const dispatch = useDispatch();
  const { uploadStatus } = useSelector((state) => state.distribution);

  useEffect(() => {
    // Reset upload status when component unmounts
    return () => {
      dispatch(resetUploadStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    // Update local state based on upload status
    if (uploadStatus.status === 'loading') {
      setUploading(true);
      setError('');
      setSuccess('');
    } else if (uploadStatus.status === 'succeeded') {
      setUploading(false);
      setSuccess('Your music has been successfully uploaded and is being distributed!');
      // Navigate to distribution status page after 2 seconds
      setTimeout(() => {
        navigate(`/distribution/${uploadStatus.currentDistribution?.id}`);
      }, 2000);
    } else if (uploadStatus.status === 'failed') {
      setUploading(false);
      setError(uploadStatus.error || 'Failed to upload music. Please try again.');
    }
    
    // Update progress bar
    setUploadProgress(uploadStatus.progress);
  }, [uploadStatus, navigate]);

  const handleSubmit = async (formData) => {
    dispatch(uploadDistribution({
      title: formData.title,
      artist: formData.artist,
      audioFile: formData.audio,
      coverArtFile: formData.coverArt
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Your Music</h1>
          <p className="mt-2 text-gray-600">Share your music with the world</p>
        </div>

        <Card className="bg-white shadow-xl rounded-lg p-8">
          {error && (
            <Alert
              type="error"
              message={error}
              className="mb-6"
            />
          )}

          {success && (
            <Alert
              type="success"
              message={success}
              className="mb-6"
            />
          )}

          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Track Title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter track title"
                />
              </div>

              <div>
                <Select
                  label="Genre"
                  name="genre"
                  required
                  options={genres.map(genre => ({ value: genre.toLowerCase(), label: genre }))}
                  placeholder="Select genre"
                />
              </div>
            </div>

            <div>
              <Input
                label="Artist Name"
                name="artist"
                type="text"
                required
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Audio File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <i className="fas fa-music text-gray-400 text-3xl mb-3"></i>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="audio-file" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        id="audio-file"
                        name="audio"
                        type="file"
                        accept="audio/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    WAV, MP3, FLAC up to 50MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Input
                label="Release Date"
                name="releaseDate"
                type="date"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Art
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <i className="fas fa-image text-gray-400 text-3xl mb-3"></i>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="cover-art" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload artwork</span>
                      <input
                        id="cover-art"
                        name="coverArt"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Upload progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} color="bg-blue-500" />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700"
                loading={uploading}
              >
                Upload Track
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default MusicUpload;