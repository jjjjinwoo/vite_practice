import React, { useState, useEffect } from "react";

function Component1({ address, onSearch }){
  const [localAddress, setLocalAddress] = useState(address);

  // 주소 입력 처리 함수
  function handleInputChange() {
    const newAddress = document.querySelector('input').value;
    setLocalAddress(newAddress);
  }

  function onSearchClick() {
    onSearch(localAddress); // 부모로 address 전달
  }

  useEffect(() => {
    console.log("Component1 address:", localAddress);
  }, [localAddress]);

  return(
    <>
      <input value={localAddress} onChange={handleInputChange} />
      <button style={{ backgroundColor: 'black' }} onClick={onSearchClick}>검색</button>
    </>
  )
}

export default Component1;