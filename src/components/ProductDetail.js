import React, { useState } from 'react';
import styles from '../static/styles/css/ProductDetail.module.css';
import placeholder from '../static/styles/images/placeholder.png';
import PriceList from '../components/PriceList'; 
import AmountSelection from '../components/AmountSelection';
import heartIcon from '../static/styles/images/heart.png';
import closeIcon from '../static/styles/images/close.png';
import iphone from '../static/styles/images/iphone.png';
import PinkHeart from '../static/styles/images/PinkHeart.png';

function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHeartPink, setIsHeartPink] = useState(false);

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

  const toggleHeart = () => {
    setIsHeartPink(!isHeartPink); // 하트 이미지 상태를 반전시킵니다.
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
        <img src={isHeartPink ? PinkHeart : heartIcon} className={styles.heart} alt="Heart" onClick={toggleHeart} /> {/* 하트 이미지 클릭 이벤트 추가 */}
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
      <div className={styles.closeButtonContainer}> 
        <button onClick={togglePopup}>
          <img src={closeIcon} className={styles.closeicon} alt="close" />
        </button>
      </div>
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
