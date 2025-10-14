import React from 'react';
import './Tickets.css';

const Tickets = () => {
  return (
    <section id="tickets" className="tickets-section">
      <div className="tickets-container">
        <div className="tickets-grid">
          {/* Left Content */}
          <div className="tickets-left-content">
            <div className="offer-badge">
              Limited Time Offer
            </div>

            <h2 className="tickets-heading">
              Join the Ultimate Pop-Culture Experience at Creators Street 2025
            </h2>

            <div className="tickets-description">
              <p>
                <span className="highlight">Get exclusive access to all 4 experience zones: Animation, VFX, Film, and OTT</span>
              </p>
              <p>
                <span className="highlight">Meet top creators, artists, and industry leaders from across India</span>
              </p>
              <p>
                <span className="highlight">Participate in gaming tournaments, cosplay shows, and workshops</span>
              </p>
              <p>
                <span className="highlight">Experience masterclasses, live performances, and panel sessions</span>
              </p>
            </div>

            <p className="early-bird">
              Early Bird Offer — Limited Seats Only!
            </p>

            <div className="ticket-button-wrapper">
              <button className="ticket-button">
                <span className="ticket-button-text">
                  🎟️ Get Your Tickets Now →
                </span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="tickets-right-image">
            <div className="tickets-right-image-wrapper">
              <div className="tickets-right-image-overlay"></div>
              <div className="tickets-right-image-content">
                <div className="tickets-right-image-icon">
                  <div className="tickets-right-image-icon-content">🎪</div>
                </div>
                <div className="tickets-right-image-text">
                  <h3 className="tickets-right-image-title">Creators Street 2025</h3>
                  <p className="tickets-right-image-subtitle">Your adventure awaits!</p>
                  <div className="tickets-right-image-icons">
                    <span>🎨</span>
                    <span>🎮</span>
                    <span>🎭</span>
                    <span>🏆</span>
                    <span className="ticket-glow">
                      <span className="ticket-glow-overlay"></span>
                      <span className="ticket-glow-text">🎟</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tickets-right-image-background">
              <img src="/2024/4.png" alt="Creators Street 2025" className="tickets-right-image-background-image" />
            </div>

            <div className="tickets-right-image-badge">
              Early Bird
            </div>
            <div className="tickets-right-image-badge-bottom">
              Limited Seats
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tickets;
