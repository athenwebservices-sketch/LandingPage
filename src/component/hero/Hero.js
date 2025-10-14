import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const [fluidColors] = useState([
    'rgba(250, 204, 21, 0.4)', // Gold
    'rgba(236, 72, 153, 0.4)', // Pink
    'rgba(59, 130, 246, 0.4)', // Blue
    'rgba(34, 197, 94, 0.4)'   // Green
  ]);

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
          background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052 0%, ${fluidColors[1]} 40%, ${fluidColors[2]} 80%, transparent)`,
          opacity: isHovering ? 0.75 : 0.5,
          transform: `scale(${isHovering ? 1.1 : 1})`,
          filter: 'brightness(1.2) saturate(1.5)'
        }}
      />
      <div
        className="hero-background-conic"
        style={{
          background: `conic-gradient(from ${cursorPosition.x * 0.1}deg at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052, transparent, ${fluidColors[2]})`,
          opacity: isHovering ? 0.35 : 0.25,
          transform: `scale(${isHovering ? 1.1 : 1})`
        }}
      />

      {/* Gradient orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

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

      {/* Image Grid Section */}
      <div className="hero-image-grid">
        {[...Array(5).keys()].map((index) => (
          <div key={index} className="image-card">
            <img
              src={`/images/image${index + 1}.jpg`} // Replace with your image URLs
              alt={`Image ${index + 1}`}
              className="image-card-img"
            />
            <div className="image-card-text">
              <h3 className="image-card-title">Event {index + 1}</h3>
              <p className="image-card-description">Details of Event {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
