import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { NIGERIA_STATES } from '../../data/mockData';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute top-1/4 right-1/2 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white"></div>
      </div>

      <div className="container-custom py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-enter" style={{animationDelay: '0.1s'}}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Direct from Nigerian <span className="text-secondary-400">Farmers</span> to Your Table
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Support local farmers and get fresh, quality produce at fair prices without middlemen. Find everything from fresh vegetables to livestock, all in one place.
            </p>
            
            {/* Search Component */}
            <div className="bg-white p-2 rounded-lg shadow-lg flex items-center mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search for farm products..." 
                  className="w-full pl-10 py-3 bg-transparent text-slate-800 focus:outline-none" 
                />
              </div>
              
              <div className="relative flex-shrink-0 mx-2">
                <select className="form-input w-full px-3 py-3 pr-8 appearance-none bg-slate-50 border-0 text-slate-800">
                  <option value="">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="tubers">Tubers</option>
                  <option value="livestock">Livestock</option>
                </select>
              </div>
              
              <button className="btn btn-primary py-3 px-6">
                Search
              </button>
            </div>
            
            {/* Popular States Quick Links */}
            <div className="flex flex-wrap items-center text-sm">
              <span className="mr-2 text-slate-300">Popular States:</span>
              {['Lagos', 'Abuja', 'Oyo', 'Kano', 'Rivers'].map((state) => (
                <Link 
                  key={state} 
                  to={`/marketplace?state=${state}`}
                  className="mr-4 text-white hover:text-secondary-300 transition-colors"
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="hidden lg:block relative animate-enter" style={{animationDelay: '0.3s'}}>
            <img 
              src="https://images.pexels.com/photos/2929227/pexels-photo-2929227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Nigerian Farmer with fresh produce" 
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-start">
                <img 
                  src="https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Satisfied customer" 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="text-yellow-400 flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-800 text-sm">"The freshest tomatoes I've ever bought! Great value and supporting local farmers feels good."</p>
                  <p className="text-slate-500 text-xs mt-1">- Chioma A. (Lagos)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f8fafc" className="w-full h-auto">
          <path d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;