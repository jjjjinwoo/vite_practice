import React, { useEffect, useRef, useState } from 'react';

function Map1() {
  const mapRef = useRef(null);

  const [marker, setMarker] = useState(null); // 마커 상태

  useEffect(() => {
    const naver = window.naver; // 네이버 지도 API 객체

    if (naver && mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울의 위도, 경도
        zoom: 10, // 초기 줌 레벨
      };

      // 지도 인스턴스 생성
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      const markerContent = `<div style="border: 1px solid black; border-radius: 50%; width: 20px; height: 20px; background-color:red"></div>`;

      // 마커 상태 초기화
      const initialMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map: map,
        icon: {
          content: markerContent // 마커 모양 커스텀
        }
      });

      setMarker(initialMarker); // 상태에 마커 저장
      
    }
  }, []); // 처음 한 번만 실행

  return (
    <>
      <h1>Map1 Page</h1>

      <div className="search">
        <input id="address" type="text" placeholder="검색할 주소" />
        <input id="submit" type="button" value="주소검색" />
      </div>

      <div id="map" style={{ width: '100vw', height: '700px' }} ref={mapRef}></div>
    </>
  );
}

export default Map1;
