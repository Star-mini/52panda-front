import React from 'react';
import '../static/styles/css/PriceList.css'; // CSS 파일 임포트

function PriceList() {
  const items = [
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' }
  ];

  return (
    <div className="container">
      <div className="header">
        <span className="current-price-title">현재가격</span>
        <span className="current-price">8000원</span>
      </div>
      <div className="item-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceList;
