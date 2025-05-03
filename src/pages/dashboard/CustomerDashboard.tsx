import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import { ShoppingCart, MapPin } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  farmer_id: string;
  profiles: {
    full_name: string;
    location: string;
    state: string;
  };
}

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          profiles (
            full_name,
            location,
            state
          )
        `)
        .eq('available', true)
        .gt('quantity', 0);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity: 1,
      farmerId: product.farmer_id,
      farmerName: product.profiles.full_name,
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

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse">Loading products...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-sm text-slate-500 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{product.profiles.location}, {product.profiles.state}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-slate-900">₦{product.price}</div>
                      <div className="text-sm text-slate-500">per {product.unit}</div>
                    </div>
                    <button 
                      className="btn btn-primary py-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;