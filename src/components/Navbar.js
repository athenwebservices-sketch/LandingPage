'use client';

import { useState } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sections = ["Awards", "Cosplay", "Exhibit With Us", "Events"];

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleScrollToSection = (id) => {
    onScrollToSection(id);
    closeMobileMenu();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="cursor-pointer group">
              <img
                src="/Logo1.png"
                alt="Creators Street Logo"
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 8px white)',
                }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {sections.map((item) => (
                <a
                  key={item}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection(item);
                  }}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium cursor-pointer"
                >
                  {item.replace(/([A-Z])/g, ' $1').trim()}
                </a>
              ))}
            </div>

            {/* Desktop Social & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://www.instagram.com/creatorsstreet.official"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/creators-street/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300"
              >
                Join Us
              </a>
              <a
                href=""
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300"
              >
                Buy Tickets
              </a>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-white"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/90 p-4 z-50">
          <div className="flex flex-col space-y-4">
            {/* Logo inside the mobile menu */}
            <div className="mb-6">
              <a href="/" className="cursor-pointer group">
                <img
                  src="/Logo1.png"
                  alt="Creators Street Logo"
                  className="h-14 w-auto transition-transform duration-300 group-hover:scale-110 mx-auto"
                  style={{
                    filter: 'drop-shadow(0 0 8px white)',
                  }}
                />
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="text-white absolute top-4 right-4"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Menu Items */}
            {sections.map((item) => (
              <a
                key={item}
                href=""
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item);
                }}
              >
                {item}
              </a>
            ))}

            {/* Join Us Button */}
            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300"
            >
              Join Us
            </a>
            <a
              href=""
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300"
            >
              Buy Tickets
            </a>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/creatorsstreet"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/creators-street/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}