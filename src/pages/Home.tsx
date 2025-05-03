import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedFarmers from '../components/home/FeaturedFarmers';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <HowItWorks />
      <FeaturedFarmers />
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default Home;