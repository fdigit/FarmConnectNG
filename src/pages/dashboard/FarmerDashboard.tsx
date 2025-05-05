import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
}

interface Order {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  createdAt: string;
}

interface FarmerProfile {
  _id: string;
  name: string;
  email: string;
  farmName: string;
  location: string;
  phone: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  idCardUrl: string;
  vacationMode: boolean;
}

interface Earnings {
  total: number;
  pending: number;
  available: number;
  lastWithdrawal: string;
}

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [earnings, setEarnings] = useState<Earnings | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'profile' | 'earnings'>('products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
    fetchProducts();
    fetchOrders();
    fetchEarnings();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/farmer/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/farmer', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/farmer/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fetchEarnings = async () => {
    try {
      const response = await fetch('/api/farmer/earnings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch earnings');
      const data = await response.json();
      setEarnings(data.earnings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleVacationMode = async () => {
    try {
      const response = await fetch('/api/farmer/vacation-mode', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vacationMode: !profile?.vacationMode })
      });
      if (!response.ok) throw new Error('Failed to update vacation mode');
      fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await fetch(`/api/farmer/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update order status');
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleWithdrawal = async () => {
    try {
      const response = await fetch('/api/farmer/withdraw', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to process withdrawal');
      fetchEarnings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Status Banner */}
      {!profile.isVerified && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">
            Your account is pending verification. Please upload a valid government ID.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <button
          onClick={handleVacationMode}
          className={`px-4 py-2 rounded-lg ${
            profile.vacationMode ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {profile.vacationMode ? 'Disable Vacation Mode' : 'Enable Vacation Mode'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'products' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'orders' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'profile' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'earnings' ? 'bg-primary-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">My Products</h2>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg">
              Add New Product
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow p-6">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-primary-600">₦{product.price}</p>
                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Orders</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                    <td className="px-6 py-4">{order.productName}</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4">₦{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleOrderStatus(order._id, e.target.value as Order['status'])}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Farm Profile</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Farm Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Farm Name</label>
                    <p className="mt-1">{profile.farmName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1">{profile.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1">{profile.phone}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        profile.verificationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        profile.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {profile.verificationStatus}
                      </span>
                    </p>
                  </div>
                  {!profile.isVerified && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload ID Card</label>
                      <input
                        type="file"
                        className="mt-1 block w-full"
                        accept="image/*"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && earnings && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Earnings Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-primary-600">₦{earnings.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Available for Withdrawal</h3>
              <p className="text-3xl font-bold text-green-600">₦{earnings.available}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Pending Earnings</h3>
              <p className="text-3xl font-bold text-yellow-600">₦{earnings.pending}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Withdrawal History</h3>
                <p className="text-sm text-gray-500">
                  Last withdrawal: {new Date(earnings.lastWithdrawal).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handleWithdrawal}
                disabled={earnings.available <= 0}
                className={`px-4 py-2 rounded-lg ${
                  earnings.available > 0 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;