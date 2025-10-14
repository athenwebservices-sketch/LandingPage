'use client';

import { useState, useEffect } from 'react';

export function useScroll() {
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isClient = typeof window !== 'undefined';

  const handleResize = () => {
    if (isClient) {
      setIsMobile(window.innerWidth <= 640);
    }
  };

  const handleScroll = () => {
    if (isClient && window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    if (isClient) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isClient) {
      setIsMobile(window.innerWidth <= 640);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isClient]);

  return {
    showButton,
    isMobile,
    scrollToTop,
    handleScrollToSection
  };
}