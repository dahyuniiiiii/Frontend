import React, { useRef, useState } from "react";
import "./Roulette.css";
import RouletteWheel from "./RouletteWheel";
import RouletteResult from "./RouletteResult";

function Roulette() {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const wheelRef = useRef(null);

  const handleResult = (value) => {
    setResult(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResult(null);
  };

  const handleSpinClick = () => {
    wheelRef.current?.spin?.();
  };

  return (
    <div className="rouletteWrapper">
      <p className="rouletteInfo">
        고민은 짧게, 선택은 랜덤으로! <br />
        오늘 메뉴 추천 드릴게유
      </p>
      <RouletteWheel ref={wheelRef} onResult={handleResult} />
      <button className="goRulette" onClick={handleSpinClick}>
        룰렛 돌리기
      </button>
      {open && <RouletteResult result={result} onClose={handleClose} />}
    </div>
  );
}

export default Roulette;
