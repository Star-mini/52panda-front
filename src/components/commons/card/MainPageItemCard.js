import React, { useState } from "react";
import styles from "../../../static/styles/css/maincard.module.css";
import black from "../../../static/styles/images/black.png";

function MainPageItemCard(props) {
  const [priceVisible, setPriceVisible] = useState(false);

  const togglePriceVisibility = (visible) => {
    setPriceVisible(visible);
  };

  const imageContainer1 = {
    margin: "0 auto",
    textAlign: "center",
    borderRadius: "20px 20px 0 0", // 위쪽 두 개의 꼭짓점만 굴곡 추가
    transition: "opacity 0.1s ease", // 트랜지션 추가
    width: "100%", // imageContainer2와 동일한 너비
    height: "100%", // imageContainer2와 동일한 높이
    position: "relative", // 상대 위치 지정
    zIndex: 1, // 낮은 z-index 설정
  };

  const imageContainer2 = {
    margin: "0 auto",
    textAlign: "center",
    position: "absolute", // imageContainer1 위에 위치
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    opacity: priceVisible ? 0.3 : 0, // 가시성에 따라 opacity 변경
    display: "block",
    borderRadius: "20px 20px 0 0", // 위쪽 두 개의 꼭짓점만 굴곡 추가
    transition: "opacity 0.1s ease", // 여기에 transition 속성 추가
    zIndex: 2, // 높은 z-index 설정
  };

  const priceContainer1 = {
    opacity: priceVisible ? 1 : 0, // 서서히 나타나는 효과를 위해 opacity 추가
    transition: "opacity 1s ease", // opacity 변경에 대한 트랜지션 추가
    display: "block",
    zIndex: 3, // 높은 z-index 설정
  };

  const priceContainer2 = {
    opacity: priceVisible ? 1 : 0, // 서서히 나타나는 효과를 위해 opacity 추가
    transition: "opacity 1s ease", // opacity 변경에 대한 트랜지션 추가
    display: "block",
    zIndex: 3, // 높은 z-index 설정
  };

  return (
    <div
      className={`${styles.mycard} card ms-2 me-2 ${styles.cardMarginTop}`}
      onMouseLeave={() => togglePriceVisibility(false)}
      onMouseOver={() => togglePriceVisibility(true)} // 이벤트를 div 전체에 적용하여 자연스러운 동작을 보장
    >
      <a href="">
        <div style={{ position: "relative" }}>
          <img
            style={imageContainer1}
            src={props.img}
            className={`card-img-top ${styles.img}`}
            alt="..."
          />
          <img
            style={imageContainer2}
            src={black}
            className={`card-img-top ${styles.blackimg}`}
            alt="..."
          />

          <div className={styles.priceCSS1} style={priceContainer1}>
            시작금액
            <br />
            {props.startprice}~
          </div>
          <div className={styles.priceCSS2} style={priceContainer2}>
            즉시입찰금액
            <br />
            {props.nowprice !== null ? props.nowprice : "-"}
          </div>
        </div>
      </a>

      <div className="card-body">
        <h5 className={`card-title ${styles.fontSize}`}>
          {props.category}
        </h5>
        <p className={`card-text ${styles.fontSize}`}>{props.name}</p>
      </div>
    </div>
  );
}

export default MainPageItemCard;
