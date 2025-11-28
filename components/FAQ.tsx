import React, { useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  { question: "How To Change My Photo From Admin Dashboard?", answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast." },
  { question: "How To Change My Password Easily?", answer: "Navigate to your settings page, click on security, and follow the prompts to update your credentials securely." },
  { question: "How To Change My Subscription Plan?", answer: "Go to Billing settings, select 'Manage Subscription', and choose your payment method for the new plan." },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper className="bg-void-black border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-display mb-4 text-stranger-glow">Burning Questions</h2>
        <p className="text-gray-400 font-serif">Simple questions for complex dimensions.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, idx) => (
          <div 
            key={idx}
            className={`rounded-sm overflow-hidden transition-all duration-300 border ${openIndex === idx ? 'bg-[#0a0000] border-stranger-red/50 shadow-[0_0_15px_rgba(255,9,0,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-bold font-display tracking-wide ${openIndex === idx ? 'text-stranger-red' : 'text-gray-300'}`}>{faq.question}</span>
              {openIndex === idx ? <Minus className="text-stranger-red" /> : <Plus className="text-gray-500" />}
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-sm text-gray-400 leading-relaxed font-serif border-t border-white/5 mt-2 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};