import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { NavItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', action: 'home' },
  { label: 'Generation', href: '#features', action: 'generator' },
  { label: 'About Us', href: '#about', action: 'home' },
  { label: 'Contact Us', href: '#contact', action: 'home' },
];

interface NavbarProps {
  onNavigate: (view: 'home' | 'generator') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    if (item.action === 'generator') {
      onNavigate('generator');
    } else {
      onNavigate('home');
      setTimeout(() => {
        if (item.href.startsWith('#')) {
          const element = document.querySelector(item.href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-void-black/90 backdrop-blur-lg border-b border-stranger-red/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 rounded border border-stranger-red flex items-center justify-center bg-black shadow-[0_0_10px_rgba(255,9,0,0.3)] group-hover:shadow-[0_0_20px_rgba(255,9,0,0.6)] transition-shadow">
            <Sparkles className="text-stranger-red w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-display tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,9,0,0.8)] border-b-2 border-transparent group-hover:border-stranger-red transition-all">
            AI.ONYX
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
              className="text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-stranger-red transition-colors relative group font-display"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stranger-red transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#ff0900]"></span>
            </motion.button>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="hidden md:block"
        >
          <Button size="sm" variant="outline">Sign In</Button>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-stranger-red">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-void-black border-b border-stranger-red/30 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => handleNavClick(item)}
                  className="text-lg font-bold font-display uppercase text-gray-300 hover:text-stranger-red hover:shadow-[0_0_10px_rgba(255,9,0,0.4)] text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button className="w-full mt-4">Sign In</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};