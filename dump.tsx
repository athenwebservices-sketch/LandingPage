'use client';

import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaInstagram, FaFacebookF, FaLinkedinIn, FaBars, FaTimes, FaWhatsapp, FaTicketAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeYear, setActiveYear] = useState('2025');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedYear, setSelectedYear] = useState('2025');
  const [fluidColors, setFluidColors] = useState([
    'rgba(250, 204, 21, 0.4)',
    'rgba(236, 72, 153, 0.4)',
    'rgba(59, 130, 246, 0.4)',
    'rgba(34, 197, 94, 0.4)'
  ]);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const isClient = typeof window !== 'undefined';
  
  // Gallery state
  const [galleryYear, setGalleryYear] = useState('2025');
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);
  const [galleryIsHovering, setGalleryIsHovering] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  
  const THUMBNAILS_VISIBLE = 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const leaders = [
    {
      name: "Mr. Vikas Tiwari",
      description: "President, MP- AVGC-XR Association",
      color: "#FFC107",
      image: "/Vikas.png"
    },
    {
      name: "Mr. Sanjay Khimsera",
      description: "President, Asifa",
      color: "#F44336",
      image: "/Sanjay.png"
    },
  ];



// Function to change the title dynamically
function changeTitle(newTitle: string): void {
  if (typeof window !== 'undefined') {
    document.title = newTitle;
  }
}

// Function to dynamically change the favicon
function changeFavicon(iconPath: string): void {
  if (typeof window !== 'undefined') {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    // Add a cache-busting query string to force a reload of the favicon
    const cacheBustedIconPath = iconPath + '?v=' + new Date().getTime();

    if (link) {
      console.log(`Changing favicon to: ${cacheBustedIconPath}`);
      link.href = cacheBustedIconPath;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon'; // Ensure this is exactly "icon"
      newLink.type = 'image/x-icon'; // Ensure this is a valid image type
      newLink.href = cacheBustedIconPath;
      document.head.appendChild(newLink);
      console.log(`Added new favicon: ${cacheBustedIconPath}`);
    }
  }
}

// Run the functions directly on page load or component mount
if (typeof window !== 'undefined') {
  changeTitle('Creators Street');
  changeFavicon('/favicon.ico');  // Specify the icon path
}




  const galleryData = {
    '2024': [
      {
        title: 'Panel Discussion',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/1.png',
      },
      {
        title: 'Discussion Long',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/2.png',
      },
      {
        title: 'Guests of Honor',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/3.png',
      },
      {
        title: 'Prashanth Varma',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/4.png',
      },
      {
        title: 'Stall Sale',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/5.png',
      },
      {
        title: 'Old Man',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/6.png',
      },
      {
        title: 'Old Man Award',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/7.png',
      },
      {
        title: 'All Awards',
        description: 'Snowy mountains and cozy vibes',
        image: '/2024/8.png',
      },
    ],
    '2025': [
      {
        title: 'Award Presentation',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/9.png',
      },
      {
        title: 'Presenting Check',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/10.png',
      },
      {
        title: 'Character',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/11.png',
      },
      {
        title: 'Character 2',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/12.png',
      },
      {
        title: 'Championship',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/13.png',
      },
      {
        title: 'Batman',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/14.png',
      },
      {
        title: 'Ironman',
        description: 'Snowy mountains and cozy vibes',
        image: '/2025/15.png',
      }
    ],
  };

  const gallerySlides1 = galleryData[galleryYear];

  // Gallery slides data
  const gallerySlides = [
    { title: "Epic Cosplay Battle", description: "Witness the most incredible cosplay competition in India" },
    { title: "Celebrity Meet & Greet", description: "Meet your favorite pop culture icons up close" },
    { title: "Gaming Tournament", description: "Compete in the ultimate gaming championships" },
    { title: "Artist Alley", description: "Discover amazing artwork from talented creators" },
    { title: "Merchandise Paradise", description: "Shop exclusive collectibles and limited editions" },
    { title: "Workshop Sessions", description: "Learn from industry experts and creators" }
  ];

  // Experience zones data
  const experienceZones = [
    {
      name: "Comic Street",
      color: "#FFC107",
      description: "Publishers, Comics, Manga, Webtoons, Graphic Novels",
      image: "/2024/4.png"
    },
    {
      name: "Anime Street",
      color: "#F44336",
      description: "Anime Studios, Screenings, Merchandise",
      image: "/coming_soon.jpg"
    },
    {
      name: "Play Street",
      color: "#00BCD4",
      description: "Gaming, Board Games, Esports, AR/VR Fan Zones",
      image: "/coming_soon.jpg"
    },
    {
      name: "Innovation Street",
      color: "#4CAF50",
      description: "Blockchain, AI, Creator Economy, Startups & Emerging Tech",
      image: "/coming_soon.jpg"
    }
  ];

  const sections = ["Awards", "Cosplay", "Exhibit With Us", "Events"];

  // Show or hide the button based on scroll position
  const handleResize = () => {
    if (isClient) {
      setIsMobile(window.innerWidth <= 640);
    }
  };

  // Handle scroll position
  const handleScroll = () => {
    if (isClient && window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (isClient) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle scroll to section
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    }
  };

  // Gallery handlers
  const handleGalleryPrev = () => {
    setGallerySlideIndex((prev) =>
      prev === 0 ? gallerySlides1.length - 1 : prev - 1
    );
  };

  const handleGalleryNext = () => {
    setGallerySlideIndex((prev) =>
      prev === gallerySlides1.length - 1 ? 0 : prev + 1
    );
  };

  const handleGallerySlideChange = (index) => {
    setGallerySlideIndex(index);
  };

  const handleGalleryYearChange = (year) => {
    setActiveYear(year);
    setGalleryYear(year);
    setGallerySlideIndex(0);
  };

  const handleThumbnailScrollLeft = () => {
    setThumbnailStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleThumbnailScrollRight = () => {
    setThumbnailStartIndex((prev) =>
      Math.min(prev + 1, gallerySlides1.length - THUMBNAILS_VISIBLE)
    );
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentSlide(0);
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Carousel handlers
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sync thumbnail scroll with main slide
  useEffect(() => {
    const newStartIndex = Math.min(
      Math.max(0, gallerySlideIndex - Math.floor(THUMBNAILS_VISIBLE / 2)),
      gallerySlides1.length - THUMBNAILS_VISIBLE
    );
    setThumbnailStartIndex(newStartIndex);
  }, [gallerySlideIndex, galleryYear]);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, gallerySlides.length]);

  // Initialize window event listeners
  useEffect(() => {
    if (isClient) {
      // Set initial mobile state
      setIsMobile(window.innerWidth <= 640);

      // Listen to window resize and scroll events
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isClient]);
  const razorpayFormRef = useRef<HTMLFormElement>(null);
  // Handle Razorpay script loading
  useEffect(() => {
  if (showRazorpay && razorpayFormRef.current) {
    // Clear any existing content
    razorpayFormRef.current.innerHTML = '';
    
    // Create a container div for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'razorpay-button-container';
    
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute('data-payment_button_id', 'pl_RT6DPFm2Zyh9RZ');
    script.async = true;
    
    // Append the script to the container
    buttonContainer.appendChild(script);
    
    // Append the container to the form
    razorpayFormRef.current.appendChild(buttonContainer);
    
    // Add a fallback in case the script doesn't load
    const timeout = setTimeout(() => {
      if (!razorpayFormRef.current?.querySelector('.razorpay-payment-button')) {
        // If the button doesn't appear after 3 seconds, show a fallback
        buttonContainer.innerHTML = `
          <div class="text-center">
            <p class="text-red-500 mb-4">Payment button loading failed. Please try again.</p>
            <button 
              onclick="window.location.href='https://rzp.io/l/creatorsstreet'" 
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay with Razorpay
            </button>
          </div>
        `;
      }
    }, 3000);
    
    return () => {
      clearTimeout(timeout);
      // Clean up when modal closes
      if (razorpayFormRef.current) {
        razorpayFormRef.current.innerHTML = '';
      }
    };
  }
}, [showRazorpay]);
{/*
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor
      <div
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#a855f7" strokeWidth="2" fill="none" />
          <circle cx="16" cy="16" r="8" fill="#7c3aed" />
        </svg>
      </div>

      {/* Navbar
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo
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

            {/* Desktop Navigation
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

            {/* Desktop Social & Actions
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
            
            {/* Mobile Menu Toggle
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

      {/* Mobile Menu
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/90 p-4 z-50">
          <div className="flex flex-col space-y-4">
            {/* Logo inside the mobile menu
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

            {/* Close Button
            <button
              onClick={closeMobileMenu}
              className="text-white absolute top-4 right-4"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Menu Items
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

            {/* Join Us Button
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

            {/* Social Icons
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

      {/* Scroll to Top Button
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 bottom-16 bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-500 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7" />
          </svg>
        </button>
      )}

      {/* Hero Section
      <section
        ref={heroRef}
        className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-visible pb-24"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        id="hero"
      >
        {/* Background layers
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #3c0052 0%, ${fluidColors[1]} 40%, ${fluidColors[2]} 80%, transparent)`,
            opacity: isHovering ? 0.75 : 0.5,
            transform: `scale(${isHovering ? 1.1 : 1})`,
            filter: 'brightness(1.2) saturate(1.5)',
          }}
        />
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 0.1}deg at ${mousePosition.x}px ${mousePosition.y}px, #3c0052, transparent, ${fluidColors[2]})`,
            opacity: isHovering ? 0.35 : 0.25,
            transform: `scale(${isHovering ? 1.1 : 1})`,
          }}
        />

        {/* Gradient orbs
        <div className="absolute top-20 left-16 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-500 pointer-events-none" />
        <div className="absolute top-32 right-20 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-1500 pointer-events-none" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2500 pointer-events-none" />

        {/* Content wrapper
        <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center mt-12">
          {/* Logo Section
          <div className="w-72 sm:w-96 flex flex-col items-center justify-center mb-6 mt-8 relative z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-500 rounded-xl blur-2xl opacity-80 animate-pulse" />
            <div className="relative w-full flex flex-col items-center justify-center py-4">
              <img
                src="/Logo1.png"
                alt="Logo"
                className="h-20 sm:h-28 brightness-125 transform scale-110 transition-transform duration-300 hover:scale-115"
                style={{ filter: 'drop-shadow(0 0 25px white)' }}
              />
              <p className="font-b612 text-lg sm:text-xl md:text-2xl text-white-200 mb-6 mt-6 text-center whitespace-nowrap tracking-[3.5%] leading-[120%]">
                India's Biggest Celebration of Creativity
              </p>
              <p className="font-b612 text-sm sm:text-xl text-lg font-semibold text-yellow-300 group-hover:text-yellow-400 transition-colors whitespace-nowrap">
                Oct 31st – 2nd Nov 2025 | Hyderabad | HICC Novotel
              </p>
            </div>
          </div>

          {/* Gradient grid
          <div className="w-full mb-6 px-4">
            <div className="bg-yellow-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: "Awards", gradient: "from-purple-500 to-pink-500", textColor: "text-pink-400", image: "776ab53715aa8dfc1de1a96dc55b740b6e536e84.png" },
                  { name: "Celebrity Announcements", gradient: "from-blue-500 to-indigo-500", textColor: "text-indigo-400", image: "97312e3cb9c5c70b9c85dd66b852d34946ebdea9.jpg" },
                  { name: "Expo", gradient: "from-green-500 to-teal-500", textColor: "text-teal-400", image: "a785e33d9d3edf95bf6e35b05c06c4f0741d1492.jpg" },
                  { name: "KeyNotes", gradient: "from-red-500 to-orange-500", textColor: "text-orange-400", image: "be034e805aeafe0dbf416f594961adf62ad43466.jpg" },
                  { name: "Cosplay", gradient: "from-yellow-500 to-amber-500", textColor: "text-amber-400", image: "c8e8c933bdf438d5183b8bba2a38bb05b3da2978.jpeg" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-110 group shadow-lg hover:shadow-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className={`text-white mt-2 text-sm sm:text-lg font-b612 font-semibold text-black drop-shadow-md`}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section
      <section id="Awards" className="relative bg-[#3c0052] py-16 overflow-hidden mb-0">
        {/* Background Orbs
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />

        {/* Section Content
        <div className="relative z-20 container mx-auto px-6 py-10 sm:py-12 md:py-14">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            Creator Street Awards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Comics Awards 2025",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSfwYAJwoOi7jWKvV2sW6z2TV80uoV4CU5OOiFmdXjsLlFDBEA/viewform?usp=header",
                color: "from-[#3c0052] to-[#3c0052]",
              },
              {
                name: "Animation Awards 2025",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSdhQ_ecD4jqbEpl25O4fa5PKUY7H6mNjcjoNicrKR2wOAcQBA/viewform?usp=header",
                color: "from-[#3c0052] to-[#3c0052]",
              },
              {
                name: "Gaming Awards 2025",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSdhQ_ecD4jqbEpl25O4fa5PKUY7H6mNjcjoNicrKR2wOAcQBA/viewform?usp=header",
                color: "from-[#3c0052] to-[#3c0052]",
              },
              {
                name: "Special Category Awards 2025",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSdWxEblCh_nEGUJ5HSefC70Q0aigC_yGUo7WHDcQDPHbUeLFg/viewform?usp=header",
                color: "from-[#3c0052] to-[#3c0052]",
              }
            ].map((award, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md shadow-xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Hover Gradient Glow
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Content
                <div className="relative z-20 p-6 text-center flex flex-col justify-between h-full">
                  {/* Title
                  <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-md">
                    {award.name}
                  </h3>

                  {/* Button
                  <a
                    href={award.link}
                    className="inline-block px-5 py-2 mt-2 text-sm font-semibold text-yellow-300 border border-yellow-400 rounded-full shadow-md hover:bg-yellow-400 hover:text-indigo-900 transition-all duration-300 relative z-30"
                  >
                    Register Now→
                  </a>
                </div>

                {/* Bottom Accent
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders Section
      <section id="Leaders" className="relative bg-[#3c0052] py-8 overflow-hidden flex items-center justify-center mt-0 mb-0">
        {/* Background Orbs
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />
        
        {/* Section Content
        <div className="relative z-10 container mx-auto px-6 py-10 sm:py-12 md:py-14 pt-0 mt-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Jury
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center items-center">
            {leaders.map((zone, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/10 transition-all duration-300"
                style={{
                  backgroundColor: `${zone.color}20`,
                  minHeight: '350px',
                  height: 'auto',
                  padding: '1rem',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Hover Gradient Overlay
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Inner Content
                <div className="relative z-10 p-6 flex flex-col justify-between rounded-xl border border-white/20">
                  {/* Icon Container - Flex to center the image
                  <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-white/10 to-white/20 flex justify-center items-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{zone.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                    {zone.description}
                  </p>
                </div>
                
                {/* Bottom Accent
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{ backgroundColor: zone.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosplay Section
      <section id="Cosplay" className="relative w-screen min-h-screen flex items-center justify-center bg-[#3c0052] overflow-hidden">
        {/* Background Layers
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 192, 203, 0.4), transparent 70%)`,
            filter: 'brightness(1.2) saturate(1.3)',
            transform: 'scale(1.1)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05))`,
            opacity: 0.25,
          }}
        />

        {/* Animated Gradient Orbs
        <div className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-1000 pointer-events-none" />
        <div className="absolute top-10 right-32 w-80 h-80 bg-gradient-to-tr from-purple-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-3000 pointer-events-none" />

        {/* Content Block
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full px-6 max-w-6xl space-y-12 md:space-y-0">
          {/* Left Content
          <div className="text-left max-w-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md mb-4">
              Cosplay Workshop
            </h2>
            <p className="text-lg md:text-2xl text-yellow-200 mb-6">
              Step Into Character
            </p>
            <a
              href=""
              className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 border-none rounded-full transition-all duration-300 relative z-30"
            >
              Register Now
            </a>
          </div>

          {/* Centered Cosplay Image
          <div className="relative z-10 w-full md:w-[28rem]">
            <img
              src="/no_bg_image_cosplay.png"
              alt="Cosplay Showcase"
              className="w-full rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Content
          <div className="text-right max-w-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md mb-4">
              Join Our Cosplay Community
            </h2>

            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 border-none rounded-full transition-all duration-300 relative z-30"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Experience Zones Section
      <section id="Exhibit With Us" className="relative bg-[#3c0052] py-20 overflow-hidden">
        {/* Background Orbs
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />
        
        {/* Section Content
        <div className="relative z-10 container mx-auto px-6 py-10 sm:py-14 md:py-16 overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Experience Zones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceZones.map((zone, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/10 transition-all duration-300"
                style={{
                  backgroundColor: `${zone.color}20`,
                  minHeight: '350px',
                  height: 'auto',
                  padding: '1rem',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Hover Gradient Overlay
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Inner Content
                <div className="relative z-10 p-6 flex flex-col justify-between rounded-xl border border-white/20">
                  {/* Icon Container
                  <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-white/10 to-white/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={zone.image}
                        alt={zone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{zone.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                    {zone.description}
                  </p>
                </div>
                
                {/* Bottom Accent
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{ backgroundColor: zone.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section
      <section id="Events" className="relative bg-gradient-to-br from-[#3c0052] to-[#3c0052] py-16 sm:py-12">
        <div className="relative z-10 container mx-auto px-6 sm:px-4 lg:px-12 max-w-full sm:max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">Past Events</h2>
          
          {/* Year Selector
          <div className="flex justify-center space-x-4 mb-12">
            {['2024', '2025'].map((year) => (
              <button
                key={year}
                onClick={() => handleGalleryYearChange(year)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${galleryYear === year
                  ? 'bg-yellow-400 text-black shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-full sm:max-w-3xl">
            <div className="relative mb-8">
              
              {/* Image Container
              <div className={`w-full relative overflow-hidden rounded-xl transition-all duration-300 ${galleryIsHovering ? 'scale-105' : ''} 
                ${isMobile ? 'h-auto' : 'h-[400px] sm:h-[500px] md:h-[600px]'}`}
              >
                <img
                  src={gallerySlides1[gallerySlideIndex].image}
                  alt={gallerySlides1[gallerySlideIndex].title}
                  className="w-full h-full object-cover sm:object-contain transition-all duration-300"
                  onMouseEnter={() => setGalleryIsHovering(true)}
                  onMouseLeave={() => setGalleryIsHovering(false)}
                />
              </div>

              {/* Navigation buttons
              <button
                onClick={handleGalleryPrev}
                className="absolute left-4 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg z-10"
                onMouseEnter={() => setGalleryIsHovering(true)}
                onMouseLeave={() => setGalleryIsHovering(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleGalleryNext}
                className="absolute right-4 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg z-10"
                onMouseEnter={() => setGalleryIsHovering(true)}
                onMouseLeave={() => setGalleryIsHovering(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Carousel
            <div className="flex items-center mb-8 space-x-2">
              <button
                onClick={handleThumbnailScrollLeft}
                className="bg-white/10 text-white hover:bg-white/20 p-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 flex-1 overflow-hidden">
                {gallerySlides1
                  .slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_VISIBLE)
                  .map((slide, index) => {
                    const realIndex = index + thumbnailStartIndex;
                    return (
                      <div
                        key={realIndex}
                        onClick={() => handleGallerySlideChange(realIndex)}
                        className={`aspect-video overflow-hidden cursor-pointer transition-all duration-300 ${gallerySlideIndex === realIndex
                          ? 'scale-105'
                          : 'opacity-60 hover:opacity-100'
                          } rounded-lg`}
                        onMouseEnter={() => setGalleryIsHovering(true)}
                        onMouseLeave={() => setGalleryIsHovering(false)}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    );
                  })}
              </div>

              <button
                onClick={handleThumbnailScrollRight}
                className="bg-white/10 text-white hover:bg-white/20 p-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Dots
            <div className="flex justify-center space-x-2">
              {gallerySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleGallerySlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${gallerySlideIndex === index
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  onMouseEnter={() => setGalleryIsHovering(true)}
                  onMouseLeave={() => setGalleryIsHovering(false)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section
      <section id="tickets" className="relative bg-[#3c0052] pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 items-center justify-center text-center">
            
            {/* Left Content
            <div className="space-y-6">
              <div className="inline-block">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Limited Time Offer
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Join the Ultimate Pop-Culture Experience at Creators Street 2025
              </h2>

              <div className="space-y-4 text-gray-300 text-lg">
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Get exclusive access to all <strong>4 experience zones: Animation, VFX, Film, and OTT</strong></span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Meet top <strong>creators, artists, and industry leaders</strong> from across India</span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Participate in <strong>gaming tournaments, cosplay shows,</strong> and workshops</span>
                </p>
                <p className="flex items-start space-x-3 justify-center">
                  <span className="text-yellow-400 text-xl mt-1"></span>
                  <span>Experience <strong>masterclasses, live performances,</strong> and panel sessions</span>
                </p>
              </div>

              <p className="text-yellow-400 font-semibold text-lg">
                Early Bird Offer — Limited Seats Only!
              </p>

              <div className="flex justify-center">
                <button
                
                  className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="text-2xl">🎟️</span>
                    <span>Buy Tickets</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section
      <section className="w-full bg-[#3c0052] py-16 px-6 text-center text-white relative">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Title
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wider">
            STAY TUNED ON SOCIAL
          </h2>

          {/* Subheading
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 text-xl md:text-2xl font-semibold">
            <span className="text-yellow-200">FOLLOW US ON</span>
          </div>

          {/* Social Icons
          <div className="flex justify-center gap-6">
            {/* Instagram
            <a
              href="https://www.instagram.com/creatorsstreet.official"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black p-4 rounded-full hover:bg-[#E1306C] transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </a>

            {/* LinkedIn
            <a
              href="https://www.linkedin.com/company/creators-street/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black p-4 rounded-full hover:bg-[#0077b5] transition-all duration-300"
            >
              <FaLinkedinIn className="w-6 h-6 text-white" />
            </a>

            {/* WhatsApp
            <a
              href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black p-4 rounded-full hover:bg-[#25D366] transition-all duration-300"
            >
              <FaWhatsapp className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="relative bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info
            <div>
              <div className="col-span-4 flex justify-center mt-8">
                <img src="/Logo1.png" alt="Creators Street Logo" className="h-12" />
              </div>
              <p className="text-gray-400 text-sm">
                India's Biggest Celebration of Creativity
              </p>
            </div>

            {/* Quick Links
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { text: 'About Us', id: 'hero' },
                  { text: 'Events', id: 'Events' },
                  { text: 'Tickets', id: 'tickets' }
                ].map(({ text, id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Instagram', icon: faInstagram, link: 'https://www.instagram.com/creatorsstreet.official' },
                  { name: 'LinkedIn', icon: faLinkedin, link: 'https://www.linkedin.com/company/creators-street/' },
                  { name: 'WhatsApp', icon: faWhatsapp, link: 'https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v' },
                ].map(({ name, icon, link }) => (
                  <a
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={icon} className="text-white text-xl" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Email: contact@forbiddenverse.world</p>
              </div>
            </div>
          </div>

          {/* Copyright
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Creators Street. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Razorpay Payment Modal
      {showRazorpay && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
      <button
        onClick={() => setShowRazorpay(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Purchase</h3>
      
      <div className="razorpay-payment-container">
        <form ref={razorpayFormRef}>
          {/* The Razorpay button will be dynamically inserted here
        </form>
      </div>
      
      {/* Fallback button
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Or pay directly with Razorpay</p>
        <a 
          href="https://rzp.io/l/creatorsstreet" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Pay Now
        </a>
      </div>
    </div>
  </div>
)}

      {/* Custom Styles
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        body {
          cursor: none;
        }
        
        a, button, input, textarea, select {
          cursor: none;
        }
        
        * {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
      `}</style>
    </div>
  );
}
*}

make this into the various react components , use only java script 