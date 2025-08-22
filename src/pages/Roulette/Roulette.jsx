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
      <div className="rouletteInfo">
        <span className="rouletteInfot">
          고민은 짧게, 선택은 랜덤으로!
          <br />
        </span>
        <span>오늘 메뉴 추천 드릴게유</span>
      </div>
      <div className="roulewapper">
        <RouletteWheel ref={wheelRef} onResult={handleResult} />
        <button className="goRulette" onClick={handleSpinClick}>
          룰렛 돌리기
        </button>
      </div>
      {open && <RouletteResult result={result} onClose={handleClose} />}
    </div>
  );
}

export default Roulette;
