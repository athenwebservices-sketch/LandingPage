import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background layers */}
      <div
        className="hero-background"
        style={{
          background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052 0%, rgba(255, 191, 203, 0.4) 40%, rgba(75, 19, 141, 0.6) 80%, transparent)`,
          opacity: isHovering ? 0.75 : 0.5,
        }}
      />
      <div
        className="hero-background-conic"
        style={{
          background: `conic-gradient(from ${cursorPosition.x * 0.1}deg at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052, transparent, rgba(255, 191, 203, 0.4))`,
          opacity: isHovering ? 0.35 : 0.25,
        }}
      />

      {/* Content wrapper */}
      <div className="hero-content-wrapper">
        <div className="hero-logo">
          <img
            src="/Logo1.png"
            alt="Logo"
            className="hero-logo-image"
          />
        </div>
        <p className="hero-tagline">India's Biggest Celebration of Creativity</p>
        <p className="hero-dates">Oct 31st – 2nd Nov 2025 | Hyderabad | HICC Novotel</p>
        <a
          href="#tickets"
          className="hero-cta-button"
        >
          Get Your Tickets Now
        </a>
      </div>

      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
    </section>
  );
};

export default Hero;
