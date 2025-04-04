import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import { getCodes, createCheckoutSession } from '../store/slices/codesSlice';

const ISRC = () => {
  const dispatch = useDispatch();
  const { codes, loading, error, checkoutLoading, checkoutError } = useSelector((state) => state.codes);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCodes({ type: 'ISRC' }));
  }, [dispatch]);

  const handlePurchaseCodes = async (e) => {
    e.preventDefault();
    await dispatch(createCheckoutSession({ codeType: 'ISRC', quantity }));
  };

  const columns = [
    {
      key: 'code',
      label: 'ISRC Code',
      render: (code) => (
        <span className="font-mono">{code}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${status === 'available' ? 'bg-green-100 text-green-800' : 
            status === 'used' ? 'bg-gray-100 text-gray-800' : 
            'bg-yellow-100 text-yellow-800'}
        `}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    {
      key: 'assigned_to',
      label: 'Assigned To',
      render: (track) => track?.title || '-'
    },
    {
      key: 'created_at',
      label: 'Generated On',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ISRC Codes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your International Standard Recording Codes
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowGenerateModal(true)}
        >
          Purchase ISRC Codes
        </Button>
      </div>

      <Card className="overflow-hidden">
        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-4"
          />
        )}

        <Table
          columns={columns}
          data={codes}
          loading={loading}
          emptyMessage="No ISRC codes found"
        />
      </Card>

      <Modal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Purchase ISRC Codes"
      >
        <Form onSubmit={handlePurchaseCodes} className="space-y-4">
          <Input
            type="number"
            label="Number of Codes"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
            max={100}
            required
          />
          <div className="text-sm text-gray-500">
            ISRC codes are unique identifiers for sound recordings and music videos.
            Each code costs $5.00 USD. Total cost: ${(quantity * 5).toFixed(2)} USD
          </div>
          {checkoutError && (
            <Alert
              type="error"
              message={checkoutError}
              className="mt-2"
            />
          )}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowGenerateModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={checkoutLoading}
            >
              Purchase (${(quantity * 5).toFixed(2)})
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          About ISRC Codes
        </h2>
        <div className="prose prose-sm text-blue-800">
          <p>
            An International Standard Recording Code (ISRC) is a unique identifier 
            for sound recordings and music videos. It helps track usage and 
            royalties across different platforms and territories.
          </p>
          <ul className="mt-2 space-y-1">
            <li>Each code is unique and permanent</li>
            <li>Required for digital distribution</li>
            <li>Helps track plays and royalties</li>
            <li>Used worldwide by streaming platforms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ISRC;