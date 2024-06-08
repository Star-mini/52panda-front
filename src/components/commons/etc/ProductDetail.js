import React, { useState, useEffect } from "react";
import styles from "../../../static/styles/css/ProductDetail.module.css";
import carouselControlPrev from "../../../static/styles/images/carouselControlPrev.png";
import carouselControlNext from "../../../static/styles/images/carouselControlNext.png";
import PriceList from "./PriceList";
import AmountSelection from "./AmountSelection";
import heartIcon from "../../../static/styles/images/heart.png";
import closeIcon from "../../../static/styles/images/close.png";
import PinkHeart from "../../../static/styles/images/PinkHeart.png";
import { client } from "../../util/client";

function ProductDetail({ productData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHeartPink, setIsHeartPink] = useState(false);
  const [priceList, setPriceList] = useState([]);
  const [isBidComplete, setIsBidComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리하기 위한 상태 추가

  useEffect(() => {
    // 찜 상태를 확인하는 get 요청 추가
    const checkIfLiked = async () => {
      const url = `${process.env.REACT_APP_API_URL}/v1/auth/mypage/item-like?itemId=${productData.itemId}`;
      try {
        const response = await client.get(url);
        if (response.data.success) {
          setIsHeartPink(response.data.data);
        }
      } catch (error) {
        console.error("찜 상태 확인 실패:", error);
      }
    };

    if (productData) {
      checkIfLiked();
    }
  }, [productData]);

  useEffect(() => {
    if (!productData || !productData.bidFinishTime) return;

    if (productData.auctionComplete) {
      setIsBidComplete(true);
      setLoading(false); // 로딩 상태를 false로 설정
      return;
    }

    setLoading(true); // 계산 시작 전 로딩 상태를 true로 설정
    const calculateTimeRemaining = () => {
      const finishTime = new Date(productData.bidFinishTime).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = finishTime - currentTime;

      if (timeDiff <= 0) {
        setTimeRemaining("00:00:00");
        setLoading(false); // 계산이 끝나면 로딩 상태를 false로 설정
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${days}일 ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
      setLoading(false); // 시간 계산이 끝나면 로딩 상태를 false로 설정
    };

    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer); // 컴포넌트 정리 시 타이머 제거
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
        낙찰까지
        <span style={{ marginLeft: "10px" }} id={styles.bidTime}>
          {timeRemaining}
        </span>
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
    const likeUserId = localStorage.getItem("id");

    if (isHeartPink) {
      client
        .delete(url)
        .then((response) => {
          console.log("찜하기 취소 성공:", response.data);
          setIsHeartPink(false);
        })
        .catch((error) => {
          console.error("찜하기 취소 실패:", error);
        });
    } else {
      const data = {
        likeUserId,
      };

      client
        .post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("찜하기 성공:", response.data);
          setIsHeartPink(true);
        })
        .catch((error) => {
          console.error("찜하기 실패:", error);
        });
    }
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const addToPriceList = (name, price, isBidComplete) => {
    const updatedPriceList = [
      ...priceList,
      { name, price: parseInt(price, 10) },
    ];
    setPriceList(updatedPriceList);
    console.log("Updated PriceList: ", updatedPriceList);
    setIsBidComplete(isBidComplete);
  };

  const handleBidButtonClick = () => {
    const login = localStorage.getItem("login");
    if (!login) {
      alert("로그인후에 입찰하실수있어요.😊");
      return;
    }
    togglePopup();
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
        <div className={styles.categoryHeartContainer}>
          <p className={styles.category}>{productData.categoryName}</p>
          <img
            src={isHeartPink ? PinkHeart : heartIcon}
            className={styles.heart}
            alt="Heart"
            onClick={toggleHeart}
          />
        </div>
        {renderBidInfo()}
        <div className={styles.biddingDetails}>
          <p className={styles.startPrice}>
            시작 금액 {productData.startPrice}원
          </p>
          {isBidComplete ? (
            <p className={styles.currentPrice}>낙찰완료</p>
          ) : (
            <p className={styles.currentPrice}>
              {productData.maxPrice === 0
                ? "현재 가격 -원"
                : `현재 금액 ${productData.maxPrice}원`}
            </p>
          )}
          <p className={styles.instantPrice}>
            즉시낙찰 금액{" "}
            {productData.buyNowPrice !== null
              ? `${productData.buyNowPrice}원`
              : "-"}
          </p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.bidButton}
          onClick={isBidComplete ? undefined : handleBidButtonClick}
          style={isBidComplete ? { backgroundColor: "#CDCDCD" } : {}}
        >
          {isBidComplete ? "낙찰완료" : "입찰하기"}
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
              <PriceList
                items={priceList}
                productData={productData}
                isPopupVisible={isPopupVisible}
              />
              <AmountSelection
                onBid={addToPriceList}
                togglePopup={togglePopup}
                productData={productData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
