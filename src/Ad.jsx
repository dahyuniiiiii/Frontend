import React, { useEffect, useRef, useState } from "react";
import "./Ad.css";

function Ad() {
  const ads = [
    "/assets/ad1.svg",
    "/assets/ad2.svg",
    "/assets/ad3.svg",
    "/assets/ad4.svg",
    "/assets/ad5.svg",
  ];

  const slides = [ads[ads.length - 1], ...ads, ads[0]];

  const [index, setIndex] = useState(1);
  const [anim, setAnim] = useState(true);
  const wrapperRef = useRef(null);
  const autoRef = useRef(null);
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    autoRef.current = setInterval(() => next(), 3000);
  };
  const stopAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };

  const next = () => setIndex((p) => p + 1);
  const prev = () => setIndex((p) => p - 1);

  useEffect(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transition = anim
      ? "transform 0.5s ease-in-out"
      : "none";
    wrapperRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index, anim]);

  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setAnim(false);
      setIndex(1);

      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (index === 0) {
      setAnim(false);
      setIndex(slides.length - 2);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }
  };

  const startX = useRef(0);
  const deltaX = useRef(0);

  const onTouchStart = (e) => {
    stopAuto();
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50;
    if (deltaX.current < -threshold) next();
    else if (deltaX.current > threshold) prev();
    startAuto();
  };

  return (
    <div
      className="adSlider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="adWrapper"
        ref={wrapperRef}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="adImage"
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

export default Ad;
