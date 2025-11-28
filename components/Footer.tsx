import React from 'react';
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mic, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#000] pt-20 pb-10 border-t border-stranger-red/10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-stranger-red w-8 h-8 animate-pulse" />
              <span className="text-2xl font-bold font-display tracking-widest text-white text-stranger-glow">AI.ONYX</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">Let's Make Things Happen</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-serif">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-stranger-red hover:text-white transition-colors text-gray-400">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Home', 'Pages', 'About Us', 'Services'].map(item => (
                <li key={item}><a href="#" className="hover:text-stranger-red transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Link</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Pages', 'Contact', 'About Us', '404'].map(item => (
                <li key={item}><a href="#" className="hover:text-stranger-red transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
            <div className="space-y-6">
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-red-900 to-black border border-stranger-red/30 flex items-center justify-center shrink-0">
                    <Mic className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-white font-bold text-sm">(09)765438082</p>
                   <p className="text-gray-500 text-xs">I am text block. Click edit button.</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-white font-bold text-sm">Support@Aionyx.id</p>
                   <p className="text-gray-500 text-xs">I am text block. Click edit button.</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-red-900 to-black border border-stranger-red/30 flex items-center justify-center shrink-0">
                    <MapPin className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-white font-bold text-sm">London Eye, UK</p>
                   <p className="text-gray-500 text-xs">I am text block. Change.</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
           <p>Aionyx Template Kit by Kitpro</p>
           <p>Copyright © 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};