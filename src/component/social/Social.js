import React from 'react';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import './Social.css';

const Social = () => {
  return (
    <section className="social-section">
      <div className="social-container">
        <h2 className="social-heading">STAY TUNED ON SOCIAL</h2>

        <div className="social-description">
          <span className="social-follow-text">FOLLOW US ON</span>
        </div>

        <div className="social-icons-container">
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/creatorsstreet.official"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram className="social-icon-image" />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/company/creators-street/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
          >
            <FaLinkedinIn className="social-icon-image" />
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
          >
            <FaWhatsapp className="social-icon-image" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Social;
