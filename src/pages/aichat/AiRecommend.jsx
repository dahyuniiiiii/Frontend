import React from "react";
import { useLocation } from "react-router-dom";
import "./AiRecommend.css";
import Ad from "../../Ad";

function AiRecommend() {
  const { state } = useLocation();
  const stores = Array.isArray(state?.stores) ? state.stores : [];

  const openBestLink = (s) => {
    const url = s?.kakaoLink || s?.googleLink || "#";
    if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <Ad />
        <img className="aiImg" src="/assets/ProjectLogo.svg" alt="logo" />

        <div className="textWrapper">
          <div>천둥이가 골라줬어유!</div>
          <div>요런 집 어때유?</div>
        </div>

        {stores.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div style={{ marginBottom: 12 }}>표시할 추천이 없어요.</div>
          </div>
        ) : (
          <div className="recoList">
            {stores.map((s, i) => (
              <div key={`${s.name}-${i}`} onClick={() => openBestLink(s)}>
                <div className="recoFirstLine">
                  <span className="recoFirstLineCate">
                    {s.category1 || "한식"}
                  </span>
                  <h3 className="recoName">{s.name}</h3>
                </div>
                <div className="recoSecondLine">
                  <img
                    className="recoIcon"
                    src="/assets/RoulRecom1.svg"
                    alt=""
                  />
                  <span className="recoText">
                    {s.address || "주소 정보 없음"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AiRecommend;
