import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, MapPin, Leaf } from 'lucide-react';
import CartDropdown from '../cart/CartDropdown';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-600 text-white p-2 rounded-full">
            <Leaf size={24} />
          </div>
          <div>
            <span className="font-bold text-xl text-primary-800">Farm<span className="text-secondary-600">Connect</span></span>
            <span className="text-xs block text-slate-600">Nigeria</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-800 hover:text-primary-600 font-medium transition">
            Home
          </Link>
          <Link to="/marketplace" className="text-slate-800 hover:text-primary-600 font-medium transition">
            Marketplace
          </Link>
          <Link to="/farmers" className="text-slate-800 hover:text-primary-600 font-medium transition">
            Farmers
          </Link>
          <Link to="/about" className="text-slate-800 hover:text-primary-600 font-medium transition">
            About
          </Link>
        </nav>

        {/* Search bar - appears on scroll on desktop */}
        <div className={`hidden md:flex items-center relative transition-all duration-300 ${
          isScrolled ? 'w-64 opacity-100' : 'w-0 opacity-0'
        } overflow-hidden`}>
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-full bg-slate-100 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-slate-100">
            <MapPin size={20} className="text-slate-600" />
          </button>
          <CartDropdown />
          <Link to="/auth/login" className="btn btn-outline ml-2">
            Login
          </Link>
          <Link to="/auth/register" className="btn btn-primary">
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-slate-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-slate-800" />
          ) : (
            <Menu size={24} className="text-slate-800" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 animate-enter">
          <div className="container-custom py-4 flex flex-col">
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-md bg-slate-100 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <nav className="flex flex-col space-y-4 border-t border-slate-100 pt-4">
              <Link to="/" className="text-slate-800 font-medium py-2 hover:text-primary-600 transition">
                Home
              </Link>
              <Link to="/marketplace" className="text-slate-800 font-medium py-2 hover:text-primary-600 transition">
                Marketplace
              </Link>
              <Link to="/farmers" className="text-slate-800 font-medium py-2 hover:text-primary-600 transition">
                Farmers
              </Link>
              <Link to="/about" className="text-slate-800 font-medium py-2 hover:text-primary-600 transition">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-white border border-slate-200 rounded-md">
                <ShoppingCart size={18} />
                <span>Cart ({cart.items.length})</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-white border border-slate-200 rounded-md">
                <User size={18} />
                <span>Account</span>
              </button>
            </div>
            <div className="flex mt-4 gap-3">
              <Link to="/auth/login" className="btn btn-outline flex-1 justify-center">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary flex-1 justify-center">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;