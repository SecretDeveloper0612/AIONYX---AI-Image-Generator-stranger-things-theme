import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { motion } from 'framer-motion';

const STEPS = [
  {
    id: "01",
    title: "Describe Your Idea",
    desc: "Start with a simple text prompt. Write exactly what you imagine — a character, a product, a landscape, or even a dreamlike concept."
  },
  {
    id: "02",
    title: "Select Your Style",
    desc: "Choose from dozens of creative styles: photorealism, anime, 3D render, oil painting, watercolor, cyberpunk, and more."
  },
  {
    id: "03",
    title: "Generate Instantly",
    desc: "Click the \"Generate\" button and let the AI turn your text into a high-quality image in seconds."
  },
  {
    id: "04",
    title: "Customize & Refine",
    desc: "Use smart editing features such as variations, background replacement, and lighting adjustments to make your image perfect."
  }
];

const STATS = [
  { value: "1.4M+", label: "Premium Members" },
  { value: "12.3M+", label: "Total Creations" },
  { value: "9.8M+", label: "Active Creators" },
  { value: "8+", label: "Years Experience" },
];

// Split images into 3 columns for the marquee effect
const COL_1 = [
  "https://picsum.photos/300/400?random=101",
  "https://picsum.photos/300/300?random=102",
  "https://picsum.photos/300/500?random=103",
  "https://picsum.photos/300/400?random=104",
];

const COL_2 = [
  "https://picsum.photos/300/300?random=105",
  "https://picsum.photos/300/500?random=106",
  "https://picsum.photos/300/400?random=107",
  "https://picsum.photos/300/300?random=108",
];

const COL_3 = [
  "https://picsum.photos/300/400?random=109",
  "https://picsum.photos/300/300?random=110",
  "https://picsum.photos/300/500?random=111",
  "https://picsum.photos/300/400?random=112",
];

export const HowItWorks: React.FC = () => {
  return (
    <SectionWrapper id="how-it-works" className="bg-void-black py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        
        {/* Left Side: Text & Steps */}
        <div className="space-y-12">
          <div>
            <span className="inline-block py-1 px-4 rounded border border-stranger-red/30 text-xs font-bold tracking-widest text-stranger-red mb-6 uppercase shadow-[0_0_10px_rgba(255,0,0,0.3)]">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-stranger-glow">
              Discover step the <br />
              <span className="text-white">simplicity and efficiency.</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-md font-serif">
              Turn your ideas into stunning visuals in just a few simple steps.
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-stranger-red/20 hidden md:block"></div>

            {STEPS.map((step, idx) => (
              <div key={idx} className="flex gap-6 relative">
                <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded bg-btn-gradient items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(255,9,0,0.6)] z-10 font-display">
                  {step.id}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 md:hidden">
                    <span className="text-stranger-red font-bold font-display">{step.id}</span>
                    <h3 className="text-xl font-bold text-white font-display">{step.title}</h3>
                  </div>
                  <h3 className="hidden md:block text-xl font-bold text-white font-display">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md font-serif">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Card */}
        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-[#050000] border border-stranger-red/30 rounded-lg p-6 md:p-8 shadow-[0_0_40px_rgba(100,0,0,0.3)] relative overflow-hidden"
          >
            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-4 font-display">Create Awesome Characters</h3>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-stranger-red/20 border border-stranger-red/50 rounded text-[10px] font-bold text-white uppercase tracking-wider">Fast Processing</span>
                <span className="px-3 py-1 bg-stranger-red/20 border border-stranger-red/50 rounded text-[10px] font-bold text-white uppercase tracking-wider">High-Resolution</span>
                <span className="px-3 py-1 bg-stranger-red/20 border border-stranger-red/50 rounded text-[10px] font-bold text-white uppercase tracking-wider">Styles</span>
              </div>

              {/* Marquee Columns Container */}
              <div className="grid grid-cols-3 gap-3 h-[400px] overflow-hidden relative mask-gradient-vertical">
                {/* Fade masks for top/bottom smoothness */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#050000] to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#050000] to-transparent z-10"></div>

                {/* Column 1: Up */}
                <div className="relative">
                   <div className="animate-marquee-vertical-up flex flex-col gap-3">
                      {[...COL_1, ...COL_1].map((img, i) => (
                        <div key={`c1-${i}`} className="w-full rounded overflow-hidden shadow-lg border border-white/5 sepia-[0.3]">
                           <img src={img} className="w-full h-auto object-cover" alt="AI Gen" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Column 2: Down */}
                <div className="relative">
                   <div className="animate-marquee-vertical-down flex flex-col gap-3" style={{ transform: 'translateY(-50%)' }}>
                      {[...COL_2, ...COL_2].map((img, i) => (
                        <div key={`c2-${i}`} className="w-full rounded overflow-hidden shadow-lg border border-white/5 sepia-[0.3]">
                           <img src={img} className="w-full h-auto object-cover" alt="AI Gen" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Column 3: Up */}
                <div className="relative">
                   <div className="animate-marquee-vertical-up flex flex-col gap-3">
                      {[...COL_3, ...COL_3].map((img, i) => (
                        <div key={`c3-${i}`} className="w-full rounded overflow-hidden shadow-lg border border-white/5 sepia-[0.3]">
                           <img src={img} className="w-full h-auto object-cover" alt="AI Gen" />
                        </div>
                      ))}
                   </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-stranger-red/10 pt-16">
        {STATS.map((stat, idx) => (
          <div key={idx} className="text-center md:text-left">
            <h4 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-red-900 font-display mb-2 drop-shadow-lg">
              {stat.value}
            </h4>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};