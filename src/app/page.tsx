'use client';

import { useState, useEffect, useRef } from 'react';
import noBgImage from './no_bg_image.png';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

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
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [galleryYear, setGalleryYear] = useState('2025');
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);
  const [galleryIsHovering, setGalleryIsHovering] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0); // for scrolling thumbs

  const THUMBNAILS_VISIBLE = 4;

  const galleryData = {
    '2024': [
      {
        title: 'New Year 2024',
        description: 'Fireworks and celebration shots',
        image: '/2024/AMP09527.JPG',
      },
      {
        title: 'Spring 2024',
        description: 'Blossoms in the park',
        image: '/2024/AMP09527.JPG',
      },
      {
        title: 'Summer 2024',
        description: 'Beachside memories',
        image: 'https://source.unsplash.com/800x450/?beach,summer',
      },
      {
        title: 'Autumn 2024',
        description: 'Golden leaves and cityscapes',
        image: 'https://source.unsplash.com/800x450/?autumn,leaves',
      },
      {
        title: 'Winter 2024',
        description: 'Snowy mountains and cozy vibes',
        image: 'https://source.unsplash.com/800x450/?winter,snow',
      },
    ],
    '2025': [
      {
        title: 'New Year 2025',
        description: 'Futuristic celebrations',
        image: 'https://source.unsplash.com/800x450/?city,fireworks',
      },
      {
        title: 'Spring 2025',
        description: 'Urban gardens in bloom',
        image: 'https://source.unsplash.com/800x450/?urban,garden',
      },
      {
        title: 'Summer 2025',
        description: 'City festivals and markets',
        image: 'https://source.unsplash.com/800x450/?festival,summer',
      },
      {
        title: 'Autumn 2025',
        description: 'Architecture in golden light',
        image: 'https://source.unsplash.com/800x450/?architecture,autumn',
      },
      {
        title: 'Winter 2025',
        description: 'Tech and tradition mix',
        image: 'https://source.unsplash.com/800x450/?technology,winter',
      },
    ],
  };

  const gallerySlides1 = galleryData[galleryYear];

  // Sync thumbnail scroll with main slide
  useEffect(() => {
    const newStartIndex = Math.min(
      Math.max(0, gallerySlideIndex - Math.floor(THUMBNAILS_VISIBLE / 2)),
      gallerySlides1.length - THUMBNAILS_VISIBLE
    );
    setThumbnailStartIndex(newStartIndex);
  }, [gallerySlideIndex, galleryYear]);

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
      Math.min(prev + 1, gallerySlides.length - THUMBNAILS_VISIBLE)
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
  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
      description: "Publishers, Comics, Manga, Webtoons, Graphic Novels"
    },
    {
      name: "Anime Street",
      color: "#F44336",
      description: "Anime Studios, Screenings, Merchandise"
    },
    {
      name: "Play Street",
      color: "#00BCD4",
      description: "Gaming, Board Games, Esports, AR/VR Fan Zones"
    },
    {
      name: "Innovation Street",
      color: "#4CAF50",
      description: "Blockchain, AI, Creator Economy, Startups & Emerging Tech"
    }
  ];

  // Handle mouse movement for custom cursor and fluid background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
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

      {/* Navigation Bar */}
      <div className="relative">
        {/* Navbar */}


        <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">

              {/* Left: Logo */}
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

              {/* Center: Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                {["Awards", "Cosplay", "Exhibit with us", "Events"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
                  >
                    {item}
                  </a>
                ))}

                {/* Year Switcher */}
                <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-1">
                  <button
                    onClick={() => handleGalleryYearChange('2024')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeYear === '2024' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    2024
                  </button>
                  <button
                    onClick={() => handleGalleryYearChange('2025')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeYear === '2025' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    2025
                  </button>
                </div>
              </div>

              {/* Right: Social Icons + Join Us Button */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Social Icons */}
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

                {/* Join Us Button */}
                <a
                  href="https://chat.whatsapp.com/FsOZBOVFstj4PPSJjHZT4v"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300"
                >
                  Join Us
                </a>
              </div>
            </div>
          </div>
        </nav>



        {/* Your sections here, including the logo */}
      </div>



      {/* Hero Section 
     <section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
      >
        {/* Enhanced Interactive fluid background effect 
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${fluidColors[currentColorIndex]} 0%, ${fluidColors[(currentColorIndex + 1) % fluidColors.length]} 40%, ${fluidColors[(currentColorIndex + 2) % fluidColors.length]} 80%, transparent)`,
            opacity: isHovering ? 0.75 : 0.5, // Increase opacity on hover for a stronger effect
            transform: `scale(${isHovering ? 1.1 : 1})`,
            filter: 'brightness(1.2) saturate(1.5)', // Enhance the brightness and saturation
          }}
        />
        
        {/* Additional interactive layers 
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 0.1}deg at ${mousePosition.x}px ${mousePosition.y}px, ${fluidColors[(currentColorIndex + 1) % fluidColors.length]}, transparent, ${fluidColors[(currentColorIndex + 2) % fluidColors.length]})`,
            opacity: isHovering ? 0.35 : 0.25, // Slightly more opacity for better contrast
            transform: `scale(${isHovering ? 1.1 : 1})`,
          }}
        />
        
        {/* Reduced intensity gradient orbs 
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-500" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-1500" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2500" />
        
        {/* Logo and content 
        <div className="relative z-10 text-center fluid-cursor">
          {/* Logo Section 
          <div className="w-96 h-40 mx-auto mb-8 relative flex items-center justify-center">
            {/* Glowing background 
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-500 rounded-xl blur-2xl opacity-80 animate-pulse" />
            
            {/* Logo image with enhancements 
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/no_bg_image.png" 
                alt="Logo" 
                className="h-full brightness-125 transform scale-110 transition-transform duration-300 hover:scale-115"
                style={{
                  filter: 'drop-shadow(0 0 25px white)' // More intense glow
                }}
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-yellow-200"> India's Greatest Pop-Culture Experience </p>
        </div>
      </section>



      {/* Hero Section 
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            heroRef.current.style.setProperty('--mouse-x', `${x}%`);
            heroRef.current.style.setProperty('--mouse-y', `${y}%`);
          }
        }}
      >
        {/* Fluid Background Animation 
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Mouse-following gradient effect 
          <div 
            className="absolute inset-0 opacity-30 transition-all duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.4) 0%, transparent 50%)`
            }}
          ></div>
        </div>

        {/* Hero Content
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Creators Street
          </h1>
          <p className="text-2xl md:text-4xl text-gray-300 mb-8 font-light">
            India's Greatest Pop-Culture Experience
          </p>
          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <img src="/no_bg_image.png" alt="Logo" />
        </div>


        </div>
              */}
      {/* Floating orbs 
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-500 rounded-full opacity-30 animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-pink-500 rounded-full opacity-30 animate-float delay-2000"></div>
      </section>*/}
      <section
        ref={heroRef}
        className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-visible pb-24"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background layers */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #3c0052 0%, ${fluidColors[(currentColorIndex + 1) % fluidColors.length]} 40%, ${fluidColors[(currentColorIndex + 2) % fluidColors.length]} 80%, transparent)`,
            opacity: isHovering ? 0.75 : 0.5,
            transform: `scale(${isHovering ? 1.1 : 1})`,
            filter: 'brightness(1.2) saturate(1.5)',
          }}
        />

        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 0.1}deg at ${mousePosition.x}px ${mousePosition.y}px, #3c0052, transparent, ${fluidColors[(currentColorIndex + 2) % fluidColors.length]})`,
            opacity: isHovering ? 0.35 : 0.25,
            transform: `scale(${isHovering ? 1.1 : 1})`,
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-16 w-72 h-72 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-500 pointer-events-none" />
        <div className="absolute top-32 right-20 w-72 h-72 bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-1500 pointer-events-none" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2500 pointer-events-none" />

        {/* Content wrapper with margin top to move content down */}
        <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center mt-12">

          {/* Logo Section with margin-top to move logo down */}
          <div className="w-96 flex flex-col items-center justify-center mb-6 mt-8 relative z-20" style={{ pointerEvents: 'auto' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-500 rounded-xl blur-2xl opacity-80 animate-pulse" />
            <div className="relative w-full flex flex-col items-center justify-center py-4">
              <img
                src="/Logo1.png"
                alt="Logo"
                className="h-28 brightness-125 transform scale-110 transition-transform duration-300 hover:scale-115"
                style={{ filter: 'drop-shadow(0 0 25px white)' }}
              />
              <p className="font-b612 text-xl md:text-2xl text-white-200 mb-6 mt-6 text-center whitespace-nowrap tracking-[3.5%] leading-[120%]">
                India's Biggest Celebration of Creativity
              </p>


              <p className="font-b612 text-xl text-lg font-semibold text-yellow-300 group-hover:text-yellow-400 transition-colors whitespace-nowrap">
                Oct 31st – 2nd Nov 2025 | Hyderabad | HICC Novotel
              </p>


            </div>
          </div>


          {/* Gradient grid */}
          <div className="w-full mb-6 px-4">
            <div className="bg-yellow-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Awards", gradient: "from-purple-500 to-pink-500", textColor: "text-pink-400", image: "776ab53715aa8dfc1de1a96dc55b740b6e536e84.png" },
                  { name: "Celebrity anocunements", gradient: "from-blue-500 to-indigo-500", textColor: "text-indigo-400", image: "97312e3cb9c5c70b9c85dd66b852d34946ebdea9.jpg" },
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
                    <p className={`mt-2 text-lg font-b612 font-semibold black drop-shadow-md`}>
                      {item.name}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Promotional text */}

        </div>
      </section>








      <section className="relative bg-[#3c0052] py-20 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />

        {/* Floating Glass Panel */}
        <div className="absolute inset-4 sm:inset-6 md:inset-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl pointer-events-none z-10" />

        {/* Section Content */}
        <div className="relative z-20 container mx-auto px-6 py-10 sm:py-14 md:py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Iconic Awards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Comics Awards 2025",
                image: "/Logo1.png",
                link: "#join-cosplay",
                color: "from-[#3c0052] to-[#3c0052]",
              },
              {
                name: "Animation Awards 2025",
                image: "/Logo1.png",
                link: "#join-creative",
                color: "from-[#3c0052] to-[#3c0052]",
              },
              {
                name: "GAMING Awards 2025",
                image: "/Logo1.png",
                link: "#join-community",
                color: "from-[#3c0052] to-[#3c0052]",
              }
            ].map((award, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md shadow-xl transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl hover:translate-y-1 hover:translate-x-1"
              >
                {/* Hover Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Award Image */}
                <img
                  src={award.image}
                  alt={award.name}
                  className="w-full h-60 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-md">
                    {award.name}
                  </h3>

                  <a
                    href={award.link}
                    className="inline-block px-5 py-2 mt-2 text-sm font-semibold text-yellow-300 border border-yellow-400 rounded-full shadow-md hover:bg-yellow-400 hover:text-indigo-900 transition-all duration-300"
                  >
                    Join Now →
                  </a>
                </div>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>








      <section className="relative w-screen min-h-screen flex items-center justify-center bg-[#3c0052] overflow-hidden">
        {/* Background Layers */}
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

        {/* Animated Gradient Orbs */}
        <div className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-1000 pointer-events-none" />
        <div className="absolute top-10 right-32 w-80 h-80 bg-gradient-to-tr from-purple-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-3000 pointer-events-none" />

        {/* Content Block */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full px-6 max-w-6xl space-y-12 md:space-y-0">

          {/* Left Content */}
          <div className="text-left max-w-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md mb-4">
              Join Our Cosplay Community
            </h2>
            <p className="text-lg md:text-2xl text-yellow-200 mb-6">
              Heroes, Villains & Fantasies Come to Life
            </p>
            <a
              href="#join-cosplay"
              className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 border-none rounded-full transition-all duration-300"
            >
              Join Us
            </a>
          </div>

          {/* Centered Cosplay Image */}
          <div className="relative z-10 w-full md:w-[28rem]">
            <img
              src="/no_bg_image_cosplay.png"
              alt="Cosplay Showcase"
              className="w-full rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Content */}
          <div className="text-right max-w-sm">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md mb-4">
              Join the workshop
            </h2>
            <p className="text-lg md:text-2xl text-yellow-200 mb-6">
              Heroes, Villains & Fantasies Come to Life
            </p>
            <a
              href="#join-cosplay"
              className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 border-none rounded-full transition-all duration-300"
            >
              Join Us
            </a>
          </div>
        </div>
      </section>







      {/* Interactive Experience Zones Section */}
      <section className="relative bg-[#3c0052] py-20 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />

        {/* Floating Glass Panel */}
        <div className="absolute inset-6 sm:inset-8 md:inset-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl pointer-events-none z-0" />

        {/* Section Content */}
        <div className="relative z-10 container mx-auto px-6 py-10 sm:py-14 md:py-16 overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Experience Zones
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceZones.map((zone, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/10 backdrop-blur-md transition-all duration-300"
                style={{
                  backgroundColor: `${zone.color}20`,
                  minHeight: '350px',
                  height: 'auto',
                  // Add padding to keep the cards inside the container
                  padding: '1rem',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Inner Content (glass effect container) */}
                <div className="relative z-10 p-6 flex flex-col justify-between rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm">
                  {/* Icon Container */}
                  <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-white/10 to-white/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">🎭</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{zone.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                    {zone.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{ backgroundColor: zone.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>










      {/* Gallery Section */}

      <section className="relative bg-gradient-to-br from-[#3c0052] to-[#3c0052] py-16">
        <div className="absolute inset-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl pointer-events-none z-0" />

        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">Gallery</h2>

          {/* Featured Slide */}
          <div className="mx-auto max-w-3xl">
            <div className="relative mb-8">
              {/* Image Container */}
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <img
                  src={gallerySlides1[gallerySlideIndex].image}
                  alt={gallerySlides1[gallerySlideIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                      {gallerySlides1[gallerySlideIndex].title}
                    </h3>
                    <p className="text-gray-300">
                      {gallerySlides1[gallerySlideIndex].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Slide Nav */}
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

            {/* Thumbnail Carousel */}
            <div className="flex items-center mb-8 space-x-2">
              {/* Left scroll button */}
              <button
                onClick={handleThumbnailScrollLeft}
                className="bg-white/10 text-white hover:bg-white/20 p-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Visible thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1 overflow-hidden">
                {gallerySlides1
                  .slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_VISIBLE)
                  .map((slide, index) => {
                    const realIndex = index + thumbnailStartIndex;
                    return (
                      <div
                        key={realIndex}
                        onClick={() => handleGallerySlideChange(realIndex)}
                        className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${gallerySlideIndex === realIndex
                          ? 'ring-4 ring-yellow-400 scale-105'
                          : 'opacity-60 hover:opacity-100'
                          }`}
                        onMouseEnter={() => setGalleryIsHovering(true)}
                        onMouseLeave={() => setGalleryIsHovering(false)}
                      >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
              </div>

              {/* Right scroll button */}
              <button
                onClick={handleThumbnailScrollRight}
                className="bg-white/10 text-white hover:bg-white/20 p-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Dots */}
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






      {/* Join Now Section */}



      <section className="relative bg-[#3c0052] py-16 md:py-24">
        {/* Glass Panel */}
        <div className="absolute inset-0 md:inset-10 bg-white/5 backdrop-blur-md md:backdrop-blur-sm border-2 border-white/20 rounded-3xl pointer-events-none z-0" />

        <div className="container mx-auto px-4 relative z-10 max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Limited Time Offer
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Join the Ultimate Pop-Culture Experience
              </h2>

              <div className="space-y-4 text-gray-300 text-base md:text-lg">
                <p className="flex items-start space-x-3">

                  <span>Get exclusive access to all 4 experience zones</span>
                </p>
                <p className="flex items-start space-x-3">

                  <span>Meet your favorite creators and celebrities</span>
                </p>
                <p className="flex items-start space-x-3">

                  <span>Participate in gaming tournaments and workshops</span>
                </p>
                <p className="flex items-start space-x-3">

                  <span>Win amazing prizes and exclusive merchandise</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl overflow-hidden"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Join Now</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </button>

                <button
                  className="group relative bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-2xl"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-2xl overflow-hidden border-2 border-white/20">
                  <div className="aspect-square w-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center overflow-hidden">
                          {/* Replace the emoji with an image */}
                          <img src="/Logo1.png" alt="Creators Street" className="w-full h-full object-cover rounded-full" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-float">
                  Early Bird
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-float animation-delay-2000">
                  Limited Seats
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      <section className="w-full bg-[#3c0052] py-16 px-6 text-center text-white relative">
        {/* Glass Panel */}
        <div className="absolute inset-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wider">
            STAY TUNED ON SOCIAL
          </h2>

          {/* Subheading */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 text-xl md:text-2xl font-semibold">
            <span className="text-yellow-200">FOLLOW US ON</span>
            <span className="text-yellow-200">WRITE TO US AT</span>
          </div>

          {/* Social Icons and Email */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Social Icons */}
            <div className="flex gap-6">


              {/* Instagram */}
              <a
                href="https://instagram.com"
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

              {/* YouTube */}
              <a
                href="https://www.linkedin.com/company/creators-street/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>

            {/* Email Address */}
            <div className="text-sm md:text-base text-white mt-4 md:mt-0">
              info@comicconindia.com
            </div>
          </div>
        </div>
      </section>






      {/* Footer */}
      <footer className="relative bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Creators Street</h3>
              <p className="text-gray-400 text-sm">
                India's Greatest Pop-Culture Experience
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Events', 'Tickets', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xs">{platform.charAt(0)}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Email: info@creatorsstreet.com</p>
                <p>Phone: +91 123 456 7890</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Creators Street. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
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