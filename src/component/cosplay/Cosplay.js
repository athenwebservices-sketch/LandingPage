import { useState } from 'react';
import './Cosplay.css';

const Cosplay = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section
      id="Cosplay"
      className="cosplay-section"
    >
      {/* Background Layers */}
      <div
        className="cosplay-background cosplay-background-1"
      />
      <div
        className="cosplay-background cosplay-background-2"
      />

      {/* Animated Gradient Orbs */}
      <div className="cosplay-animated-orb orb-1" />
      <div className="cosplay-animated-orb orb-2" />
      <div className="cosplay-animated-orb orb-3" />

      {/* Content Block */}
      <div className="cosplay-content">
        {/* Left Content */}
        <div className="cosplay-left-content">
          <h2 className="cosplay-title">Cosplay Workshop</h2>
          <p className="cosplay-subtitle">Step Into Character</p>
          <a
            href="#"
            className="cosplay-register-btn"
          >
            Register Now
          </a>
        </div>

        {/* Centered Cosplay Image */}
        <div
          className="cosplay-image-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src="/no_bg_image_cosplay.png"
            alt="Cosplay Showcase"
            className={`cosplay-image ${isHovering ? 'hovered' : ''}`}
          />
        </div>

        {/* Right Content */}
        <div className="cosplay-right-content">
          <h2 className="cosplay-title">Join Our Cosplay Community</h2>
          <a
            href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
            className="cosplay-join-btn"
          >
            Join Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cosplay;
