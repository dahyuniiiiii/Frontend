import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MapPage.css";
import pinIcon from "./pinIcon.png";
function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const place = location.state?.store;

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const myMarker = useRef(null);
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
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        });
        mapInstance.current = map;
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

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보를 지원하지 않아요.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = new window.kakao.maps.LatLng(latitude, longitude);
        mapInstance.current.setCenter(loc);

        if (myMarker.current) myMarker.current.setMap(null);
        const marker = new window.kakao.maps.Marker({
          position: loc,
          image: pinIcon,
        });
        marker.setMap(mapInstance.current);
        myMarker.current = marker;
      },
      () => {
        alert("위치 정보를 가져올 수 없어요 😢");
      }
    );
  };

  if (!place) return <div>매장 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="mapPageWrapper">
      <div className="fullMapPage">
        <button className="BackBtn" onClick={() => navigate(-1)}>
          <img src="/assets/gobackIcon.svg" alt="뒤로가기" />
        </button>
        <button className="CurrentLocBtn" onClick={handleCurrentLocation}>
          <img src="/assets/locateIcon.svg" />
        </button>
        <div className="fullMapWrapper" ref={mapRef}>
          {!mapLoaded && <p>지도 로딩 중…</p>}
        </div>
      </div>
      {place && (
        <div className="mapBottomCard">
          <div className="bottomCate">
            <span className="mapBottomCate">
              {place.category_name?.split(" > ")[1] ||
                place.category_name ||
                "정보 없음"}
            </span>
            <span className="mapBottomName">{place.place_name}</span>
          </div>
          <span className="mapBottomAddr">
            <img src="/assets/detailmarkIcon.svg" />{" "}
            {place.road_address_name || place.address_name}
          </span>
        </div>
      )}
    </div>
  );
}

export default MapPage;
