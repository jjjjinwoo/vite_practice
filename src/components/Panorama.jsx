import React, { useEffect } from 'react';

function Panorama({selectedLat, selectedLng}) {

  useEffect(() => {

    // 네이버 지도 파노라마 객체 생성
    var pano = new naver.maps.Panorama(document.getElementById("pano"), {
      position: new naver.maps.LatLng(selectedLat, selectedLng), // 파노라마 시작 위치
      size: new naver.maps.Size(300, 220), // 파노라마 뷰 크기
      pov: { // 파노라마 뷰의 초기 시점
        pan: 300, 
        tilt: 10,
        fov: 100
      }
    });

    // 컴포넌트 언마운트 시 파노라마 객체 정리
    return () => {
      if (pano) {
        pano = null;
      }
    };
  }, [selectedLat]); // 빈 배열을 넣어주면 컴포넌트가 마운트될 때만 실행됩니다.

  return (
    <div id="pano" style={{ position:'absolute', right:'0', bottom:'0', zIndex:'1'}}></div>
  );
}

export default Panorama;
