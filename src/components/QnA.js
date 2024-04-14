import React from 'react';
import '../static/styles/css/QnA.css'; // CSS 파일 임포트
import writeIcon from '../static/styles/images/writhing.png' // 글쓰기 아이콘 이미지

function QnA() {
  return (
      <div className="container">
          <h1 className="title">Q&A</h1>
          <div className="button-container">
            <button className="write-button">
              <img src={writeIcon} alt="글쓰기" className="icon" />
              문의글 작성
            </button>
          </div>
          <div className="divider"></div>

          {/* 질문과 답변 섹션 */}
          <div className="question-section">
            <div className="question">
              <h9>Q. 타이틀 변경은 어떤 절차를 통해서 하나요?</h9>
              <div className="status">답변완료</div>
            </div>
            <p className="date">답변일 2024/04/03 19:31:30</p>
            <div className="answer">
              <h9>A. 오후 2시부터, 주말, 공휴일 제외하고 생성합니다.</h9>
              <p className="date">답변일 2024/04/03 19:31:30</p>
            </div>
            <div className="divider"></div>
          </div>
        </div>
  );
}

export default QnA;
