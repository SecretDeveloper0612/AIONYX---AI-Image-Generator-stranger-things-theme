import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Wand2, Image, Sliders, PlayCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const SERVICES = [
  {
    title: "Text-To-Image",
    desc: "Transform simple words into elaborate, high-quality images. Our semantic understanding engine ensures your prompt is respected to the pixel.",
    img: "https://picsum.photos/600/300?random=20",
    icon: Wand2,
    color: "from-red-600 to-orange-900",
    badges: ["16 MP Resolution", "98% Precision"]
  },
  {
    title: "AI Visual Enhancement",
    desc: "Upscale low-resolution photos, remove noise, and fix lighting instantly. Perfect for restoring old memories or improving product shots.",
    img: "https://picsum.photos/600/300?random=21",
    icon: Sliders,
    color: "from-red-900 to-black",
    badges: ["Realistic Image", "Instant Process", "Emotion Control"]
  },
  {
    title: "AI Photo Refining",
    desc: "Edit existing images with magic eraser, object replacement, and style transfer. Modify specific regions without affecting the whole composition.",
    img: "https://picsum.photos/600/300?random=22",
    icon: Image,
    color: "from-orange-700 to-red-900",
    badges: ["Optimization", "Auto-Color Grade"]
  }
];

export const Services: React.FC = () => {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-stranger-glow">Our AI Services</h2>
        <p className="text-gray-400 font-serif italic">Advanced tools designed for the next generation of creators.</p>
      </div>

      <div className="space-y-12">
        {SERVICES.map((service, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 p-6 md:p-10 rounded-sm bg-glass-bg border border-glass-border hover:border-stranger-red/50 transition-all duration-500 group shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
          >
            {/* Text Side */}
            <div className="flex-1 space-y-6">
              <div className={`w-12 h-12 rounded bg-gradient-to-br ${service.color} flex items-center justify-center border border-white/10 shadow-[0_0_10px_rgba(255,0,0,0.4)]`}>
                <service.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold font-display">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed font-serif">{service.desc}</p>
              
              <div className="flex flex-wrap gap-4">
                {service.badges.map((badge, i) => (
                   <span key={i} className="flex items-center gap-2 text-sm text-gray-300">
                     <div className="w-4 h-4 rounded-full bg-stranger-red/20 flex items-center justify-center text-[10px] text-stranger-red">✓</div>
                     {badge}
                   </span>
                ))}
              </div>

              <Button variant="outline" size="sm" withArrow className="mt-4">
                View More
              </Button>
            </div>

            {/* Image Side */}
            <div className="flex-1 w-full">
              <div className="relative rounded overflow-hidden group-hover:shadow-[0_0_30px_rgba(255,9,0,0.2)] transition-all duration-500 border border-white/5">
                 <img src={service.img} alt={service.title} className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[0.3]" />
                 {index === 1 && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                     <PlayCircle className="w-16 h-16 text-stranger-red opacity-80 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                   </div>
                 )}
                 {index === 2 && (
                    <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-900 rounded-full overflow-hidden border border-white/10">
                       <div className="h-full bg-gradient-to-r from-red-800 to-stranger-red w-[90%]"></div>
                       <span className="absolute right-0 bottom-3 text-xs font-bold text-stranger-red">90%</span>
                    </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Founders / Extra Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
         <div className="relative rounded-sm overflow-hidden h-[400px] group border border-stranger-red/20">
            <img src="https://picsum.photos/600/800?random=50" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Creative Generation" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-bold mb-2 font-display">Step 2: Creative Generation</h3>
              <p className="text-sm text-gray-300 mb-4 max-w-xs font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="flex items-center gap-2 text-sm font-bold text-stranger-red hover:text-white transition-colors uppercase tracking-widest">Read More <ArrowRight className="w-4 h-4" /></button>
            </div>
         </div>
         <div className="relative rounded-sm overflow-hidden h-[400px] group border border-stranger-red/20">
            <img src="https://picsum.photos/600/800?random=51" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Refined Perfection" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
             <div className="absolute bottom-8 left-8">
               <h3 className="text-2xl font-bold mb-2 font-display">Step 3: Refined Perfection</h3>
               <p className="text-sm text-gray-300 mb-4 max-w-xs font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               <button className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-white transition-colors uppercase tracking-widest">Read More <ArrowRight className="w-4 h-4" /></button>
             </div>
         </div>
      </div>
    </SectionWrapper>
  );
};