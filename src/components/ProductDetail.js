import React, { useState } from 'react';
import styles from '../static/styles/css/ProductDetail.module.css';
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
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles['carousel-control-prev']} onClick={() => changeImage(-1)}>
          <img src={placeholder} alt="Previous" />
        </div>
        <div id={styles.productImage}>
          <img className={styles['product-img']} src={images[currentImageIndex]} alt="Product Image" />
        </div>
        <div className={styles['carousel-control-next']} onClick={() => changeImage(1)}>
          <img src={placeholder} alt="Next" />
        </div>
      </div>

      <div className={styles['product-details']}>
        <h1 className={styles['product-title']}>아이폰 13프로</h1>
        <p className={styles.category}>전자제품/휴대폰/아이폰</p>
        <p className={styles['time-remaining']}>낙찰까지 <span id={styles.bidTime}>13:03:93</span></p>
        <div className={styles['bidding-details']}>
          <h3 className={styles['start-price']}>시작 금액 500,000</h3>
          <h1 className={styles['current-price']}>현재 금액 800,000</h1>
          <h1 className={styles['instant-price']}>즉시낙찰 금액 1,000,000</h1>
        </div>
      </div>

      <div className={styles['button-container']}>
        <button className={styles['bid-button']} onClick={togglePopup}>입찰하기</button>
      </div>

      {isPopupVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={togglePopup}>닫기</button>
            <div className={styles['popup-content']}>
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
