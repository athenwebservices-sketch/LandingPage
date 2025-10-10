'use client';

import { useState, useEffect, useRef } from 'react';
import noBgImage from './no_bg_image.png';


export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeYear, setActiveYear] = useState('2025');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedYear, setSelectedYear] = useState('2024');
  const [fluidColors, setFluidColors] = useState([
    'rgba(250, 204, 21, 0.4)',
    'rgba(236, 72, 153, 0.4)',
    'rgba(59, 130, 246, 0.4)',
    'rgba(34, 197, 94, 0.4)'
  ]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  

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
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-center space-x-8">
      
      {/* Logo Image Only – Enlarged */}
      <a href="/" className="cursor-pointer group">
        <img 
          src="/no_bg_image.png" 
          alt="Creators Street Logo" 
          className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
          style={{
            filter: 'drop-shadow(0 0 8px white)',
          }}
        />
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        {["Events", "Cosplay", "Exhibit with us", "Join us"].map((item) => (
          <a 
            key={item}
            href="#" 
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Year Switcher */}
      <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-1">
        <button
          onClick={() => setActiveYear('2024')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeYear === '2024' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          2024
        </button>
        <button
          onClick={() => setActiveYear('2025')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeYear === '2025' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          2025
        </button>
      </div>
    </div>
  </div>
</nav>



      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Enhanced Interactive fluid background effect */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${fluidColors[currentColorIndex]} 0%, transparent ${isHovering ? '80%' : '60%'})`,
            opacity: isHovering ? 0.6 : 0.4,
            transform: `scale(${isHovering ? 1.1 : 1})`,
          }}
        />
        
        {/* Additional interactive layers */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 0.1}deg at ${mousePosition.x}px ${mousePosition.y}px, ${fluidColors[(currentColorIndex + 1) % fluidColors.length]}, transparent, ${fluidColors[(currentColorIndex + 2) % fluidColors.length]})`,
            opacity: isHovering ? 0.3 : 0.2,
            transform: `scale(${isHovering ? 1.05 : 1})`,
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        
        {/* Logo and content */}
        <div className="relative z-10 text-center fluid-cursor">
            {/* Logo Section */}
            <div className="w-96 h-40 mx-auto mb-8 relative flex items-center justify-center">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl blur-2xl opacity-60 animate-pulse" />
              
              {/* Logo image with enhancements */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src="/no_bg_image.png" 
                  alt="Logo" 
                  className="h-full brightness-125 transform scale-110 transition-transform duration-300 hover:scale-115"
                  style={{
                    filter: 'drop-shadow(0 0 15px white)'
                  }}
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-yellow-200"> India's Greatest Pop-Culture Experience </p>
            {/* Tagline with shine effect 
            <p className="text-xl md:text-2xl text-yellow-200 relative group inline-block">
              <span className="relative z-10">India's Greatest Pop-Culture Experience</span>
              
              {/* Shine effect using pseudo-element 
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-glow-shine pointer-events-none" />
            </p>*/}
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

      {/* Promotional Banner Section */}
      <section className="relative bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900 py-16">
        {/* Event Banner */}
        <div className="container mx-auto px-4 mb-12">
  <div className="text-center mb-8">
    <div className="inline-block relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-2xl blur-2xl opacity-60 animate-pulse"></div>

      {/* Foreground Card */}
      <div className="relative bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-md rounded-2xl p-10 border border-white/10 shadow-xl">
        
        {/* Logo and Title */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img 
            src="/no_bg_image.png" 
            alt="Creators Street Logo" 
            className="h-14 w-auto drop-shadow-[0_0_8px_white] transition-transform duration-300 hover:scale-105"
          />

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transform -rotate-2 inline-block">
              CREATORS
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 transform rotate-1 inline-block">
              STREET
            </span>
          </h2>
        </div>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
          India’s Biggest Celebration of Creativity
        </p>

        {/* Event Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 inline-block shadow-inner border border-white/10">
          <p className="text-lg font-semibold text-pink-400">Oct 31st – 2nd Nov 2025</p>
          <p className="text-lg text-yellow-300">Hyderabad | HICC Novotel</p>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* 5-Image Gallery */}
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-yellow-400 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "Awards", gradient: "from-purple-500 to-pink-500" },
                { name: "Cosplay", gradient: "from-blue-500 to-indigo-500" },
                { name: "Expo", gradient: "from-green-500 to-teal-500" },
                { name: "Workshops", gradient: "from-red-500 to-orange-500" },
                { name: "Keynotes", gradient: "from-yellow-500 to-amber-500" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotional Text */}
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed" style={{ 
              fontFamily: 'B612, sans-serif',
              fontWeight: 700,
              lineHeight: '150%',
              letterSpacing: '3.5%'
            }}>
              3 days of Awards, Cosplay, Expo, Workshops, Keynotes
            </p>
            <p className="text-white text-xl md:text-2xl font-bold mt-4" style={{ 
              fontFamily: 'B612, sans-serif',
              fontWeight: 700,
              lineHeight: '150%',
              letterSpacing: '3.5%'
            }}>
              30,000+ attendees | 10M+ digital reach | 500+ cosplayers
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Experience Zones Section */}
      <section className="relative bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Experience Zones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceZones.map((zone, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: `${zone.color}20` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6">
                  <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-white/10 to-white/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">🎭</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{zone.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{zone.description}</p>
                </div>
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
      <section className="relative bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Gallery Highlights
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Featured Slide */}
            <div className="relative mb-8">
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {gallerySlides[currentSlide].title}
                    </h3>
                    <p className="text-gray-300">
                      {gallerySlides[currentSlide].description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-3 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-3 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {gallerySlides.slice(0, 4).map((slide, index) => (
                <div
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    currentSlide === index ? 'ring-4 ring-yellow-400 scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{slide.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2">
              {gallerySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-yellow-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Now Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Limited Time Offer
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Join the Ultimate Pop-Culture Experience
              </h2>
              
              <div className="space-y-4 text-gray-300 text-lg">
                <p className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl mt-1">✨</span>
                  <span>Get exclusive access to all 4 experience zones</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl mt-1">🎭</span>
                  <span>Meet your favorite creators and celebrities</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl mt-1">🎮</span>
                  <span>Participate in gaming tournaments and workshops</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl mt-1">🏆</span>
                  <span>Win amazing prizes and exclusive merchandise</span>
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 line-through text-lg">Regular Price</span>
                  <span className="text-gray-400 line-through text-lg">₹2,999</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white text-xl font-bold">Early Bird Price</span>
                  <span className="text-yellow-400 text-2xl font-bold">₹1,999</span>
                </div>
                <div className="text-sm text-gray-400">
                  *Offer valid until December 31st, 2024
                </div>
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
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-2xl overflow-hidden border-2 border-white/20">
                  <div className="aspect-square w-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <div className="text-6xl">🎪</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Creators Street 2025</h3>
                        <p className="text-gray-300">Your adventure awaits!</p>
                        <div className="flex justify-center space-x-2 text-2xl">
                          <span>🎨</span>
                          <span>🎮</span>
                          <span>🎭</span>
                          <span>🏆</span>
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