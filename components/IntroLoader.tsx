
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    // Total duration of the intro before fading out
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Variants for individual letters to drift in from "camera" (scale) and sides
  const letterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      scale: 10 + Math.random() * 10, // Start very close (huge)
      x: (Math.random() - 0.5) * 800, // Random horizontal start
      y: (Math.random() - 0.5) * 800, // Random vertical start
      filter: "blur(10px)"
    }),
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 3.5,
        ease: [0.22, 1, 0.36, 1], // Smooth cinematic easing
      }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        filter: "blur(20px)",
        transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const lineVariants = {
      hidden: { scaleX: 0, opacity: 0 },
      visible: {
          scaleX: 1,
          opacity: 1,
          transition: { delay: 2.8, duration: 1, ease: "easeOut" }
      }
  };

  const text = "AIONYX";

  return (
    <motion.div
        className="fixed inset-0 z-[100] bg-void-black flex flex-col items-center justify-center overflow-hidden"
        initial="visible"
        animate="visible"
        exit="exit"
    >
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 bg-film-grain opacity-30 animate-flicker pointer-events-none mix-blend-overlay"></div>
        
        {/* Red Fog Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-stranger-red/5 via-transparent to-transparent opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4">
            
            {/* Top Glowing Bar */}
            <motion.div
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[80vw] md:max-w-[600px] h-[2px] md:h-[4px] bg-stranger-red shadow-[0_0_20px_rgba(255,9,0,0.8)] mb-2 md:mb-6 rounded-full"
            />

            {/* Drifting Letters */}
            <div className="flex items-center justify-center gap-1 md:gap-4 lg:gap-8 perspective-1000">
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-8xl lg:text-[150px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-stranger-red to-black stroke-stranger-red drop-shadow-[0_0_30px_rgba(255,9,0,0.6)] relative"
                        style={{ 
                            WebkitTextStroke: '1px #FF0900',
                            fontFamily: '"Libre Baskerville", serif' 
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

             {/* Bottom Glowing Bar */}
             <motion.div
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[80vw] md:max-w-[600px] h-[2px] md:h-[4px] bg-stranger-red shadow-[0_0_20px_rgba(255,9,0,0.8)] mt-2 md:mt-6 rounded-full"
            />

            {/* Subtitle pulsing in */}
             <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 1 }}
                className="mt-8 md:mt-12 text-stranger-red font-bold tracking-[0.5em] text-xs md:text-lg uppercase animate-pulse drop-shadow-[0_0_10px_rgba(255,9,0,0.8)]"
            >
                Enter The Void
            </motion.p>
        </div>
    </motion.div>
  );
};
