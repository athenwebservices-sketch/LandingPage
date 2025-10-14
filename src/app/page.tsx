'use client';

import { useState, useEffect } from 'react';
import { useCursor } from '@/hooks/useCursor';
import { useScroll } from '@/hooks/useScroll';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Awards from '@/components/Awards';
import Leaders from '@/components/Leaders';
import Cosplay from '@/components/Cosplay';
import ExperienceZones from '@/components/ExperienceZones';
import Gallery from '@/components/Gallery';
import Tickets from '@/components/Tickets';
import Footer from '@/components/Footer';

// Function to change the title dynamically
function changeTitle(newTitle) {
  if (typeof window !== 'undefined') {
    document.title = newTitle;
  }
}

// Function to dynamically change the favicon
function changeFavicon(iconPath) {
  if (typeof window !== 'undefined') {
    const link = document.querySelector("link[rel*='icon']");

    // Add a cache-busting query string to force a reload of the favicon
    const cacheBustedIconPath = iconPath + '?v=' + new Date().getTime();

    if (link) {
      console.log(`Changing favicon to: ${cacheBustedIconPath}`);
      link.href = cacheBustedIconPath;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = 'image/x-icon';
      newLink.href = cacheBustedIconPath;
      document.head.appendChild(newLink);
      console.log(`Added new favicon: ${cacheBustedIconPath}`);
    }
  }
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursorPosition, isHovering, setIsHovering } = useCursor();
  const { showButton, isMobile, scrollToTop, handleScrollToSection } = useScroll();

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Run the functions directly on page load or component mount
  useEffect(() => {
    changeTitle('Creators Street');
    changeFavicon('/favicon.ico');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor cursorPosition={cursorPosition} isHovering={isHovering} />

      {/* Navbar */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 bottom-16 bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-500 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7" />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <Hero 
        mousePosition={mousePosition} 
        isHovering={isHovering} 
        setIsHovering={setIsHovering} 
      />

      {/* Awards Section */}
      <Awards />

      {/* Leaders Section */}
      <Leaders setIsHovering={setIsHovering} />

      {/* Cosplay Section */}
      <Cosplay />

      {/* Experience Zones Section */}
      <ExperienceZones setIsHovering={setIsHovering} />

      {/* Gallery Section */}
      <Gallery isMobile={isMobile} />

      {/* Tickets Section */}
      <Tickets />

      {/* Footer */}
      <Footer 
        setIsHovering={setIsHovering} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Custom Styles */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, input, textarea, select {
          cursor: none;
        }
        
        * {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
      `}</style>
    </div>
  );
}