import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AiRecommend.css";
import Ad from "../../Ad";
import api from "../../utils/axios";

function AiRecommend() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [stores, setStores] = useState(
    Array.isArray(state?.stores) ? state.stores.slice(0, 3) : []
  );
  const requestId = state?.requestId || null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      if (!requestId || stores.length > 0) return;
      setLoading(true);
      try {
        const res = await api.get("/api/chat/stores", {
          params: { requestId },
        });
        const list = Array.isArray(res?.data?.stores) ? res.data.stores : [];
        setStores(list.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [requestId, stores.length]);

  const openBestLink = (s) => {
    const url = s?.kakaoLink || s?.googleLink || "#";
    if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <Ad />
        <div className="aiRecommendTop">
          <img className="aiImg" src="/assets/ProjectLogo.svg" alt="logo" />
          <div className="textWrapper">
            <div>천둥이가 골라줬어유!</div>
            <div>요런 집 어때유?</div>
          </div>
        </div>

        {loading ? (
          <div className="loadingText">불러오는 중이에유...</div>
        ) : stores.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 24,
              whiteSpace: "pre-line",
            }}
          >
            죄송해유. 추천할 가게 정보가 없네유!{"\n"}
            다른 키워드로 다시 물어봐주실래유?
            <div style={{ marginTop: 12 }}>
              <button
                className="airecomBtn"
                onClick={() => navigate("/ai-chat")}
              >
                AI 채팅으로 돌아가기
              </button>
            </div>
          </div>
        ) : (
          <div className="recoList">
            {stores.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="recoItem"
                onClick={() => openBestLink(s)}
              >
                <div className="recoFirstLine">
                  <span className="recoFirstLineCate">
                    {s.category1 || "한식"}
                  </span>
                  <h3 className="recoName">{s.name}</h3>
                  <span className="recoChevron" aria-hidden>
                    ›
                  </span>
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
