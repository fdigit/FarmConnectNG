import React from 'react';
import { Search, Truck, CreditCard, ThumbsUp } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <Search size={32} className="text-primary-500" />,
    title: 'Browse Products',
    description: 'Search for farm products based on category, location, or farmer.'
  },
  {
    id: 2,
    icon: <CreditCard size={32} className="text-primary-500" />,
    title: 'Place Order',
    description: 'Add products to cart and complete the purchase with secure payment options.'
  },
  {
    id: 3,
    icon: <Truck size={32} className="text-primary-500" />,
    title: 'Receive Delivery',
    description: 'Get your fresh farm products delivered directly to your doorstep.'
  },
  {
    id: 4,
    icon: <ThumbsUp size={32} className="text-primary-500" />,
    title: 'Enjoy & Support',
    description: 'Enjoy fresh produce while supporting Nigerian farmers directly.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How FarmConnect Works</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our simple process connects you directly with farmers for the freshest produce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center text-center animate-enter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold">
                {step.id}
              </div>
              
              {/* Icon */}
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
              
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 transform translate-x-1/2">
                  <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10H75" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="2 2"/>
                    <path d="M75 10L65 5V15L75 10Z" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;