import { useState, useEffect } from "react";
import { FaFacebookF, FaBars, FaTimes, FaInstagram, FaLinkedinIn, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.css"; // updated file name

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = ["Awards", "Cosplay", "Exhibit With Us", "Events"];

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".cs-navbar");
      if (window.scrollY > 50) navbar.classList.add("cs-navbar--scrolled");
      else navbar.classList.remove("cs-navbar--scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMenu = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="cs-navbar-wrapper" onClick={handleCloseMenu}>
      {/* Navbar */}
      <nav className="cs-navbar">
        <div className="cs-navbar-container">
          {/* Logo */}
          <div className="cs-navbar-logo">
            <Link to="/" className="cs-logo-link">
              <img src="/Logo1.png" alt="Creators Street Logo" className="cs-logo-image" />
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="cs-navbar-mobile-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="cs-menu-icon"
            >
              <FaBars className="cs-icon" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="cs-navbar-desktop-nav">
            {sections.map((item) => (
              <a
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item);
                }}
                className="cs-navbar-link"
              >
                {item.replace(/([A-Z])/g, " $1").trim()}
              </a>
            ))}
          </div>

          {/* Social + Links */}
          <div className="cs-navbar-social">
            <a
              href="https://www.instagram.com/creatorsstreet.official"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-social-icon"
            >
              <FaInstagram className="cs-social-icon-image" />
            </a>
            <a
              href="https://www.linkedin.com/company/creators-street/"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-social-icon"
            >
              <FaLinkedinIn className="cs-social-icon-image" />
            </a>
            <a href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v" className="cs-join-us-button">
              Join Us
            </a>
            <Link to="/tickets" className="cs-social-icon">
              <FaTicketAlt className="cs-social-icon-image" />
            </Link>
            <Link to="/login" className="cs-nav-link">Login</Link>
            <Link to="/register" className="cs-nav-link">Register</Link>
            <Link to="/logout" className="cs-nav-link cs-nav-link--logout">Logout</Link>
            <Link to="/payment" className="cs-nav-link">Payment</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div onClick={(e) => e.stopPropagation()} className="cs-navbar-mobile-menu-container">
          <div className="cs-navbar-mobile-menu-content">
            <div className="cs-navbar-mobile-logo">
              <Link to="/" className="cs-logo-link">
                <img src="/Logo1.png" alt="Creators Street Logo" className="cs-logo-image" />
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(false)} className="cs-navbar-mobile-close-button">
              <FaTimes className="cs-icon" />
            </button>

            {sections.map((item) => (
              <a
                key={item}
                href="#"
                className="cs-navbar-mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item);
                  setMobileMenuOpen(false);
                }}
              >
                {item}
              </a>
            ))}

            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              className="cs-navbar-mobile-join-button"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Us
            </a>

            <div className="cs-navbar-mobile-social-icons">
              <a
                href="https://www.facebook.com/creatorsstreet"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-social-icon"
              >
                <FaFacebookF className="cs-social-icon-image" />
              </a>
              <a
                href="https://www.linkedin.com/company/creators-street/"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-social-icon"
              >
                <FaLinkedinIn className="cs-social-icon-image" />
              </a>
              <Link to="/tickets" className="cs-social-icon">
                <FaTicketAlt className="cs-social-icon-image" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
