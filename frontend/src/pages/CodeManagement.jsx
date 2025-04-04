import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Alert from '../components/common/Alert';
import Tabs from '../components/common/Tabs';
import { getCodes, generateCodes } from '../store/slices/codesSlice';

const CodeManagement = () => {
  const dispatch = useDispatch();
  const { codes, loading, error } = useSelector((state) => state.codes);
  const [activeTab, setActiveTab] = useState('isrc');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCodes({ type: activeTab.toUpperCase() }));
  }, [dispatch, activeTab]);

  const tabs = [
    { id: 'isrc', label: 'ISRC Codes' },
    { id: 'upc', label: 'UPC Codes' }
  ];

  const handleGenerateCodes = async (e) => {
    e.preventDefault();
    await dispatch(generateCodes({
      type: activeTab.toUpperCase(),
      quantity
    }));
    setShowGenerateModal(false);
    setQuantity(1);
  };

  const columns = [
    {
      key: 'code',
      label: 'Code',
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
      render: (item) => item?.title || '-'
    },
    {
      key: 'created_at',
      label: 'Generated On',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'actions',
      label: '',
      render: (_, code) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={code.status !== 'available'}
          >
            Assign
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={code.status !== 'available'}
          >
            Export
          </Button>
        </div>
      )
    }
  ];

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-500">Total Codes</div>
        <div className="mt-1 text-2xl font-semibold text-gray-900">
          {codes.length}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-500">Available</div>
        <div className="mt-1 text-2xl font-semibold text-green-600">
          {codes.filter(c => c.status === 'available').length}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-500">Used</div>
        <div className="mt-1 text-2xl font-semibold text-gray-600">
          {codes.filter(c => c.status === 'used').length}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-gray-500">Reserved</div>
        <div className="mt-1 text-2xl font-semibold text-yellow-600">
          {codes.filter(c => c.status === 'reserved').length}
        </div>
      </Card>
    </div>
  );

  const renderInfo = () => (
    <div className="mb-6">
      <Card className="p-6 bg-blue-50">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About {activeTab.toUpperCase()} Codes
        </h3>
        <div className="prose prose-sm text-blue-800">
          {activeTab === 'isrc' ? (
            <>
              <p>
                International Standard Recording Codes (ISRC) are unique identifiers
                for sound recordings and music videos. Each code:
              </p>
              <ul className="mt-2">
                <li>Is globally unique and permanent</li>
                <li>Helps track usage and royalties</li>
                <li>Is required for digital distribution</li>
                <li>Follows the format: CC-XXX-YY-NNNNN</li>
              </ul>
            </>
          ) : (
            <>
              <p>
                Universal Product Codes (UPC) are unique identifiers for your music
                releases. Each code:
              </p>
              <ul className="mt-2">
                <li>Identifies your entire release</li>
                <li>Is required by digital stores</li>
                <li>Helps track sales and analytics</li>
                <li>Is a 12-digit number</li>
              </ul>
            </>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Code Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your ISRC and UPC codes
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowGenerateModal(true)}
        >
          Generate New Codes
        </Button>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-6"
          />
        )}

        {renderStats()}
        {renderInfo()}

        <Card>
          <Table
            columns={columns}
            data={codes}
            loading={loading}
            emptyMessage={`No ${activeTab.toUpperCase()} codes found`}
          />
        </Card>
      </div>

      <Modal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title={`Generate ${activeTab.toUpperCase()} Codes`}
      >
        <Form onSubmit={handleGenerateCodes} className="space-y-4">
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
            {activeTab === 'isrc' ? (
              'ISRC codes will be generated following the international standard format.'
            ) : (
              'UPC codes will be generated following the GS1 standard.'
            )}
          </div>
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
              loading={loading}
            >
              Generate
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CodeManagement;