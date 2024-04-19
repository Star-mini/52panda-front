import React, { useState } from "react";
import styles from "../../../static/styles/css/maincard.module.css";
import black from "../../../static/styles/images/black.png";
function MainPageItemCard(props) {
  const [priceVisible, setPriceVisible] = useState(false);

  const showPrice = () => {
    setPriceVisible(true);
  };

  const hidePrice = () => {
    setPriceVisible(false);
  };

  const imageContainer1 = {
    margin: "0 auto",
    textAlign: "center",
    // position: "absolute",
  };

  const imageContainer2 = {
    margin: "0 auto",
    textAlign: "center",
    position: "absolute",
    top: "0%",
    opacity: 0.5,
    display: priceVisible ? "block" : "none",
  };
  const priceContainer1 = {
    display: priceVisible ? "block" : "none",
  };
  const priceContainer2 = {
    display: priceVisible ? "block" : "none",
  };

  return (
    <div className={`${styles.mycard} card ms-2 me-2`}>
      <a href="">
        <div>
          <img
            style={imageContainer1}
            onMouseOver={showPrice}
            src={props.img}
            className={`card-img-top ${styles.img}`}
            alt="..."
          />
          <img
            style={imageContainer2}
            src={black}
            onMouseOut={hidePrice}
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
            {props.nowprice}
          </div>
        </div>
      </a>

      <div className="card-body" onMouseOver={hidePrice}>
        <h5 className="card-title">{props.category}</h5>
        <p className="card-text">{props.name}</p>
      </div>
    </div>
  );
}

export default MainPageItemCard;
