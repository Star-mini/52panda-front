import React, { useState } from 'react';
import styles from '../static/styles/css/ProductDetail.module.css';
import placeholder from '../static/styles/images/placeholder.png';
import PriceList from '../components/PriceList'; 
import AmountSelection from '../components/AmountSelection';
import heartIcon from '../static/styles/images/heart.png'; // 하트 이미지를 import 합니다.
import closeIcon from '../static/styles/images/close.png';


function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const images = [
    'data:image/jpeg;base64,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',
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
        <div className={styles['carouselControlPrev']} onClick={() => changeImage(-1)}>
          <img src={placeholder} alt="Previous" />
        </div>
        <div id={styles.productImage}>
          <img className={styles['productImg']} src={images[currentImageIndex]} alt="Product Image" />
        </div>
        <div className={styles['carouselControlNext']} onClick={() => changeImage(1)}>
          <img src={placeholder} alt="Next" />
        </div>
      </div>

      <div className={styles['productDetails']}>
        <h4 className={styles['productTitle']}>아이폰 13프로</h4>
        <img src={heartIcon} className={styles.heart} alt="Heart" /> {/* 하트 이미지를 삽입합니다. */}
        <p className={styles.category}>전자제품/휴대폰/아이폰</p>
        <p className={styles['timeRemaining']}>낙찰까지 <span id={styles.bidTime}>13:03:93</span></p>
        <div className={styles['biddingDetails']}>
          <p className={styles['startPrice']}>시작 금액 500,000</p>
          <p className={styles['currentPrice']}>현재 금액 800,000</p>
          <p className={styles['instantPrice']}>즉시낙찰 금액 1,000,000</p>
        </div>
      </div>

      <div className={styles['buttonContainer']}>
        <button className={styles['bidButton']} onClick={togglePopup}>입찰하기</button>
      </div>

      {isPopupVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={togglePopup}>
              <img src={closeIcon} className={styles.closeicon} alt="close" />
            </button>
            <div className={styles['popupContent']}>
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
