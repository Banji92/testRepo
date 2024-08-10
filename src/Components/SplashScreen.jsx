import React, { useEffect, useState } from "react";
import "../styles/SplashScreen.css";

const SloganImage = `${process.env.PUBLIC_URL}/Slogan.jpg`;
const SeamlessImage = `${process.env.PUBLIC_URL}/Seamless.jpg`;
const DynamicImage = `${process.env.PUBLIC_URL}/Dynamic.jpg`;

const images = [DynamicImage, SeamlessImage, SloganImage];

const SplashScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image ${
            index === currentImageIndex ? "active" : ""
          } ml-10 my-4  `}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default SplashScreen;
