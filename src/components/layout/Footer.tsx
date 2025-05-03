import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-full">
                <Leaf size={24} />
              </div>
              <div>
                <span className="font-bold text-xl text-white">Farm<span className="text-secondary-500">Connect</span></span>
                <span className="text-xs block text-slate-400">Nigeria</span>
              </div>
            </div>
            <p className="text-slate-400 mb-6">
              Connecting Nigerian farmers directly to consumers, eliminating middlemen, and ensuring fair prices for all.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary-600 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/marketplace" className="text-slate-400 hover:text-primary-400 transition">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-slate-400 hover:text-primary-400 transition">
                  Our Farmers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-primary-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-primary-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-400 hover:text-primary-400 transition">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/marketplace?category=Vegetables" className="text-slate-400 hover:text-primary-400 transition">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Fruits" className="text-slate-400 hover:text-primary-400 transition">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Grains" className="text-slate-400 hover:text-primary-400 transition">
                  Grains & Cereals
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Livestock" className="text-slate-400 hover:text-primary-400 transition">
                  Livestock & Poultry
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Fish" className="text-slate-400 hover:text-primary-400 transition">
                  Fish & Seafood
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span>123 Agric Road, Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span>+234 803 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span>info@farmconnect.ng</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} FarmConnect Nigeria. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-6">
            <Link to="/terms" className="hover:text-primary-400 transition">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary-400 transition">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-primary-400 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;