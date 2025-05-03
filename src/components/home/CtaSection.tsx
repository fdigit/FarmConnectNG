import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Image */}
          <div className="order-2 lg:order-1 animate-enter">
            <img 
              src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Nigerian farmer with produce" 
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 animate-enter" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Are You a Nigerian Farmer Looking to Expand Your Market?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join our community of successful farmers who are selling directly to consumers across Nigeria. Eliminate middlemen, set your own prices, and grow your business.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-1 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Reach more customers across Nigeria</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-1 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Set your own prices and earn more for your produce</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-1 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Gain access to resources, training, and farming tips</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-1 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Build a loyal customer base with direct relationships</p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register" className="btn bg-white text-secondary-700 hover:bg-slate-100 flex items-center justify-center">
                Register as a Farmer
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/learn-more" className="btn bg-secondary-800 text-white hover:bg-secondary-900 flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;