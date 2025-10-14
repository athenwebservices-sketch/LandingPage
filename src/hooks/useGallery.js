'use client';

import { useState, useEffect } from 'react';

export function useGallery(galleryData, initialYear = '2025') {
  const [galleryYear, setGalleryYear] = useState(initialYear);
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);
  const [galleryIsHovering, setGalleryIsHovering] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  
  const THUMBNAILS_VISIBLE = 4;
  const gallerySlides = galleryData[galleryYear] || [];

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

  const handleGallerySlideChange = (index) => {
    setGallerySlideIndex(index);
  };

  const handleGalleryYearChange = (year) => {
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

  // Sync thumbnail scroll with main slide
  useEffect(() => {
    const newStartIndex = Math.min(
      Math.max(0, gallerySlideIndex - Math.floor(THUMBNAILS_VISIBLE / 2)),
      gallerySlides.length - THUMBNAILS_VISIBLE
    );
    setThumbnailStartIndex(newStartIndex);
  }, [gallerySlideIndex, galleryYear, gallerySlides.length]);

  return {
    galleryYear,
    gallerySlideIndex,
    galleryIsHovering,
    setGalleryIsHovering,
    thumbnailStartIndex,
    gallerySlides,
    THUMBNAILS_VISIBLE,
    handleGalleryPrev,
    handleGalleryNext,
    handleGallerySlideChange,
    handleGalleryYearChange,
    handleThumbnailScrollLeft,
    handleThumbnailScrollRight
  };
}