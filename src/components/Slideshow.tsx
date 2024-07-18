import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import "../styles/Slideshow.css";

const imagesArray = [
  '/assets/new.png',
  '/assets/c.png',
  '/assets/newBalance.png',
];

const fade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SlideshowContainer = styled.div`
  width: 100%;
  height: 400px; /* Define a specific height for the container */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
`;

interface SlideImageProps {
  'data-is-visible': boolean;
}

const SlideImage = styled.img.attrs<SlideImageProps>(({ 'data-is-visible': isVisible }) => ({
  'data-is-visible': isVisible,
}))<SlideImageProps>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensure the image covers the container while maintaining aspect ratio */
  position: absolute;
  opacity: ${(props) => (props['data-is-visible'] ? 1 : 0)};
  animation: ${(props) => (props['data-is-visible'] ? fade : '')} 1s;
  transition: opacity 1s;
`;

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <SlideshowContainer>
      {images.map((image, index) => (
        <SlideImage
          key={index}
          src={image}
          alt={`Slide ${index}`}
          data-is-visible={index === currentImageIndex}
          className={index === currentImageIndex ? 'slide-image visible' : 'slide-image'}
        />
      ))}
    </SlideshowContainer>
  );
};

export default Slideshow;
