import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import "../styles/Slideshow.css";


const fade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

interface SlideshowContainerProps {
  height: string;
  justifyContent: string;

}

const SlideshowContainer = styled.div<SlideshowContainerProps>`
  width: 100%;
  height: ${(props) => props.height}; 
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: ${(props)=> props.justifyContent}; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */

  @media (max-width: 768px) {
    height: 300px; 
  }

`;

interface SlideImageProps {
  'data-is-visible': boolean;
}

const SlideImage = styled.img.attrs<SlideImageProps>(({ 'data-is-visible': isVisible }) => ({
  'data-is-visible': isVisible,
})) <SlideImageProps>`
  width: 100%;
  height: 100%;
  object-fit: fill; /* Ensure the image covers the container while maintaining aspect ratio */
  position: absolute;

  opacity: ${(props) => (props['data-is-visible'] ? 1 : 0)};
  animation: ${(props) => (props['data-is-visible'] ? fade : '')} 1s;
  transition: opacity 1s;
`;

interface SlideshowProps {
  images: string[];
  height?: string; 
  justifyContent?: string
  
}

const Slideshow: React.FC<SlideshowProps> = ({ images, height = '400px', justifyContent = "center" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <SlideshowContainer height={height} justifyContent={justifyContent} >
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
