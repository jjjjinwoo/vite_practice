// components/SearchBar.js
import React, { useState, useEffect } from "react";

function SearchBar({address, onSearch}) {

  const [localAddress,setLocalAddress] = useState(address);

  function valueUbdate(){
    setLocalAddress(document.querySelector('input').value)
  }

  function onLocalSearch(){
    onSearch(localAddress)
  }

  return (
    <div className="search">
      <input 
        id="address" 
        type="text" 
        placeholder="검색할 주소를 입력하세요" 
        onChange={valueUbdate}
      />
      <input 
        id="submit" 
        type="button" 
        value="주소 검색" 
        onClick={onLocalSearch}
      />
    </div>
  );
}

export default SearchBar;
