import React from "react";
import styles from "../../../static/styles/css/maincard.module.css";
function MainCardPart(props) {
  return (
    <div class={`card ${styles.my_border}`}>
      <a href="" className={styles.decokill}>
        <img
          width="20px"
          src={props.img}
          className={`card-img-top ${styles.img}`}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
        </div>
      </a>
    </div>
  );
}

export default MainCardPart;
