import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setErr("현재 기기에서 위치 정보를 사용할 수 없어요.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setCoords({ x: String(coords.longitude), y: String(coords.latitude) }),
      (e) => {
        let errorMessage = "위치 권한을 허용해 주세요.";
        if (e.code === e.PERMISSION_DENIED) {
          errorMessage = "위치 권한을 허용해 주세요.";
        } else if (e.code === e.POSITION_UNAVAILABLE) {
          errorMessage = "현재 위치 정보를 찾을 수 없어요.";
        } else if (e.code === e.TIMEOUT) {
          errorMessage = "위치 정보를 가져오는 데 시간이 초과되었어요.";
        }
        setErr(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");

        const baseBody = {
          query: "음식점",
          radius: 3000,
          size: 5,
          page: 1,
          categoryGroupCode: "FD6",
        };

        let data;
        if (coords?.x && coords?.y) {
          const res = await api.post("/api/place/search/accuracy", {
            ...baseBody,
            x: coords.x,
            y: coords.y,
            sort: "distance",
          });
          data = res.data;
        } else {
          const res = await api.post("/api/place/search/accuracy", baseBody);
          data = res.data;
        }

        const docs = Array.isArray(data?.documents) ? data.documents : [];
        setStores(docs);
      } catch (e) {
        setErr(
          e?.response?.data?.message || e?.message || "요청에 실패했어요."
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [coords]);

  const openPlace = (store) => {
    navigate("/store-detail", { state: { store } });
  };

  const getCate = (s) =>
    s?.category_name
      ? s.category_name.split(" > ")[1] || s.category_name
      : "기타";

  return (
    <div className="home">
      <div className="homeWrapper">
        <img className="aiImg" src="assets/ProjectLogo.svg" />
        <img
          className="roulImg"
          src="assets/mainRoul.png"
          onClick={() => {
            navigate("/roulette");
          }}
        />

        <div className="homeShopSec">
          <div className="homeShopHeader">
            <h2 className="homeShopTitle">천안 가게</h2>
            <button
              className="homeSeeAllBtn"
              onClick={() => navigate("/shop")}
              aria-label="전체보기"
            >
              전체보기 &gt;
            </button>
          </div>

          {loading && <p className="homeShopHint">불러오는 중…</p>}
          {!!err && !loading && <p className="homeShopHint">{err}</p>}

          {!loading && !err && (
            <div className="homeShopTrack">
              {stores.map((s, i) => (
                <article
                  key={s.id || i}
                  className="homeShopCard"
                  onClick={() => openPlace(s)}
                >
                  <span className="homeCate">{getCate(s)}</span>
                  <h3 className="homeShopName">{s.place_name}</h3>
                  <div className="homeShopBottom">
                    <img
                      className="homeIcon"
                      src="/assets/RoulRecom1.svg"
                      alt=""
                    />
                    <span className="homeShopAddr">
                      {s.road_address_name || s.address_name}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
