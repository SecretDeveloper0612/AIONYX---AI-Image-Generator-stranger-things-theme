import React, { useEffect, useRef } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Target, Eye, Users, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const gs = window.gsap;
    if (!gs) return;

    gs.from(leftRef.current, {
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 80%",
      },
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    gs.from(gs.utils.selector(rightRef.current)(".reveal-card"), {
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });
  }, []);

  return (
    <SectionWrapper id="about" className="bg-void-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Image Side */}
        <div ref={leftRef} className="relative">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
            Born From A <br />
            <span className="text-stranger-red text-stranger-glow">Passion For The Unknown</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 font-serif">
            AIONYX was forged in the dark. We believe that everyone has a masterpiece inside them, waiting to be unlocked. Our AI engine bridges the gap between imagination and reality, providing professional-grade tools for hobbyists and enterprises alike.
          </p>
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-stranger-red to-black rounded-sm blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
             <div className="relative h-[400px] w-full rounded-sm overflow-hidden border border-stranger-red/20">
                <img src="https://picsum.photos/800/800?random=10" alt="About Art" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-stranger-red/20 rounded border border-stranger-red">
                      <Zap className="text-stranger-red w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold font-display tracking-wider">AI Retouching</h4>
                      <div className="flex gap-4 text-xs text-red-400 mt-1">
                        <span>16 MP Resolution</span>
                        <span>98% Precision</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Content Side */}
        <div ref={rightRef} className="space-y-8">
          <div className="reveal-card p-6 rounded-sm bg-glass-bg border border-glass-border backdrop-blur-md hover:border-stranger-red/60 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-display">Mission</h3>
              <Target className="text-stranger-red" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              To empower creativity by providing innovative AI tools for easy and efficient image creation across all industries.
            </p>
            <div className="h-24 w-full rounded overflow-hidden relative grayscale hover:grayscale-0 transition-all">
               <img src="https://picsum.photos/400/200?random=11" alt="Mission" className="w-full h-full object-cover opacity-70" />
            </div>
          </div>

          <div className="reveal-card p-6 rounded-sm bg-glass-bg border border-glass-border backdrop-blur-md hover:border-stranger-red/60 transition-colors">
             <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-display">Vision</h3>
              <Eye className="text-stranger-red" />
            </div>
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stranger-red/10 flex items-center justify-center border border-stranger-red/30">
                  <Users className="w-5 h-5 text-stranger-red" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display">230M+</h4>
                  <p className="text-xs text-gray-500">Active Users</p>
                </div>
              </div>
              <div className="w-px h-12 bg-stranger-red/20"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stranger-red/10 flex items-center justify-center border border-stranger-red/30">
                  <Zap className="w-5 h-5 text-stranger-red" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display">120K+</h4>
                  <p className="text-xs text-gray-500">Daily Generations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};