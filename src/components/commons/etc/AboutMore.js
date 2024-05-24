import React, { useRef } from "react";
import styles from "../../../static/styles/css/AboutMore.module.css";
import profileLogo from "../../../static/styles/images/profileLogo.png";
import QnA from "./QnA.js";

function AboutMore({ productData }) {
  // QnA 컴포넌트에 접근하기 위한 ref를 생성합니다.
  const qnaRef = useRef(null);

  // Q&A 탭을 클릭하면 실행될 함수입니다.
  const scrollToQnA = () => {
    qnaRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // 한글인지 영어인지 감지하고 특정 문자를 '*'로 바꾸는 함수
  const maskUsername = (username) => {
    if (!username) return "Loading...";

    const isKorean = /[가-힣]/.test(username[0]);
    if (isKorean) {
      return username.length > 1 ? username[0] + '*' + username.slice(2) : username;
    } else {
      return '*' + username.slice(1);
    }
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
            <span className={styles.username}>{maskUsername(productData?.userNickname)}</span>
            <span className={styles.registrationDate}>
              등록일자: {productData ? new Date(productData.itemCreateTime).toLocaleString() : "Loading..."}
            </span>
          </div>
        </div>
        <div className={styles.divider}></div>
        <p className={styles.imageDescription}>
          {productData?.itemDetailContent || "Loading..."}
        </p>

        {/* 여기에 ref를 추가합니다. */}
        <div ref={qnaRef}>
          {/* QnA 컴포넌트 삽입 */}
          <QnA productData={productData} />
        </div>
      </div>
    </div>
  );
}

export default AboutMore;
