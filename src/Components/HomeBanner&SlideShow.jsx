import React, { useEffect, useState } from 'react';

const BannerAndSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://img.ltwebstatic.com/images3_ccc/2024/05/20/37/1716175355f6c281aaf38b721249600d1c7c48a4b6_thumbnail_2000x.webp',
    'https://img.ltwebstatic.com/images3_ccc/2024/05/20/ff/171620065044d776b78165182fa2b9534cf520d919_thumbnail_2000x.webp',
    'https://img.ltwebstatic.com/images3_ccc/2024/05/20/68/1716184339ee367179b2727bbe81b8377f3e16b0f7_thumbnail_2000x.webp',
    'https://img.ltwebstatic.com/images3_ccc/2024/05/20/e6/1716184233cefaaf03a382e5766cfe574af60037cb_thumbnail_2000x.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className=" mx-auto my-5 container flex gap-2 p-2 justify-center  h-[280px]">
      {/* Left Banner */}
      <div className="flex-1 bg-gray-200  ">
        <img src="https://img.ltwebstatic.com/images3_ccc/2024/05/10/fe/1715311765a5ed644cf2d8fed8a51b91ec0d3e0301_thumbnail_832x.webp" alt="Left Banner" 
        className="w-full  h-full object-fit" />
      </div>

      {/* Center Slideshow */}
      <div className="flex-[1.75] bg-gray-100 relative overflow-hidden ">
        <div className="slideshow-container relative w-full  ">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} className="w-full object-contain " />
            </div>
          ))}
        </div>
      </div>

      {/* Right Banner */}
      <div className="flex-1 bg-gray-200 h-full ">
      <img src="https://img.ltwebstatic.com/images3_ccc/2024/05/10/fe/1715311765a5ed644cf2d8fed8a51b91ec0d3e0301_thumbnail_832x.webp" alt="Left Banner" 
        className="w-full h-full object-fit" />
      </div>
    </div>
  );
};

export default BannerAndSlideshow;
