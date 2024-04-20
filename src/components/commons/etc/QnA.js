import React, { useState } from "react";
import styles from "../../../static/styles/css/QnA.module.css";
import writeIcon from "../../../static/styles/images/writhing.png";
import Add from "./Add";

function QnA() {
  const [addComponents, setAddComponents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // 추가중인지 아닌지를 추적하는 상태

  const handleAddClick = () => {
    if (!isAdding) { // 이미 추가중이 아니면 추가 로직 수행
      const newId = Date.now();
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
      setIsAdding(true); // 추가중 상태로 설정
    }
  };

  const handleQuestionSubmit = (questionText, id) => {
    const newQuestion = { id: questions.length, text: questionText, status: "답변 미완료" };
    setQuestions([...questions, newQuestion]);
    handleCancel(id); // 제출 후 추가 컴포넌트 제거
  };

  const handleCancel = (id) => {
    setAddComponents((prevComponents) => prevComponents.filter(component => component.id !== id));
    setIsAdding(false); // 추가중 상태 해제
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
