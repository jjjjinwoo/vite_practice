import React, { useState, useEffect } from "react";
import Map from "../components/Map"
import SearchBar from "../components/SearchBar"
import ButtonComponent from "../components/ButtonComponent"

const mapDatas = [
  { name: '테헤란로', address: '서울 강남구 테헤란로 427'},
  { name: '삼성타워', address: '서울 강남구 테헤란로77길 11-9 삼성타워 2층'},
  { name: '만안초', address: '경기 안양시 만안구 안양로384번길 13 만안초등학교'},
  { name: '구로동', address: '서울특별시 구로구 구로동 1132-32'},
  { name: '한성빌딩', address: '서울시 강남구 삼성로 552길 한성빌딩'},
]

function RentalMap(){

  const [mapCoorDatas, setMapCoorDatas] = useState([]); // 주소 데이터 좌표로 변환 (for 마커, 파라노마)

  useEffect(() => {
    console.log(mapDatas)
    mapDatas.forEach(function (mapData) {
      naver.maps.Service.geocode({
        query: mapData.address
      }, function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
        }
        var result = response.v2, // 검색 결과의 컨테이너
          items = result.addresses; // 검색 결과의 배열

        // mapCoorDatas를 상태로 업데이트
        setMapCoorDatas(prevData => [
          ...prevData,
          { lat: items[0].y, lng: items[0].x, address: items[0].roadAddress }
        ]);
      });
    });
    
  }, [mapDatas]); // 컴포넌트가 마운트될 때 한 번만 실행  

  const [address,setAddress] = useState('');

  function ubdateAddress(newAddress){
    setAddress(newAddress)
  }

  return(
    <>
      <h1>RentalMap</h1>
      <SearchBar onSearch={ubdateAddress} address={address} />  {/* SearchBar 컴포넌트 사용 */}
      <ButtonComponent onClick={ubdateAddress} mapDatas={mapDatas} />
      <Map onAddressUbdate={ubdateAddress} address={address} mapCoorDatas={mapCoorDatas} />
    </>
  )
}

export default RentalMap;