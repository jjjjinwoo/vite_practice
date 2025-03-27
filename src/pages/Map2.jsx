import React, { useEffect, useRef, useState } from 'react';

function Map() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState(''); // 주소를 React state로 관리

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
    }
  }, []); // 처음 한 번만 실행

  const handleAddressSearch = () => {
    const addressInput = document.getElementById('address');
    const address = addressInput.value;

    // 주소 검색 
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

        // React state로 주소를 업데이트
        setAddress(items[0].roadAddress);

        // 주소로 검색된 첫 번째 결과
        const newLocation = new naver.maps.LatLng(items[0].y, items[0].x);

        // 지도 중심을 새 위치로 이동
        map.setCenter(newLocation);
        map.setZoom(20); // 확대 레벨 조정

        // 기존 마커가 있으면 위치 업데이트, 없으면 새 마커 추가
        if (marker) {
          marker.setPosition(newLocation);
        } else {
          const newMarker = new naver.maps.Marker({
            position: newLocation,
            map: map,
            icon: {
              content: `<div style="border: 2px solid blue; border-radius: 50%; width: 20px; height: 20px; background-color:red;"></div>`,
            },
          });

          setMarker(newMarker); // 새 마커 상태 업데이트
        }
      });
    }
  };

  return (
    <>
      <h1>지도 검색 페이지</h1>

      <div className="search">
        <input 
          id="address" 
          type="text" 
          placeholder="검색할 주소를 입력하세요" 
        />
        <input 
          id="submit" 
          type="button" 
          value="주소 검색" 
          onClick={handleAddressSearch} 
        />
      </div>

      <div 
        id="map" 
        style={{ width: '100vw', height: '700px' }} 
        ref={mapRef}
      ></div>

      <h2>검색결과 : {address ? address : '?'}</h2>
    </>
  );
}

export default Map;
