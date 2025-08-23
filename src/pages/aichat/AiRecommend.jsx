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

  return (
    <div className="aiRecoPage">
      <Ad />
      <div className="aiRecommendTop">
        <img className="aiImg" src="/assets/ProjectLogo.svg" alt="logo" />
      </div>
      <div className="bottomWrapper">
        <div className="textWrapper">
          <div className="textTop">천둥이가 골라줬어유!</div>
          <div className="textBottom">요런 집 어때유?</div>
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
          <div className="aiRecoList">
            {stores.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="aiRecoItem"
                onClick={() =>
                  navigate("/store-detail", { state: { store: s } })
                }
              >
                <div className="recoCardContent">
                  <div className="recoFirstLine">
                    <span className="recoFirstLineCate">
                      {s.category1 || "한식"}
                    </span>
                    <h3 className="recoName">{s.place_name}</h3>
                  </div>
                  <div className="recoSecondLine">
                    <img className="recoIcon" src="/assets/RoulRecom1.svg" />
                    <span className="recoText">
                      {s.road_address_name || "주소 정보 없음"}
                    </span>
                  </div>
                </div>
                <div className="recoArrow">
                  <img src="assets/recoArrow.svg" />
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
