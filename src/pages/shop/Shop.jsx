import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/axios";
import Ad from "../../Ad";
import "./Shop.css";

const CATEGORIES = ["전체", "한식", "일식", "중식", "양식", "카페"];
const SORTS = ["기본", "가까운 순"];

function Shop() {
  const location = useLocation();
  const initialCat = useMemo(() => {
    const q = new URLSearchParams(location.search).get("q");
    return CATEGORIES.includes(q || "") ? q : "전체"; 
  }, [location.search]);

  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sort, setSort] = useState("기본");
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
      ({ coords }) => {
        setCoords({ x: String(coords.longitude), y: String(coords.latitude) });
      },
      (e) => setErr(e?.message || "위치 권한을 허용해 주세요."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    const run = async () => {
      const query = selectedCat === "전체" ? "음식점" : selectedCat;

      if (
        (sort === "기본" || sort === "가까운 순") &&
        (!coords?.x || !coords?.y)
      )
        return;

      try {
        setLoading(true);
        setErr("");

        const baseBody = {
          query,
          radius: 3000,
          size: 14,
          page: 1,
          categoryGroupCode: "FD6", 
        };

        let data;
        if (sort === "기본") {
          const res = await api.post("/api/place/search/accuracy", baseBody);
          data = res.data;
        } else {
          const body = {
            ...baseBody,
            x: coords.x,
            y: coords.y,
            sort: "distance",
          };
          const res = await api.post("/api/place/search/distance", body);
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
  }, [selectedCat, sort, coords]);

  const openPlace = (url) => window.open(url || "#", "_blank");

  return (
    <div className="shopWrapper">
      <Ad />
      <div>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${selectedCat === c ? "active" : ""}`}
            onClick={() => setSelectedCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div>
        <select
          className="optionBar"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading && <div>불러오는 중…</div>}
      {err && !loading && <div>{err}</div>}

      {!loading && !err && (
        <div className="listWrapper">
          {stores.map((s, i) => (
            <article
              key={s.id || i}
              className="cardWrapper"
              onClick={() => openPlace(s.place_url)}
            >
              <span className="cate">
                {selectedCat === "전체" ? "맛집" : selectedCat}
              </span>
              <h3 className="shopname">{s.place_name}</h3>

              <div className="shopbottom">
                <img className="icon" src="/assets/RoulRecom1.svg" alt="" />
                <span className="shop-txt">
                  {s.road_address_name || s.address_name}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
