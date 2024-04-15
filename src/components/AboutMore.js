import React from "react";
// CSS 파일을 모듈로서 import 합니다. styles라는 객체로 스타일을 불러옵니다.
import styles from "../static/styles/css/AboutMore.module.css";
import profileLogo from "../static/styles/images/profileLogo.png";
import exFarm from "../static/styles/images/exFarm.png";
import QnA from "./QnA.js";

function AboutMore() {
  return (
    <div className={styles.aboutMore}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.activeTab}`}>About More</div>
        <div className={styles.tab}>Q&A</div>
      </div>
      <div className={styles.contentBox}>
        <h1 className={styles.title}>About More</h1>
        <div className={styles.userInfo}>
          <img
            src={profileLogo}
            alt="Profile Picture"
            className={styles.profileLogo}
          />
          <div className={styles.userDetails}>
            <span className={styles.username}>제주아빠2</span>
            <span className={styles.location}>제주시 애월읍</span>
            <span className={styles.registrationDate}>
              등록일자: 2024/04/03 19:21:30
            </span>
          </div>
        </div>
        <div className={styles.divider}></div>
        <p className={styles.imageDescription}>
          농사를 시작한 지 얼마 안됐어요. 어렵지만 흙, 씨앗, 물주기, 햇빛을
          조금씩 알아가고 있어요.
        </p>
        <img
          src={exFarm}
          alt="A field of freshly tilled soil with a sunset in the background"
          className={styles.exFarm}
        />
        <QnA />
      </div>
    </div>
  );
}

export default AboutMore;
