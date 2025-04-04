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

const UPC = () => {
  const dispatch = useDispatch();
  const { codes, loading, error, checkoutLoading, checkoutError } = useSelector((state) => state.codes);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCodes({ type: 'UPC' }));
  }, [dispatch]);

  const handlePurchaseCodes = async (e) => {
    e.preventDefault();
    await dispatch(createCheckoutSession({ codeType: 'UPC', quantity }));
  };

  const columns = [
    {
      key: 'code',
      label: 'UPC Code',
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
      render: (release) => release?.title || '-'
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
          <h1 className="text-2xl font-bold text-gray-900">UPC Codes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your Universal Product Codes
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowGenerateModal(true)}
        >
          Purchase UPC Codes
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
          emptyMessage="No UPC codes found"
        />
      </Card>

      <Modal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Purchase UPC Codes"
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
            UPC codes are unique identifiers for your releases.
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

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            About UPC Codes
          </h2>
          <div className="prose prose-sm text-purple-800">
            <p>
              A Universal Product Code (UPC) is a unique identifier for your music releases.
              It's required by digital music stores and streaming platforms to track and 
              identify your releases.
            </p>
            <ul className="mt-2 space-y-1">
              <li>12-digit unique identifier</li>
              <li>Required for digital distribution</li>
              <li>One UPC per release</li>
              <li>Used for sales tracking</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">
            Best Practices
          </h2>
          <div className="prose prose-sm text-indigo-800">
            <ul className="space-y-1">
              <li>Use one UPC per unique release</li>
              <li>Don't reuse UPCs across different releases</li>
              <li>Keep records of assigned UPCs</li>
              <li>Include UPC in your release metadata</li>
              <li>Verify UPC before distribution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPC;