import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import "./StoreDetail.css";

function StoreDetail() {
  const navigate = useNavigate();

  const location = useLocation();

  const place = location.state?.store;

  if (!place) return <div>매장 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="storeDetailWrapper">
      <div className="topIconWrapper">
        <button className="goBackBtn" onClick={() => navigate(-1)}>
          <img src="/assets/gobackIcon.svg" alt="뒤로가기" />
        </button>
        <div className="rightIcons">
          <button
            className="callBtn"
            onClick={() => (window.location.href = `tel:${place.phone}`)}
          >
            <img src="/assets/callIcon.svg" alt="전화" />
          </button>
          <button
            className="shareBtn"
            onClick={() =>
              navigator.share?.({
                title: place.place_name,
                text: `${place.place_name} - ${
                  place.roadAddressName || place.addressName
                }`,
                url: window.location.href,
              })
            }
          >
            <img src="/assets/shareIcon.svg" alt="공유" />
          </button>
        </div>
      </div>
      <img className="aiImg" src="/assets/ProjectLogo.svg" alt="로고" />
      <div className="detailcardWrapper">
        <span>{place.category_name || "정보 없음"}</span>
        <span className="placename">{place.place_name}</span>
        <div className="detailbottom">
          <div className="detailInfo">
            <img src="/assets/detailmarkIcon.svg" />
            <span className="placeaddress">
              {place.road_address_name || place.address_name}
            </span>
          </div>
          <div className="detailInfo">
            <img src="/assets/detailcallIcon.svg" />
            <span>{place.phone || "정보 없음"}</span>
          </div>
          <div className="detailInfo">
            <img src="/assets/detailmapIcon.svg" />
            <span>{place.place_url || "정보 없음"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
