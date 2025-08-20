import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/axios";
import "./RouletteRecommend.css";
import Ad from "../../Ad";
import { useNavigate } from "react-router-dom";

function RouletteRecommend() {
  const navigate = useNavigate();
  const location = useLocation();

  const category = useMemo(() => {
    return (
      location.state?.category ||
      new URLSearchParams(location.search).get("q") ||
      ""
    );
  }, [location.state, location.search]);

  const [showAd, setShowAd] = useState(true);
  const [coords, setCoords] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!showAd) return;
    const t = setTimeout(() => setShowAd(false), 2500);
    return () => clearTimeout(t);
  }, [showAd]);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setErr("현재 기기에서 위치 정보를 사용할 수 없어요.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ x: String(coords.longitude), y: String(coords.latitude) });
      },
      (e) => setErr(e?.message || "위치 권한을 허용해 주세요."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);
  useEffect(() => {
    if (!category || !coords?.x || !coords?.y) return;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const body = {
          query: category,
          x: coords.x,
          y: coords.y,
          radius: 3000,
          size: 5,
          sort: "distance",
          categoryGroupCode: "FD6",
        };
        const { data } = await api.post("/api/recommend", body);
        const docs = Array.isArray(data?.documents) ? data.documents : [];

        const top5 = docs
          .sort((a, b) => (Number(a.distance) || 0) - (Number(b.distance) || 0))
          .slice(0, 5);

        setStores(top5);
      } catch (e) {
        setErr(
          e?.response?.data?.message || e?.message || "요청에 실패했어요."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [category, coords]);
  const goAi = () => navigate("/ai-chat");

  return (
    <>
      {!showAd && (
        <div className="recoWrapper">
          <Ad />
          {!category && <div>카테고리 정보가 없어요.</div>}
          {loading && <div className="loadingText">불러오는 중…</div>}
          {err && !loading && <div>{err}</div>}
          {!loading && !err && (
            <div className="recoList">
              {stores.map((s, i) => (
                <div
                  className="recoCard"
                  key={s.id || i}
                  onClick={() => window.open(s.place_url || "#", "_blank")}
                >
                  {" "}
                  <div className="recoCardContent">
                    <div className="recoFirstLine">
                      <span className="recoFirstLineCate">{category}</span>
                      <h3 className="recoName">{s.place_name}</h3>
                    </div>
                    <div className="recoSecondLine">
                      <img
                        className="recoIcon"
                        src="assets/RoulRecom1.svg"
                      ></img>
                      <span className="recoText">
                        {s.road_address_name || s.address_name}
                      </span>
                    </div>
                  </div>
                  <div className="recoArrow">›</div>
                </div>
              ))}
            </div>
          )}
          <button className="goAiBtn" onClick={goAi}>
            천둥이한테 물어보기
          </button>
        </div>
      )}
    </>
  );
}
export default RouletteRecommend;
