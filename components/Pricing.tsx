import React, { useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Check, Zap } from 'lucide-react';
import { Button } from './ui/Button';

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <SectionWrapper id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-display mb-4 text-stranger-glow">Choose The Perfect Plan</h2>
        <p className="text-gray-400 mb-8 font-serif">Unlock the full potential of AIONYX with our pro tiers.</p>
        
        {/* Toggle */}
        <div className="inline-flex items-center p-1 bg-white/5 rounded border border-white/10">
          <button 
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded text-sm font-bold uppercase transition-all ${!isYearly ? 'bg-stranger-red text-white shadow-[0_0_10px_rgba(255,9,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
             onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded text-sm font-bold uppercase transition-all ${isYearly ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Yearly (20% Off)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plan 1 */}
        <div className="p-8 rounded-sm bg-glass-bg border border-glass-border hover:border-stranger-red/50 transition-colors relative group backdrop-blur-md">
          <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wider">Starter Plan</h3>
          <p className="text-gray-400 text-sm mb-6 font-serif">Perfect for hobbyists and explorers.</p>
          <div className="mb-8">
             <span className="text-4xl font-bold font-display text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">${isYearly ? '29.99' : '39.99'}</span>
             <span className="text-gray-500"> USD / {isYearly ? 'year' : 'month'}</span>
          </div>
          <ul className="space-y-4 mb-8">
            {[1,2,3,4].map((_, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-stranger-red/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-stranger-red" />
                </div>
                High speed generation priority
              </li>
            ))}
             <li className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
                  <Check className="w-3 h-3 text-gray-600" />
                </div>
                Commercial license included
              </li>
          </ul>
          <Button variant="outline" className="w-full group-hover:bg-stranger-red group-hover:text-white group-hover:border-stranger-red transition-all">Choose Starter</Button>
        </div>

        {/* Plan 2 */}
        <div className="p-8 rounded-sm bg-gradient-to-b from-red-900/20 to-glass-bg border border-stranger-red relative shadow-[0_0_30px_rgba(255,9,0,0.1)]">
          <div className="absolute top-0 right-0 bg-stranger-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">POPULAR</div>
          <h3 className="text-xl font-bold mb-2 text-white font-display uppercase tracking-wider text-stranger-glow">Professional Plan</h3>
          <p className="text-gray-400 text-sm mb-6 font-serif">For power users and agencies.</p>
          <div className="mb-8">
             <span className="text-5xl font-bold font-display text-stranger-red drop-shadow-[0_0_10px_rgba(255,9,0,0.6)]">${isYearly ? '45.99' : '57.99'}</span>
             <span className="text-gray-500"> USD / {isYearly ? 'year' : 'month'}</span>
          </div>
          <ul className="space-y-4 mb-8">
            {[1,2,3,4,5].map((_, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white">
                <div className="w-5 h-5 rounded-full bg-stranger-red flex items-center justify-center shadow-[0_0_10px_rgba(255,9,0,0.4)]">
                  <Check className="w-3 h-3 text-white" />
                </div>
                All Starter features plus advanced editing
              </li>
            ))}
          </ul>
          <Button className="w-full">Choose Professional</Button>
        </div>
      </div>
    </SectionWrapper>
  );
};