import { useState } from 'react';
import './PastEvents.css';

const PastEvents = () => {
  const [galleryYear, setGalleryYear] = useState('2025');
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);

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
    ],
  };

  const gallerySlides = galleryData[galleryYear];

  const handleGalleryPrev = () => {
    setGallerySlideIndex((prev) =>
      prev === 0 ? gallerySlides.length - 1 : prev - 1
    );
  };

  const handleGalleryNext = () => {
    setGallerySlideIndex((prev) =>
      prev === gallerySlides.length - 1 ? 0 : prev + 1
    );
  };

  const handleGalleryYearChange = (year) => {
    setGalleryYear(year);
    setGallerySlideIndex(0);
  };

  return (
    <section id="events" className="past-events-section">
      <div className="past-events-container">
        {/* Year Selector */}
        <div className="past-events-year-selector">
          {['2024', '2025'].map((year) => (
            <button
              key={year}
              onClick={() => handleGalleryYearChange(year)}
              className={`past-events-year-button ${
                galleryYear === year
                  ? 'past-events-year-button-active'
                  : 'past-events-year-button-inactive'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Gallery Image */}
        <div className="past-events-gallery">
          <div className="past-events-gallery-image-container">
            <img
              src={gallerySlides[gallerySlideIndex].image}
              alt={gallerySlides[gallerySlideIndex].title}
              className="past-events-gallery-image"
            />
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handleGalleryPrev}
            className="past-events-gallery-nav-btn prev-btn"
          >
            <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleGalleryNext}
            className="past-events-gallery-nav-btn next-btn"
          >
            <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Gallery */}
        <div className="past-events-thumbnail-gallery">
          {gallerySlides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setGallerySlideIndex(index)}
              className={`past-events-thumbnail ${
                gallerySlideIndex === index ? 'selected-thumbnail' : ''
              }`}
            >
              <img src={slide.image} alt={slide.title} className="past-events-thumbnail-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
