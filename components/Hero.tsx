import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { SectionWrapper } from './ui/SectionWrapper';

const PLACEHOLDER_IMAGES = [
  "https://picsum.photos/400/600?random=1",
  "https://picsum.photos/400/600?random=2",
  "https://picsum.photos/400/600?random=3",
  "https://picsum.photos/400/600?random=4",
  "https://picsum.photos/400/600?random=5",
];

interface HeroProps {
  onNavigate: (view: 'home' | 'generator') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const monsterRef = useRef(null);
  const contentRef = useRef(null);
  const elevenRef = useRef(null);
  const demoRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const gs = window.gsap;
    if (!gs) return;

    // Mind Flayer Parallax & Scale
    gs.to(monsterRef.current, {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 150,
      scale: 1.2,
      opacity: 0,
    });

    // Content fade and lift
    gs.to(contentRef.current, {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "50% top",
        scrub: true,
      },
      y: -100,
      opacity: 0,
    });

    // Character Parallax
    gs.to(elevenRef.current, {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -250,
      x: 50,
    });

    gs.to(demoRef.current, {
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -150,
      x: -50,
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <SectionWrapper 
      id="home" 
      className="pt-32 pb-0 flex flex-col items-center justify-center min-h-screen bg-hero-glow overflow-hidden relative"
      animate={false}
    >
      {/* 1. Ash / Spores */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400/50 rounded-full animate-ash-drift pointer-events-none z-20 blur-[0.5px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}

      {/* 2. Red Lightning Overlay */}
      <div className="absolute inset-0 bg-red-600/10 z-0 animate-lightning pointer-events-none mix-blend-color-dodge"></div>

      {/* 3. Shadow Monster (Mind Flayer) Background */}
      <div ref={monsterRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-60 pointer-events-none z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2a0505] blur-[120px] animate-pulse-slow mix-blend-screen"></div>
         {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-48 h-[600px] bg-gradient-to-b from-gray-800/40 via-red-900/20 to-transparent origin-top blur-3xl animate-pulse-slow" 
              style={{ 
                transform: `rotate(${deg}deg) translateY(-80px)`,
                animationDelay: `${i * 0.5}s`
              }} 
            />
         ))}
      </div>

      {/* 4. ELEVEN (Levitating Right) */}
      <div ref={elevenRef} className="absolute top-20 right-[5%] md:right-[15%] z-20 pointer-events-none hidden md:block animate-float">
        <div className="relative w-64 h-96 opacity-100 drop-shadow-[0_0_15px_rgba(255,9,0,0.3)]">
           <div className="absolute inset-0 bg-stranger-red/20 blur-xl rounded-full animate-pulse-slow"></div>
           <svg viewBox="0 0 100 200" className="w-full h-full fill-gray-900 stroke-stranger-red stroke-[1]">
              <path d="M45,20 C55,20 60,30 60,40 C60,45 58,48 58,55 L58,60 L75,60 C85,60 90,55 95,50 L95,55 C90,65 85,70 75,70 L60,70 L60,110 L70,180 L80,180 L80,190 L55,190 L50,130 L45,190 L20,190 L20,180 L30,180 L40,110 L40,70 L30,70 L30,55 L40,55 C40,48 38,45 40,40 C40,30 35,20 45,20 Z" />
              <circle cx="95" cy="52" r="4" className="fill-stranger-red animate-ping" />
           </svg>
        </div>
      </div>

      {/* 5. DEMOGORGON (Lurking Left) */}
      <div ref={demoRef} className="absolute top-10 left-[2%] md:left-[10%] z-10 pointer-events-none opacity-60 hidden md:block">
         <div className="w-80 h-80 animate-pulse-slow">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-[#1a0505] drop-shadow-[0_0_10px_rgba(50,0,0,0.8)]">
               <path d="M100,50 Q120,20 140,50 T180,90 Q190,120 160,140 T100,180 Q40,140 20,120 T60,50 Q80,20 100,50 Z" className="blur-[1px]" />
               <path d="M100,100 L100,60 M100,100 L140,80 M100,100 L130,130 M100,100 L70,130 M100,100 L60,80" stroke="#500" strokeWidth="3" />
            </svg>
         </div>
      </div>

      {/* 6. Bike Group (Bottom Parallax) */}
      <div className="absolute bottom-20 md:bottom-32 left-0 w-full z-10 pointer-events-none overflow-hidden h-40">
         <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-stranger-red/20 via-stranger-red/5 to-transparent blur-xl"></div>
         <div className="animate-bike-ride absolute left-0 bottom-4 flex gap-12 opacity-100">
             <svg width="100" height="80" viewBox="0 0 100 80" className="text-gray-900 fill-current drop-shadow-[0_0_5px_rgba(255,9,0,0.8)] transform scale-100">
                <g transform="translate(0, 0)">
                   <circle cx="20" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <circle cx="60" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <path d="M20 60 L35 45 L45 60 L60 60 M35 45 L30 35" stroke="currentColor" strokeWidth="3" fill="none" />
                   <rect x="32" y="25" width="6" height="20" rx="2" fill="currentColor" />
                   <circle cx="35" cy="20" r="5" fill="currentColor" />
                </g>
             </svg>
             <svg width="100" height="80" viewBox="0 0 100 80" className="text-gray-900 fill-current drop-shadow-[0_0_5px_rgba(255,9,0,0.8)] transform scale-90 translate-y-2">
                <g transform="translate(0, 0)">
                   <circle cx="20" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <circle cx="60" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <path d="M20 60 L35 45 L45 60 L60 60 M35 45 L30 35" stroke="currentColor" strokeWidth="3" fill="none" />
                   <rect x="32" y="28" width="8" height="18" rx="2" fill="currentColor" />
                   <path d="M30 20 H40 V24 H30 Z M40 22 H44 V24 H40 Z" fill="currentColor" />
                   <circle cx="35" cy="22" r="5" fill="currentColor" />
                </g>
             </svg>
             <svg width="100" height="80" viewBox="0 0 100 80" className="text-gray-900 fill-current drop-shadow-[0_0_5px_rgba(255,9,0,0.8)] transform scale-105 -translate-y-1">
                <g transform="translate(0, 0)">
                   <circle cx="20" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <circle cx="60" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                   <path d="M20 60 L35 45 L45 60 L60 60 M35 45 L30 35" stroke="currentColor" strokeWidth="3" fill="none" />
                   <rect x="32" y="25" width="6" height="20" rx="2" fill="currentColor" />
                   <circle cx="35" cy="20" r="5" fill="currentColor" />
                   <path d="M32 20 L28 22 M32 20 L28 18" stroke="currentColor" strokeWidth="2" />
                </g>
             </svg>
         </div>
      </div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-stranger-red/10 rounded-full blur-[120px] pointer-events-none animate-flicker z-0"></div>
      
      {/* Main Content */}
      <div ref={contentRef} className="relative z-30 text-center max-w-4xl mx-auto mb-16 px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block py-1 px-3 rounded border border-stranger-red/30 text-xs font-bold tracking-[0.2em] text-stranger-red mb-6 uppercase shadow-[0_0_10px_rgba(255,9,0,0.2)] bg-black/50 backdrop-blur-sm">
              Welcome to the Void
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-8xl font-bold font-display leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-stranger-red to-black stroke-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] relative z-10"
            style={{ WebkitTextStroke: '1px #FF0900' }}
          >
            Create Stunning <br />
            Horrors With A <span className="text-white drop-shadow-[0_0_15px_#FF0900]">Prompt</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed font-serif italic relative z-10 bg-black/30 backdrop-blur-sm p-4 rounded"
          >
            Unleash your darkest creativity. Our engine transforms your nightmares into reality in seconds. Enter the Upside Down of art.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <Button size="lg" withArrow onClick={() => onNavigate('generator')}>Enter Generation</Button>
            <Button size="lg" variant="outline">View Gallery</Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Carousel Mockup */}
      <div className="w-full overflow-hidden pb-12 z-30 relative">
        <div className="flex gap-6 animate-float items-center justify-center">
           {PLACEHOLDER_IMAGES.map((img, idx) => (
             <motion.div 
                key={idx}
                className={`relative rounded overflow-hidden border border-stranger-red/20 group cursor-pointer bg-black ${idx === 2 ? 'w-64 h-96 z-10 shadow-[0_0_50px_rgba(255,9,0,0.3)]' : 'w-48 h-72 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0'}`}
                whileHover={{ scale: 1.05 }}
             >
                <img src={img} alt="AI Generated" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-sm font-bold font-display text-stranger-red">Strange Visual</span>
                  <span className="text-xs text-gray-400">High Resolution</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </SectionWrapper>
  );
};