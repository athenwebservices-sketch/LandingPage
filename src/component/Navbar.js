import { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';

import { FaBars, FaTimes, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTicketAlt } from 'react-icons/fa';
import '../styles/Navbar.css';  // or .scss, .module.css, etc.

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = ["Awards", "Cosplay", "Exhibit With Us", "Events"];

  const handleCloseMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar-wrapper" onClick={handleCloseMenu}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/" className="logo-link">
              <img
                src="/Logo1.png"
                alt="Creators Street Logo"
                className="logo-image"
              />
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="navbar-mobile-menu">
            <button
              onClick={(e) => {
                e.stopPropagation(); // ⛔ prevent menu from closing immediately
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="menu-icon"
            >
              <FaBars className="icon" />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-desktop-nav">
            {sections.map((item) => (
              <a
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item);
                }}
                className="navbar-link"
              >
                {item.replace(/([A-Z])/g, ' $1').trim()} {/* Formats ExhibitWithUs → Exhibit With Us */}
              </a>
            ))}
          </div>

          {/* Social + Join Us */}
          <div className="navbar-social">
            <a
              href="https://www.instagram.com/creatorsstreet.official"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
            >
              <FaInstagram className="social-icon-image" />
            </a>
            <a
              href="https://www.linkedin.com/company/creators-street/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              <FaLinkedinIn className="social-icon-image" />
            </a>
            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              className="join-us-button"
            >
              Join Us
            </a>
            <a
              href="/tickets"
              className="social-icon ticket"
            >
              <FaTicketAlt className="social-icon-image" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()} // ⛔ prevent click from closing menu
          className="navbar-mobile-menu-container"
        >
          <div className="navbar-mobile-menu-content">
            {/* Logo inside the mobile menu */}
            <div className="navbar-mobile-logo">
              <a href="/" className="logo-link">
                <img
                  src="/Logo1.png"
                  alt="Creators Street Logo"
                  className="logo-image"
                />
              </a>
            </div>

            {/* Close Button (X) */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="navbar-mobile-close-button"
            >
              <FaTimes className="icon" />
            </button>

            {/* Menu Items */}
            {["Awards", "Cosplay", "Exhibit With Us", "Events"].map((item) => (
              <a
                key={item}
                href="#"
                className="navbar-mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item);
                  setMobileMenuOpen(false); // Close the menu after clicking
                }}
              >
                {item}
              </a>
            ))}

            {/* Join Us Button */}
            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              className="navbar-mobile-join-button"
              onClick={() => setMobileMenuOpen(false)} // Close the menu when clicking Join Us
            >
              Join Us
            </a>

            {/* Social Icons */}
            <div className="navbar-mobile-social-icons">
              <a
                href="https://www.facebook.com/creatorsstreet"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebookF className="social-icon-image" />
              </a>
              <a
                href="https://www.linkedin.com/company/creators-street/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedinIn className="social-icon-image" />
              </a>
              <a
                href="/tickets"
                className="social-icon ticket"
              >
                <FaTicketAlt className="social-icon-image" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
