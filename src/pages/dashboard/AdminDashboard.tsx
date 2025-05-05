import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PendingFarmer {
  _id: string;
  name: string;
  email: string;
  farmName: string;
  location: string;
  idCardUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  farmerId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [pendingFarmers, setPendingFarmers] = useState<PendingFarmer[]>([]);
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'farmers' | 'products'>('farmers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingFarmers();
    fetchPendingProducts();
  }, []);

  const fetchPendingFarmers = async () => {
    try {
      const response = await fetch('/api/admin/pending-farmers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch pending farmers');
      const data = await response.json();
      setPendingFarmers(data.farmers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingProducts = async () => {
    try {
      const response = await fetch('/api/admin/pending-products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch pending products');
      const data = await response.json();
      setPendingProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleFarmerApproval = async (farmerId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/farmers/${farmerId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update farmer status');
      fetchPendingFarmers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleProductApproval = async (productId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update product status');
      fetchPendingProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'farmers' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('farmers')}
        >
          Pending Farmers
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'products' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Pending Products
        </button>
      </div>

      {/* Pending Farmers Section */}
      {activeTab === 'farmers' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Farmer Approvals</h2>
          {pendingFarmers.map((farmer) => (
            <div key={farmer._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{farmer.name}</h3>
                  <p className="text-gray-600">{farmer.email}</p>
                  <p className="text-gray-600">Farm: {farmer.farmName}</p>
                  <p className="text-gray-600">Location: {farmer.location}</p>
                  <p className="text-sm text-gray-500">
                    Applied: {new Date(farmer.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleFarmerApproval(farmer._id, 'approved')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleFarmerApproval(farmer._id, 'rejected')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">ID Verification</h4>
                <img
                  src={farmer.idCardUrl}
                  alt="ID Card"
                  className="w-64 h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending Products Section */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Product Approvals</h2>
          {pendingProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleProductApproval(product._id, 'approved')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProductApproval(product._id, 'rejected')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 