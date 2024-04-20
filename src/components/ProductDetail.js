import React, { useState } from "react";
import styles from "../static/styles/css/ProductDetail.module.css";
import carouselControlPrev from "../static/styles/images/carouselControlPrev.png";
import carouselControlNext from "../static/styles/images/carouselControlNext.png";
import PriceList from "../components/PriceList";
import AmountSelection from "../components/AmountSelection";
import heartIcon from "../static/styles/images/heart.png";
import closeIcon from "../static/styles/images/close.png";
import iphone from "../static/styles/images/iphone.png";
import PinkHeart from "../static/styles/images/PinkHeart.png";

function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHeartPink, setIsHeartPink] = useState(false);
  const [priceList, setPriceList] = useState([]); // 가격 목록 상태 추가

  const images = [
    iphone,
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MME73_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861338000",
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MME73_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861336000",
  ];

  const changeImage = (direction) => {
    let imageElement = document.getElementsByClassName(styles.productImg)[0];
    imageElement.style.opacity = 0;

    setTimeout(() => {
      let newIndex = currentImageIndex + direction;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      setCurrentImageIndex(newIndex);

      imageElement.style.opacity = 1;
    }, 300);
  };

  const toggleHeart = () => {
    setIsHeartPink(!isHeartPink);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // 가격 추가 함수
  const addToPriceList = (name, price) => {
    setPriceList([...priceList, { name, price }]); // 새로운 아이템 추가
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.carouselControlPrev}
          onClick={() => changeImage(-1)}
        >
          <img src={carouselControlPrev} alt="Previous" />
        </div>
        <div id={styles.productImage}>
          <img
            className={styles.productImg}
            src={images[currentImageIndex]}
            alt="Product Image"
          />
        </div>
        <div
          className={styles.carouselControlNext}
          onClick={() => changeImage(1)}
        >
          <img src={carouselControlNext} alt="Next" />
        </div>
      </div>

      <div className={styles.productDetails}>
        <h4 className={styles.productTitle}>아이폰 13프로</h4>
        <img
          src={isHeartPink ? PinkHeart : heartIcon}
          className={styles.heart}
          alt="Heart"
          onClick={toggleHeart}
        />
        <p className={styles.category}>전자제품/휴대폰/아이폰</p>
        <p className={styles.timeRemaining}>
          낙찰까지 <span id={styles.bidTime}>13:03:93</span>
        </p>
        <div className={styles.biddingDetails}>
          <p className={styles.startPrice}>시작 금액 500,000</p>
          <p className={styles.currentPrice}>현재 금액 800,000</p>
          <p className={styles.instantPrice}>즉시낙찰 금액 1,000,000</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.bidButton} onClick={togglePopup}>
          입찰하기
        </button>
      </div>

      {isPopupVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <div className={styles.closeButtonContainer}>
              <button onClick={togglePopup}>
                <img src={closeIcon} className={styles.closeicon} alt="close" />
              </button>
            </div>
            <div className={styles.popupContent}>
              {/* PriceList에 priceList 전달 */}
              <PriceList items={priceList} />
              <AmountSelection onBid={addToPriceList} />{" "}
              {/* AmountSelection에 함수 전달 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
