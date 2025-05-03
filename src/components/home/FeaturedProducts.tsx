import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { FEATURED_PRODUCTS } from '../../data/mockData';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-slate-600">Handpicked fresh produce from verified Nigerian farmers</p>
          </div>
          <Link to="/marketplace" className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium inline-flex items-center transition-colors">
            View All Products
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.slice(0, 8).map((product, index) => (
            <div key={product.id} className="animate-enter" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;