import React from 'react';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-company-info">
          <img src="/Logo1.png" alt="Creators Street Logo" className="footer-logo" />
          <p className="footer-description">
            India's Biggest Celebration of Creativity
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-quick-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            {[
              { text: 'About Us', id: 'hero' },
              { text: 'Events', id: 'Events' },
              { text: 'Tickets', id: 'tickets' },
            ].map(({ text, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="footer-link"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-social-media">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/creatorsstreet.official"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon instagram"
            >
              <FaInstagram className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/creators-street/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon linkedin"
            >
              <FaLinkedinIn className="footer-icon" />
            </a>
            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon whatsapp"
            >
              <FaWhatsapp className="footer-icon" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-contact-info">
          <h4 className="footer-heading">Contact</h4>
          <p className="footer-contact-details">
            Email: contact@forbiddenverse.world
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Creators Street. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
