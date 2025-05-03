import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, MapPin } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card group animate-enter">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badge for featured products */}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </span>
        )}
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-slate-500 mb-1">{product.category}</div>
        
        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-primary-600 transition-colors">{product.name}</h3>
        </Link>

        {/* Location */}
        <div className="flex items-center text-xs text-slate-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{product.location}, {product.state}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(product.rating) 
                  ? "text-warning-400 fill-warning-400" 
                  : "text-slate-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-slate-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        
        {/* Price & Add to cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            <span className="text-xs text-slate-500 ml-1">/ {product.unit}</span>
          </div>
          <button className="btn btn-primary py-1.5 px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;