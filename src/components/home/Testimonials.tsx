import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "FarmConnect has transformed how I sell my produce. I now earn more by selling directly to consumers, cutting out middlemen who used to take a significant portion of my profits.",
    author: "Adebayo Ogunlana",
    role: "Vegetable Farmer",
    location: "Oyo State",
    image: "https://images.pexels.com/photos/7710347/pexels-photo-7710347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    content: "As a busy professional, I've always struggled to find time to visit local markets. FarmConnect delivers fresh produce directly from farms to my doorstep, saving me time while supporting local farmers.",
    author: "Ngozi Okafor",
    role: "Customer",
    location: "Lagos",
    image: "https://images.pexels.com/photos/7595118/pexels-photo-7595118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    content: "The quality of produce I get from FarmConnect is incomparable to what I used to buy at supermarkets. Everything is fresher, tastier, and I love knowing exactly which farm my food comes from.",
    author: "Mohammed Ibrahim",
    role: "Restaurant Owner",
    location: "Abuja",
    image: "https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from farmers and customers who are part of our growing community
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-slate-50 rounded-2xl p-8 md:p-12 shadow-sm">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-primary-200">
              <Quote size={48} />
            </div>
            
            {/* Testimonial content */}
            <div className="relative z-10 text-center animate-enter" key={testimonials[currentIndex].id}>
              <p className="text-lg md:text-xl text-slate-700 mb-8 italic relative z-10">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="flex flex-col items-center">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white shadow-md"
                />
                <div className="text-center">
                  <h4 className="font-bold text-slate-900">{testimonials[currentIndex].author}</h4>
                  <p className="text-slate-600 text-sm">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-primary-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-primary-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary-500' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;