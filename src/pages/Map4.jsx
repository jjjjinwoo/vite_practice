import React, { useEffect, useRef, useState } from 'react';
import Panorama from '../components/panorama';

function Map4() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(''); // 주소를 React state로 관리
  const [markers, setMarkers] = useState([]); // 여러 마커를 관리하는 배열 상태

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

      // 여러 마커를 초기화할 배열
      const initialMarkers = [
        { lat: 37.5665, lng: 126.978, title: '서울' },
        { lat: 35.1796, lng: 129.0756, title: '부산' },
        { lat: 37.4563, lng: 126.7052, title: '인천' },
        { lat: 35.8682, lng: 128.6010, title: '대구' },
        { lat: 35.1802, lng: 128.0394, title: '광주' },
        { lat: 36.6333, lng: 127.4887, title: '대전' },
        { lat: 37.2683, lng: 127.6358, title: '울산' },
        { lat: 33.4996, lng: 126.5312, title: '제주' },
        { lat: 37.4637, lng: 126.4407, title: '경기도' },
        { lat: 35.5433, lng: 129.3235, title: '경상남도' },
        { lat: 35.8245, lng: 127.1238, title: '전라북도' },
        { lat: 36.4791, lng: 126.5883, title: '충청남도' },
        { lat: 36.7919, lng: 127.4102, title: '충청북도' },
        { lat: 34.8047, lng: 126.7384, title: '전라남도' },
        { lat: 37.4519, lng: 127.0075, title: '경기도' },
        { lat: 35.1118, lng: 128.5295, title: '경상북도' },
        { lat: 35.5394, lng: 128.6481, title: '울산광역시' },
        { lat: 35.3441, lng: 127.7323, title: '충청남도' },
        { lat: 35.8222, lng: 128.5261, title: '김해' },
        { lat: 36.6688, lng: 127.1433, title: '홍성' },
        { lat: 35.5400, lng: 128.3999, title: '포항' },
        { lat: 37.2159, lng: 127.0010, title: '동두천' },
        { lat: 37.4535, lng: 126.6227, title: '화성' },
        { lat: 35.8692, lng: 128.6119, title: '경주' },
        { lat: 36.0382, lng: 128.1042, title: '영천' },
        { lat: 37.2040, lng: 128.1666, title: '속초' },
        { lat: 37.4733, lng: 126.6287, title: '안산' },
        { lat: 36.4512, lng: 126.8033, title: '당진' },
        { lat: 37.5683, lng: 127.3485, title: '성남' },
        { lat: 37.5922, lng: 126.8351, title: '수원' },
        { lat: 35.4903, lng: 128.2226, title: '진주' },
        { lat: 35.8353, lng: 127.2387, title: '정읍' },
        { lat: 37.2639, lng: 127.1105, title: '고양' },
        { lat: 37.7020, lng: 127.0147, title: '구리' },
        { lat: 37.3372, lng: 126.7271, title: '김포' },
        { lat: 37.4957, lng: 126.9519, title: '안양' },
        { lat: 37.4092, lng: 127.0911, title: '평택' },
        { lat: 37.3910, lng: 126.9391, title: '오산' },
        { lat: 35.1667, lng: 129.0667, title: '창원' },
        { lat: 36.3237, lng: 127.4312, title: '세종' },
        { lat: 37.6501, lng: 127.0060, title: '광명' },
        { lat: 37.3570, lng: 127.1266, title: '용인' },
        { lat: 36.6800, lng: 127.4412, title: '논산' },
        { lat: 35.8908, lng: 128.7136, title: '상주' },
        { lat: 37.8760, lng: 127.7315, title: '여주' },
        { lat: 36.7445, lng: 127.7263, title: '청주' },
        { lat: 35.3800, lng: 128.3674, title: '마산' },
        { lat: 37.2122, lng: 128.5813, title: '정선' },
        { lat: 37.3195, lng: 127.6262, title: '광주' },
        { lat: 37.4419, lng: 127.1289, title: '의정부' },
        { lat: 37.4519, lng: 127.0075, title: '김포' },
        { lat: 35.1167, lng: 128.7050, title: '포항' },
        { lat: 37.5665, lng: 126.9780, title: '서울' },
        { lat: 37.5665, lng: 126.978, title: '서울' },
        { lat: 37.4458, lng: 126.8969, title: '가평' },
        { lat: 37.1214, lng: 127.3712, title: '양주' },
        { lat: 37.1362, lng: 127.7466, title: '구리' },
        { lat: 36.5613, lng: 127.0345, title: '천안' },
        { lat: 35.5204, lng: 128.4891, title: '김해' },
        { lat: 35.1483, lng: 128.0917, title: '양산' },
        { lat: 35.1687, lng: 129.0399, title: '마산' },
        { lat: 35.2356, lng: 128.6531, title: '상주' },
        { lat: 37.4691, lng: 126.8982, title: '화성' },
        { lat: 37.3535, lng: 127.8368, title: '오산' },
        { lat: 37.4862, lng: 127.1311, title: '평택' },
        { lat: 37.2329, lng: 127.2322, title: '광주' },
        { lat: 37.4067, lng: 127.7887, title: '이천' },
        { lat: 37.5525, lng: 126.8950, title: '파주' },
        { lat: 36.6250, lng: 127.4363, title: '세종' },
        { lat: 36.9752, lng: 127.8311, title: '당진' },
        { lat: 35.1770, lng: 128.0714, title: '김해' },
        { lat: 35.5249, lng: 128.4897, title: '창원' },
        { lat: 37.2570, lng: 127.2630, title: '포천' },
        { lat: 35.6111, lng: 127.2433, title: '정읍' },
        { lat: 37.5747, lng: 127.4184, title: '부천' },
        { lat: 35.4097, lng: 127.2130, title: '논산' },
        { lat: 37.2763, lng: 127.1099, title: '동두천' },
        { lat: 37.3852, lng: 127.0228, title: '의왕' },
        { lat: 37.2392, lng: 127.2139, title: '양평' },
        { lat: 37.4399, lng: 127.6483, title: '여주' },
        { lat: 37.6879, lng: 127.2286, title: '광명' },
        { lat: 35.4374, lng: 128.4475, title: '거제' },
        { lat: 35.3189, lng: 128.7597, title: '합천' },
        { lat: 36.3032, lng: 127.9784, title: '아산' },
        { lat: 36.6200, lng: 127.3232, title: '청양' },
        { lat: 35.4173, lng: 128.7363, title: '고성' },
        { lat: 37.4977, lng: 127.1271, title: '서울' },
        { lat: 35.5924, lng: 127.1415, title: '충남' },
        { lat: 36.5732, lng: 127.2281, title: '논산' },
        { lat: 36.6311, lng: 127.4123, title: '대전' },
        { lat: 35.3272, lng: 128.2517, title: '상주' },
        { lat: 37.3897, lng: 127.1194, title: '부천' },
        { lat: 37.5354, lng: 126.7565, title: '송도' },
        { lat: 36.7289, lng: 128.4644, title: '구미' },
        { lat: 37.4884, lng: 127.3125, title: '양평' },
        { lat: 35.8753, lng: 128.2969, title: '광주' },
        { lat: 35.5715, lng: 127.2687, title: '장성' },
        { lat: 36.4791, lng: 127.4678, title: '홍성' },
        { lat: 37.5718, lng: 127.6795, title: '동두천' },
        { lat: 37.5734, lng: 126.8352, title: '수원' },
        { lat: 37.3759, lng: 126.9334, title: '안양' },
        { lat: 37.6879, lng: 127.2286, title: '광명' }
      ];

      // 초기 마커들 추가
      const newMarkers = initialMarkers.map((location) => {
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
  }, []); // 처음 한 번만 실행

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

        // 기존 마커들이 있다면 위치를 업데이트
        if (markers.length > 0) {
          markers.forEach((marker) => {
            console.log(newLocation)
            marker.setPosition(newLocation); // 위치 업데이트
            marker.setMap(map);
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
  };
  
  return (
    <>
      <h1>Map4</h1>

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
      
      <button>1번 위치</button>
      <button>2번 위치</button>
      <button>3번 위치</button>
      <button>4번 위치</button>
      <button>5번 위치</button>
      <button>6번 위치</button>

      <div 
        id="map" 
        style={{ width: '80vw', height: '700px' }} 
        ref={mapRef}
      >
        <Panorama />
      </div>

      <h2>검색결과 : {address ? address : '?'}</h2>
    </>
  );
}

export default Map4;
