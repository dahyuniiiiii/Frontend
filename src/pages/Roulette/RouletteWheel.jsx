import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./RouletteWheel.css";

const options = ["양식", "한식", "중식", "일식"];
const images = {
  양식: "/assets/roul3.svg",
  한식: "/assets/roul2.svg",
  중식: "/assets/roul4.svg",
  일식: "/assets/roul1.svg",
};

const RouletteWheel = forwardRef(function RouletteWheel({ onResult }, ref) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  useImperativeHandle(ref, () => ({
    spin: () => spinWheel(),
  }));

  const spinWheel = () => {
    if (isSpinning) return;

    const count = options.length;
    const sectorAngle = 360 / count;
    const randomIndex = Math.floor(Math.random() * count);
    const jitter = Math.random() * (sectorAngle * 0.6) - sectorAngle * 0.3;
    const targetDeg = 360 * 8 + randomIndex * sectorAngle + jitter;

    setIsSpinning(true);
    setRotationDegree((prev) => prev + targetDeg);

    setTimeout(() => {
      onResult?.(options[randomIndex]);
      setIsSpinning(false);
    }, 3900);
  };

  return (
    <div className="roulette-container">
      <div className="wheelWrapper">
        <div className="pointerIcon">
          <img src="/assets/spinPointer.svg" alt="pointer" />
        </div>

        <div
          className={`wheel ${isSpinning ? "spinning" : ""}`}
          style={{ transform: `rotate(${rotationDegree}deg)` }}
        >
          {options.map((opt, idx) => (
            <div key={opt} className={`sector sector-${idx}`}>
              <img src={images[opt]} alt={opt} />
              <span>{opt}</span>
            </div>
          ))}

          <button
            className="startBtn"
            onClick={spinWheel}
            disabled={isSpinning}
            aria-label="start spinning"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
});

export default RouletteWheel;
