import React, { useEffect, useRef, useState } from 'react';

function Map3() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // 마커 상태
  const address = '서울특별시 종로구 세종대로 175 (세종로, 정부서울청사)'; // 초기 주소

  useEffect(() => {
    const naver = window.naver; // 네이버 지도 API 객체

    if (naver && mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울의 위도, 경도
        zoom: 10, // 초기 줌 레벨
      };

      // 지도 인스턴스 생성
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      
      setMap(map); // map 상태 설정

      // 초기 마커 추가
      const initialMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map: map
      });

      setMarker(initialMarker); // 마커 상태 설정

      // 주소를 기준으로 마커 추가
      handleAddressSearch(address, map); // 주소로 검색하여 초기 마커 설정
    }
  }, []); // 처음 한 번만 실행

  const handleAddressSearch = (address, map) => {
    const naver = window.naver;

    if (naver && address) {
      naver.maps.Service.geocode({
        query: address,
      }, function (status, response) {
        console.log('Response:', response);
        
        if (status !== naver.maps.Service.Status.OK || response.v2.addresses.length < 1) {
          return alert('검색결과가 없습니다.');
        }

        const result = response.v2;
        const items = result.addresses;

        // 주소로 검색된 첫 번째 결과
        const newLocation = new naver.maps.LatLng(items[0].y, items[0].x);

        // 지도 중심을 새 위치로 이동
        map.setCenter(newLocation);
        map.setZoom(18); // 확대 레벨 조정

        // 기존 마커가 있으면 위치 업데이트, 없으면 새 마커 추가
        if (marker) {
          marker.setPosition(newLocation); // 기존 마커 위치 업데이트
        } else {
          // 새로운 마커를 추가 (커스텀 마커)
          const newMarker = new naver.maps.Marker({
            position: newLocation,
            map: map
          });

          setMarker(newMarker); // 새 마커 상태 업데이트
        }
      });
    }
  };

  return (
    <>
      <h1>지도 페이지</h1>

      <div className="search">
        <input 
          type="text" 
          value={address} // 초기 주소값 표시
          readOnly // 수정 불가
        />
      </div>

      <div 
        id="map" 
        style={{ width: '100vw', height: '700px' }} 
        ref={mapRef}
      ></div>

      <h2>현재 위치: {address}</h2>
    </>
  );
}

export default Map3;
