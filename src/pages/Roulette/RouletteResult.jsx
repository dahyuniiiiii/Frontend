import "./RouletteResult.css";
import { useNavigate } from "react-router-dom";

const images = {
  양식: "/assets/roul3.svg",
  한식: "/assets/roul2.svg",
  중식: "/assets/roul4.svg",
  일식: "/assets/roul1.svg",
};

function RouletteResult({ result, onClose }) {
  const navigate = useNavigate();

  const handleAskAi = () => navigate("/ai-chat");

  const handleGoRecommend = () => {
    navigate("/rouletteRecommend", {
      state: { category: result },
      replace: false,
    });
  };

  return (
    <div className="modalWrapper">
      <div className="resultmodal">
        <button className="modalClose" onClick={onClose}>
          x
        </button>

        <span className="resultText">
          룰렛 결과
          <br />
          오늘은 {result}이 나왔어유!
        </span>

        <img src={images[result]} alt={result} className="resultImg" />

        <div className="resultButtons">
          <button onClick={handleAskAi}>천둥이한테 물어보기</button>
          <button onClick={handleGoRecommend}>추천식당 보기</button>
        </div>
      </div>
    </div>
  );
}
export default RouletteResult;
