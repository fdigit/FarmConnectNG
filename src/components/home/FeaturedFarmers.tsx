import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { FEATURED_FARMERS } from '../../data/mockData';

const FeaturedFarmers: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Meet Our Farmers</h2>
            <p className="text-slate-600">Connect directly with verified Nigerian farmers</p>
          </div>
          <Link to="/farmers" className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium inline-flex items-center transition-colors">
            View All Farmers
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_FARMERS.map((farmer, index) => (
            <Link 
              key={farmer.id} 
              to={`/farmer/${farmer.id}`}
              className="group animate-enter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 group-hover:shadow-md h-full flex flex-col">
                {/* Farmer Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={farmer.profilePicture} 
                    alt={farmer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">
                    {farmer.name}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-sm text-slate-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span>{farmer.location}, {farmer.state}</span>
                  </div>
                  
                  {/* Rating - using a random rating for demo */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const rating = 4 + Math.random(); // Random rating between 4 and 5
                        return (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(rating) 
                              ? "text-warning-400 fill-warning-400" 
                              : "text-slate-300"
                            }
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-slate-500 ml-1">(Top Seller)</span>
                  </div>
                  
                  {/* Contact button */}
                  <div className="mt-auto">
                    <button className="w-full btn btn-outline group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFarmers;