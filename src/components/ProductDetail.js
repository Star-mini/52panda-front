import React, { useState } from 'react';
import '../static/styles/css/ProductDetail.css';
import placeholder from '../static/styles/images/placeholder.png';
import iphone from '../static/styles/images/iphone.png';
import PriceList from '../components/PriceList'; 
import AmountSelection from '../components/AmountSelection';

function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const images = [
    iphone,
    'https://via.placeholder.com/300/0000FF',
    'https://via.placeholder.com/300/FF0000'
  ];

  const changeImage = (direction) => {
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentImageIndex(newIndex);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="container">
      <div className="carousel">
        <div className="carousel-control-prev" onClick={() => changeImage(-1)}>
          <img src={placeholder} alt="Previous" />
        </div>
        <div id="productImage">
          <img className="product-img" src={images[currentImageIndex]} alt="Product Image" />
        </div>
        <div className="carousel-control-next" onClick={() => changeImage(1)}>
          <img src={placeholder} alt="Next" />
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-title">아이폰 13프로</h1>
        <p className="category">전자제품/휴대폰/아이폰</p>
        <p className="time-remaining">낙찰까지 <span id="bidTime">13:03:93</span></p>
        <div className="bidding-details">
          <h3 className="start-price">시작 금액 500,000</h3>
          <h1 className="current-price">현재 금액 800,000</h1>
          <h1 className="instant-price">즉시낙찰 금액 1,000,000</h1>
        </div>
      </div>

      <div className="button-container">
        <button className="bid-button" onClick={togglePopup}>입찰하기</button>
      </div>

      {isPopupVisible && (
  <div className="overlay">
    <div className="popup">
    <button onClick={togglePopup}>닫기</button>

      <div className="popup-content">
        <PriceList />
        <AmountSelection />
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ProductDetail;
