import React, { useState, useEffect } from "react";
import styles from "../../../static/styles/css/ProductDetail.module.css";
import carouselControlPrev from "../../../static/styles/images/carouselControlPrev.png";
import carouselControlNext from "../../../static/styles/images/carouselControlNext.png";
import PriceList from "./PriceList";
import AmountSelection from "./AmountSelection";
import heartIcon from "../../../static/styles/images/heart.png";
import closeIcon from "../../../static/styles/images/close.png";
import PinkHeart from "../../../static/styles/images/PinkHeart.png";
import axios from 'axios';

function ProductDetail({ productData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHeartPink, setIsHeartPink] = useState(false);
  const [priceList, setPriceList] = useState([]);
  const [isBidComplete, setIsBidComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [loading, setLoading] = useState(true);  // 로딩 상태를 관리하기 위한 상태 추가

  useEffect(() => {
    if (!productData || !productData.bidFinishTime) return;

    setLoading(true);  // 계산 시작 전 로딩 상태를 true로 설정
    const calculateTimeRemaining = () => {
      const finishTime = new Date(productData.bidFinishTime).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = finishTime - currentTime;

      if (timeDiff <= 0) {
        setTimeRemaining("00:00:00");
        setLoading(false);  // 계산이 끝나면 로딩 상태를 false로 설정
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      setLoading(false);  // 시간 계산이 끝나면 로딩 상태를 false로 설정
    };

    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);  // 컴포넌트 정리 시 타이머 제거
  }, [productData]);

// 낙찰 정보를 렌더링하는 함수
const renderBidInfo = () => {
  if (isBidComplete) {
    // 낙찰 완료된 상태
    return <p className={styles.timeRemaining}>낙찰완료</p>;
  }

  if (loading) {
    // 로딩 중 상태
    return <p className={styles.timeRemaining}>낙찰까지 Loading...</p>;
  }

  // 일반적인 남은 시간 표시
  return (
    <p className={styles.timeRemaining}>
      낙찰까지<span style={{ marginLeft: '10px' }} id={styles.bidTime}>{timeRemaining}</span>
    </p>
  );
};

  const changeImage = (direction) => {
    if (!productData || !productData.images) return;

    let imageElement = document.getElementsByClassName(styles.productImg)[0];
    imageElement.style.opacity = 0;

    setTimeout(() => {
      let newIndex = currentImageIndex + direction;
      if (newIndex < 0) newIndex = productData.images.length - 1;
      if (newIndex >= productData.images.length) newIndex = 0;
      setCurrentImageIndex(newIndex);

      imageElement.style.opacity = 1;
    }, 300);
  };

  const toggleHeart = () => {
    const url = `${process.env.REACT_APP_API_URL}/v1/auth/auction/${productData.itemId}/like/`;

    if (isHeartPink) {
      axios.delete(url)
        .then(response => {
          console.log('찜하기 취소 성공:', response.data);
          setIsHeartPink(false);
        })
        .catch(error => {
          console.error('찜하기 취소 실패:', error);
        });
    } else {
      const data = {
        likeUserId: 1
      };

      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('찜하기 성공:', response.data);
          setIsHeartPink(true);
        })
        .catch(error => {
          console.error('찜하기 실패:', error);
        });
    }
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const addToPriceList = (name, price, isBidComplete) => {
    setPriceList([...priceList, { name, price }]);
    setIsBidComplete(isBidComplete);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

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
            src={productData.images[currentImageIndex].imageURL}
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
        <h4 className={styles.productTitle}>{productData.title}</h4>
        <img
          src={isHeartPink ? PinkHeart : heartIcon}
          className={styles.heart}
          alt="Heart"
          onClick={toggleHeart}
        />
        <p className={styles.category}>{productData.categoryName}</p>
        {renderBidInfo()}
        <div className={styles.biddingDetails}>
          <p className={styles.startPrice}>시작 금액 {productData.startPrice}원</p>
          <p className={styles.currentPrice}>현재 금액 {productData.maxPrice}원</p>
          <p className={styles.instantPrice}>즉시낙찰 금액 {productData.buyNowPrice}원</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.bidButton}
          onClick={isBidComplete ? undefined : togglePopup}
          style={isBidComplete ? { backgroundColor: '#CDCDCD' } : {}}
        >
          {isBidComplete ? '낙찰완료' : '입찰하기'}
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
              <PriceList items={priceList} />
              <AmountSelection onBid={addToPriceList} togglePopup={togglePopup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
