import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Apple, Wheat, Rotate3D as Potato, Bird, Fish, Milk, CaseUpper as PepperHot } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const getIconComponent = (iconName: string) => {
  const iconProps = { size: 24, className: "text-white" };
  
  switch (iconName) {
    case 'leaf': return <Leaf {...iconProps} />;
    case 'apple': return <Apple {...iconProps} />;
    case 'wheat': return <Wheat {...iconProps} />;
    case 'potato': return <Potato {...iconProps} />;
    case 'bird': return <Bird {...iconProps} />;
    case 'fish': return <Fish {...iconProps} />;
    case 'milk': return <Milk {...iconProps} />;
    case 'pepper': return <PepperHot {...iconProps} />;
    default: return <Leaf {...iconProps} />;
  }
};

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse through our diverse range of farm-fresh products directly from Nigerian farmers
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/marketplace?category=${category.name}`}
              className="group animate-enter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 group-hover:shadow-md h-full flex flex-col">
                <div className="flex items-center justify-center p-5 bg-gradient-to-r from-primary-600 to-primary-500">
                  <div className="relative z-10">
                    {getIconComponent(category.icon)}
                  </div>
                  <div className="absolute w-16 h-16 bg-white rounded-full opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </div>
                <div className="p-4 text-center flex-grow flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/marketplace" className="btn btn-primary inline-flex items-center">
            View All Products
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;