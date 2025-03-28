import React, {useState} from "react";

function ButtonComponents({onClick, mapDatas}) {

  function handleClick(button){
    onClick(button.address);
  }

  return (
    <div> {/* 여러 버튼을 감쌀 부모 요소로 <div> 사용 */}
      {mapDatas.map((button, index) => (
        <button key={index} onClick={() => handleClick(button)}>
          {button.name}
        </button>
      ))}
    </div>
  );
}

export default ButtonComponents;
