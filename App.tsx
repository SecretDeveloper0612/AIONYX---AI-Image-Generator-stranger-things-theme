import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { ImageGenerator } from './components/ImageGenerator';
import { IntroLoader } from './components/IntroLoader';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'generator'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis Smooth Scroll
    // @ts-ignore
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    // @ts-ignore
    lenis.on('scroll', ScrollTrigger.update);

    // @ts-ignore
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // @ts-ignore
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-void-black text-white font-sans selection:bg-stranger-red selection:text-white overflow-x-hidden relative">
      {/* Intro Loader Sequence */}
      <AnimatePresence>
        {isLoading && (
          <IntroLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Global Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {!isLoading && (
        <>
          <Navbar onNavigate={setCurrentView} />
          <main>
            {currentView === 'home' ? (
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  <Hero onNavigate={setCurrentView} />
                  <About />
                  <HowItWorks />
                  <Services />
                  <Pricing />
                  <Testimonials />
                  <FAQ />
                  <Blog />
                </div>
              </div>
            ) : (
              <ImageGenerator />
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;