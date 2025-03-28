import React, { useState } from "react";
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'

function Home() {
  const [address, setAddress] = useState(''); // Home 컴포넌트에서 address 상태를 관리

  function updateAddress(newAddress) {
    setAddress(newAddress);
  }

  return(
    <>
      <h1>Home Page</h1>
      <Component1 address={address} onSearch={updateAddress} /> {/* address와 onSearch를 props로 전달 */}
      <Component2 address={address} /> {/* 다른 컴포넌트에서 address를 사용 */}
    </>
  ) 
}

export default Home
