import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, MapPin } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  farmer: {
    name: string;
    location: string;
  };
}

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      farmerId: product.farmer.name,
      farmerName: product.farmer.name,
    });
  };

  const categories = [
    'all',
    'Vegetables',
    'Fruits',
    'Grains',
    'Tubers',
    'Livestock',
    'Fish',
    'Dairy',
    'Spices'
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata?.full_name || 'Customer'}!</h1>
          <p className="text-slate-600 mt-1">Browse and buy fresh produce directly from farmers</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex overflow-x-auto pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow p-6">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-primary-600">₦{product.price}</p>
            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Farmer: {product.farmer.name}</p>
              <p className="text-sm text-gray-600">Location: {product.farmer.location}</p>
            </div>
            <button 
              className="mt-4 w-full btn btn-primary"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;