import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StoreDetail.css";
import pinIcon from "./pinIcon.png";

function StoreDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const place = location.state?.store;

  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const lat = parseFloat(place?.y) || 36.8151;
  const lng = parseFloat(place?.x) || 127.1139;

  useEffect(() => {
    if (!place) return;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_KEY
    }&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        });
        const markerImage = new window.kakao.maps.MarkerImage(
          pinIcon,
          new window.kakao.maps.Size(28, 39)
        );
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          image: markerImage,
        });
        marker.setMap(map);

        setMapLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [lat, lng, place]);

  if (!place) return <div>매장 정보를 찾을 수 없습니다.</div>;

  const category =
    place.category_name?.split(" > ")[1] || place.category_name || "정보 없음";

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
                  place.road_address_name || place.address_name
                }`,
                url: window.location.href,
              })
            }
          >
            <img src="/assets/shareIcon.svg" alt="공유" />
          </button>
        </div>
      </div>
      <div className="aiImgWrapper">
        <img className="aiImg" src="/assets/ProjectLogo.svg" alt="로고" />
      </div>
      <div className="detailcardWrapper">
        <span className="detailcate">{category}</span>
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
      <span className="mapInfo">위치정보</span>
      <div className="mapWrapper" ref={mapContainerRef}>
        {!mapLoaded && <p>지도 로딩 중…</p>}
        <button
          className="mapViewBtn"
          onClick={() => navigate("/map", { state: { store: place } })}
        >
          지도보기
        </button>
      </div>
    </div>
  );
}

export default StoreDetail;
