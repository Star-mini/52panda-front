import React from "react";
import styles from "../../../static/styles/css/maincard.module.css";
function MainPageItemCard(props) {
  const imageContainer = {
    margin: "0 auto", // 이미지를 수평으로 가운데 정렬합니다.
    textAlign: "center", // 이미지를 수직으로 가운데 정렬합니다.
  };

  return (
    <div className={`${styles.mycard} card ms-2 me-2`}>
      <a href="">
        <div style={imageContainer}>
          <img
            src={props.img}
            className={`card-img-top ${styles.img}`}
            alt="..."
          />
        </div>
      </a>

      <div className="card-body">
        <h5 className="card-title">{props.category}</h5>
        <p className="card-text">{props.name}</p>
      </div>
    </div>
  );
}

export default MainPageItemCard;
