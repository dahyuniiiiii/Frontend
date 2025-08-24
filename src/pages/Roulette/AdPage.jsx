import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Roulette.css";

function AdPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const next = location.state?.next || "/rouletteRecommend";
  const category = location.state?.category || "";
  const frames = [
    "/assets/loading1.svg",
    "/assets/loading2.svg",
    "/assets/loading3.svg",
    "/assets/loading4.svg",
    "/assets/loading5.svg",
    "/assets/loading6.svg",
    "/assets/loading7.svg",
  ];
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev < frames.length - 1) return prev + 1;
        else {
          clearInterval(interval);
          setTimeout(() => {
            navigate(next, { state: { category } });
          }, 200);
          return prev;
        }
      });
    }, 200);
    return () => clearInterval(interval);
  }, [frames.length, navigate, next, category]);

  return (
    <div className="AdWrapper">
      <img src="/assets/loading.svg" className="AdBackground" />
      <img src={frames[currentFrame]} className="AdAnimation" />
    </div>
  );
}

export default AdPage;
