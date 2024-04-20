import React, { useRef } from "react";
import styles from "../static/styles/css/AboutMore.module.css";
import profileLogo from "../static/styles/images/profileLogo.png";
import exFarm from "../static/styles/images/exFarm.png";
import QnA from "./QnA.js";

function AboutMore() {
  // QnA 컴포넌트에 접근하기 위한 ref를 생성합니다.
  const qnaRef = useRef(null);

  // Q&A 탭을 클릭하면 실행될 함수입니다.
  const scrollToQnA = () => {
    qnaRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.aboutMore}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.activeTab}`}>About More</div>
        <div className={styles.tab} onClick={scrollToQnA}>Q&A</div>
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
          className={`${styles.exFarm} img-fluid`}
        />
        {/* 여기에 ref를 추가합니다. */}
        <div ref={qnaRef}>
          <QnA />
        </div>
      </div>
    </div>
  );
}

export default AboutMore;
