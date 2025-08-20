import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Roulette.css";

function AdPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const next = location.state?.next || "/rouletteRecommend";
  const category = location.state?.category || "";

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(next, { state: { category } });
    }, 2000);
    return () => clearTimeout(t);
  }, [navigate, next, category]);

  return (
    <div className="AdWrapper">
      <img src="/assets/rouladimg.svg" className="AdImage" alt="ad" />
    </div>
  );
}

export default AdPage;
