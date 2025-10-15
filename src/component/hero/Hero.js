import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  const [fluidColors] = useState([
    'rgba(250, 204, 21, 0.4)', // Gold
    'rgba(236, 72, 153, 0.4)', // Pink
    'rgba(59, 130, 246, 0.4)', // Blue
    'rgba(34, 197, 94, 0.4)'   // Green
  ]);

  // Track mouse position for effects
  useEffect(() => {
    const handleMouseMove = (e) => setCursorPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroImages = [
    { name: "Awards", image: "776ab53715aa8dfc1de1a96dc55b740b6e536e84.png" },
    { name: "Celebrity Announcements", image: "97312e3cb9c5c70b9c85dd66b852d34946ebdea9.jpg" },
    { name: "Expo", image: "a785e33d9d3edf95bf6e35b05c06c4f0741d1492.jpg" },
    { name: "KeyNotes", image: "be034e805aeafe0dbf416f594961adf62ad43466.jpg" },
    { name: "Cosplay", image: "c8e8c933bdf438d5183b8bba2a38bb05b3da2978.jpeg" }
  ];

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic background layers */}
      <div
        className="hero-bg"
        style={{
          background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052 0%, ${fluidColors[1]} 40%, ${fluidColors[2]} 80%, transparent)`,
          opacity: isHovering ? 0.75 : 0.5,
          transform: `scale(${isHovering ? 1.1 : 1})`,
          filter: 'brightness(1.2) saturate(1.5)'
        }}
      />
      <div
        className="hero-bg-conic"
        style={{
          background: `conic-gradient(from ${cursorPosition.x * 0.1}deg at ${cursorPosition.x}px ${cursorPosition.y}px, #3c0052, transparent, ${fluidColors[2]})`,
          opacity: isHovering ? 0.35 : 0.25,
          transform: `scale(${isHovering ? 1.1 : 1})`
        }}
      />

      {/* Animated gradient blobs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      {/* Content */}
      <div className="hero-content">
        <img src="/Logo1.png" alt="Logo" className="hero-logo" />
        <p className="hero-tagline">India's Biggest Celebration of Creativity</p>
        <p className="hero-dates">Oct 31st – 2nd Nov 2025 | Hyderabad | HICC Novotel</p>
      </div>

      {/* Image grid */}
      <div className="image-grid">
        {heroImages.map((item, index) => (
          <div key={index} className="image-card">
            <img src={item.image} alt={item.name} className="image-card-img" />
            <h3 className="image-card-title">{item.name}</h3>
          </div>
        ))}
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(to bottom right, #3c0052, #1a0033);
          color: white;
          text-align: center;
          padding-bottom: 4rem;
          padding-left: 140px;
          padding-right: 140px;
        }

        .hero-bg, .hero-bg-conic {
          position: absolute;
          inset: 0;
          transition: all 1s ease-in-out;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: multiply;
          opacity: 0.4;
          animation: blob 7s infinite;
        }

        .orb1 {
          top: 20%;
          left: 15%;
          width: 200px;
          height: 200px;
          background: linear-gradient(to right, #facc15, #ec4899, #3b82f6);
          animation-delay: 0.5s;
        }

        .orb2 {
          top: 25%;
          right: 15%;
          width: 200px;
          height: 200px;
          background: linear-gradient(to right, #ec4899, #3b82f6, #22c55e);
          animation-delay: 1.5s;
        }

        .orb3 {
          bottom: 10%;
          left: 45%;
          width: 200px;
          height: 200px;
          background: linear-gradient(to right, #3b82f6, #22c55e, #facc15);
          animation-delay: 2.5s;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .hero-content {
          position: relative;
          z-index: 10;
          margin-top: 100px;
        }

        .hero-logo {
          height: 150px;
          filter: drop-shadow(0 0 20px white);
          transition: transform 0.3s;
        }
        .hero-logo:hover { transform: scale(1.1); }

        .hero-tagline {
          font-size: 1.5rem;
          margin-top: 1rem;
        }

        .hero-dates {
          font-size: 1rem;
          color: #facc15;
          margin-top: 0.5rem;
          font-weight: bold;
        }

        .hero-btn {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          background: #facc15;
          color: black;
          font-weight: bold;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .hero-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #facc15;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          max-width: 2000px;
          width: 95%;
          margin: 3rem auto 0;
          z-index: 10;
          background: #facc15;
          border-radius: 1rem;
          padding: 10px;
        }

        .image-card {
          background: #facc15;
          

          border-radius: 1rem;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
          padding-top: 9px;
          padding-bottom: 0px;
        }

        .image-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #facc15;
        }

        .image-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 1rem;
          

        }

        .image-card-title {
          color: black;
          font-weight: bold;
          padding: 0rem;
        }
      `}</style>
    </section>
  );
}
