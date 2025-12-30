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
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.1, // Added for extra smoothness
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    // @ts-ignore
    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on('scroll', updateScrollTrigger);

    // @ts-ignore
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // Performance optimizations
    // @ts-ignore
    gsap.ticker.lagSmoothing(0);
    
    // Normalize scroll to prevent native vs smooth competition
    // @ts-ignore
    ScrollTrigger.normalizeScroll(true);
    // @ts-ignore
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Refresh triggers after a small delay to ensure DOM is settled
    const refreshTimer = setTimeout(() => {
      // @ts-ignore
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      // @ts-ignore
      gsap.ticker.remove(updateScrollTrigger);
      clearTimeout(refreshTimer);
    };
  }, [isLoading]);

  // Ensure scroll triggers refresh when switching views
  useEffect(() => {
    if (!isLoading) {
      // @ts-ignore
      setTimeout(() => ScrollTrigger.refresh(), 50);
    }
  }, [currentView, isLoading]);

  return (
    <div className="min-h-screen bg-void-black text-white font-sans selection:bg-stranger-red selection:text-white overflow-x-hidden relative">
      {/* Intro Loader Sequence */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <IntroLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Global Film Grain Overlay - Optimized opacity */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      
      {!isLoading && (
        <div className="relative">
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
                  <Footer />
                </div>
              </div>
            ) : (
              <>
                <ImageGenerator />
                <Footer />
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;