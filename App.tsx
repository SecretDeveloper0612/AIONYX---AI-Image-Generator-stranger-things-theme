
import React, { useEffect, useState } from 'react';
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

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

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
              <>
                <Hero onNavigate={setCurrentView} />
                <About />
                <HowItWorks />
                <Services />
                <Pricing />
                <Testimonials />
                <FAQ />
                <Blog />
              </>
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
