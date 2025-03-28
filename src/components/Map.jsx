import React, { useEffect, useRef, useState } from 'react';
import Panorama from '../components/panorama';

function Map({address, onAddressUbdate, mapCoorDatas}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 여러 마커를 관리하는 배열 상태
  const [selectedLat, setSelectedLat] = useState('37.5665')
  const [selectedLng, setSelectedLng] = useState('126.9780')

  useEffect(() => {
    if(mapCoorDatas.length > 0 && mapCoorDatas[0].lat && mapCoorDatas[0].lng){
      const naver = window.naver; // 네이버 지도 API 객체

      if (naver && mapRef.current) {
        console.log(mapCoorDatas)
        const mapOptions = {
          center: new naver.maps.LatLng(mapCoorDatas[0].lat, mapCoorDatas[0].lng), // 최상단 mapCoorDatas의 좌표값
          zoom: 15, // 초기 줌 레벨
        };
  
        // 지도 인스턴스 생성
        const map = new naver.maps.Map(mapRef.current, mapOptions);
        
        setMap(map); // map 상태 설정
  
        // 초기 마커들 추가
        const newMarkers = mapCoorDatas.map((location) => {
          const newLocation = new naver.maps.LatLng(location.lat, location.lng);
  
          // 마커 생성
          const newMarker = new naver.maps.Marker({
            position: newLocation,
            map: map,
            title: location.title,
          });
  
          return newMarker; // 마커 객체만 반환
        });
  
        // 마커 상태 업데이트
        setMarkers(newMarkers);
  
        // 지도 영역 변경 시 마커 필터링
        const listener = naver.maps.Event.addListener(map, 'idle', () => {
          filterMarkersInView(map, newMarkers);
        });
  
        // cleanup 함수 추가
        return () => {
          naver.maps.Event.removeListener(listener);
        };
      }
    }

  }, [mapCoorDatas]); // 처음 한 번만 실행

  // 지도에 보이는 영역 내에 있는 마커만 필터링
  const filterMarkersInView = (map, markers) => {
    const bounds = map.getBounds(); // 지도 영역 (가시 범위)
    
    markers.forEach((marker) => {
      if (bounds.hasLatLng(marker.getPosition())) {
        marker.setMap(map); // 보이는 마커는 지도에 표시
      } else {
        marker.setMap(null); // 보이지 않는 마커는 지도에서 제거
      }
    });
  };

  useEffect(()=>{
    // 주소 검색 
    const naver = window.naver;
    if (naver && address) {
      naver.maps.Service.geocode({
        query: address,
      }, function (status, response) {
        
        if (status !== naver.maps.Service.Status.OK || response.v2.addresses.length < 1) {
          return alert('검색결과가 없습니다.');
        }

        const result = response.v2;
        const items = result.addresses;

        onAddressUbdate(items[0].roadAddress);

        // 주소로 검색된 첫 번째 결과
        const newLocation = new naver.maps.LatLng(items[0].y, items[0].x);

        // 지도 중심을 새 위치로 이동
        map.setCenter(newLocation);
        map.setZoom(18); // 확대 레벨 조정

        // 기존 마커들이 있다면 위치를 업데이트
        if (markers.length > 0) {
          markers.forEach((marker) => {
            marker.setPosition(newLocation); // 위치 업데이트
            marker.setMap(map);
            setSelectedLat(newLocation.y)
            setSelectedLng(newLocation.x)
          });
        } else {
          const newMarker = new naver.maps.Marker({
            position: newLocation,
            map: map,
          });

          setMarkers([newMarker]); // 새 마커 상태 업데이트
        }
      });
    }
  },[address])
  
  return (
    <>
      <div 
        id="map" 
        style={{ width: '80vw', height: '700px' }} 
        ref={mapRef}
      >
        <Panorama selectedLat={selectedLat} selectedLng={selectedLng}/>
      </div>
    </>
  );
}

export default Map;
