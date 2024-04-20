import React, { useState } from "react";
// CSS 파일을 모듈로서 import합니다. 스타일 이름이 겹치지 않도록 styles 객체로 불러옵니다.
import styles from "../static/styles/css/QnA.module.css";
import writeIcon from "../static/styles/images/writhing.png"; // 글쓰기 아이콘 이미지를 가져옵니다.
import Add from "./Add"; // Add 컴포넌트를 불러옵니다.

function QnA() {
  const [addComponents, setAddComponents] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleAddClick = () => {
    const newId = Date.now(); // 새로운 ID를 생성
    const newComponent = {
      id: newId,
      component: (
        <Add
          key={newId}
          onSubmit={(text) => handleQuestionSubmit(text, newId)}
          onCancel={() => handleCancel(newId)}
        />
      ),
    };
    setAddComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleQuestionSubmit = (questionText, id) => {
    const newQuestion = { id: questions.length, text: questionText, status: "답변 미완료" };
    setQuestions([...questions, newQuestion]);
    handleCancel(id); // ID를 사용하여 해당 Add 컴포넌트 제거
  };

  const handleCancel = (id) => {
    setAddComponents((prevComponents) => prevComponents.filter(component => component.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Q&A</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.writeButton} onClick={handleAddClick}>
          <img src={writeIcon} alt="글쓰기" className={styles.icon} />
          문의글 작성
        </button>
      </div>
      <div className={styles.divider}></div>

      {/* 질문과 답변 섹션 */}
      <div className={styles.questionSection}>
        <div className={styles.question}>
          <h4 className={styles.questionText}>
            Q. 타이틀 변경은 어떤 절차를 통해서 하나요?
          </h4>
          <div className={styles.status}>답변완료</div>
        </div>
        <p className={styles.date}>답변일 2024/04/03 19:31:30</p>
        <div className={styles.answer}>
          <h4 className={styles.answerText}>
            A. 오후 2시부터, 주말, 공휴일 제외하고 생성합니다.
          </h4>
          <p className={styles.date}>답변일 2024/04/03 19:31:30</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.question}>
          <h4 className={styles.questionText}>
            Q. 타이틀 변경은 어떤 절차를 통해서 하나요?
          </h4>
          <div className={styles.noStatus}>답변 미완료</div>
        </div>
      </div>
      {questions.map(q => (
          <div key={q.id}>

            <div className={styles.divider}></div>
            <div className={styles.question}>
              <h4 className={styles.questionText}>Q. {q.text}</h4>
              <div className={styles.noStatus}>{q.status}</div>
            </div>
          </div>
        ))}
        {addComponents.map(component => component.component)}
    </div>
  );
}

export default QnA;
