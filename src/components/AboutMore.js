import React from "react";
import "../static/styles/css/AboutMore.css"; // CSS 파일 임포트
import profileLogo from "../static/styles/images/profileLogo.png"; // 이미지를 가져옵니다.
import exFarm from "../static/styles/images/exFarm.png"; // 이미지를 가져옵니다.
import QnA from "./QnA.js";

function AboutMore() {
  return (
    <div className="about-more">
      <div className="tabs">
        <div className="tab active-tab">About More</div>
        <div className="tab">Q&A</div>
      </div>
      <div className="content-box">
        <h1 className="title">About More</h1>
        <div className="user-info">
          <img src={profileLogo} alt="Profile Picture" />
          <div className="user-details">
            <span className="username">제주아빠2</span>
            <span className="location">제주시 애월읍</span>
            <span className="registration-date">
              등록일자: 2024/04/03 19:21:30
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <p className="image-description">
          농사를 시작한 지 얼마 안됐어요. 어렵지만 흙, 씨앗, 물주기, 햇빛을
          조금씩 알아가고 있어요.
        </p>
        <img
          src={exFarm}
          alt="A field of freshly tilled soil with a sunset in the background"
        />
        <QnA />
      </div>
    </div>
  );
}

export default AboutMore;
