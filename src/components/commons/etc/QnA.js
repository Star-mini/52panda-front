import React, { useState, useEffect } from "react";
import styles from "../../../static/styles/css/QnA.module.css";
import writeIcon from "../../../static/styles/images/writhing.png";
import Add from "./Add";

function QnA({ productData }) {
  const [addComponents, setAddComponents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (productData && productData.questions) {
      setQuestions(productData.questions);
    }
  }, [productData]);

  const handleAddClick = () => {
    if (!isAdding) {
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
      setIsAdding(true);
    }
  };

  const handleQuestionSubmit = (questionText, id) => {
    const newQuestion = {
      questionId: questions.length + 1,
      questionContents: questionText,
      questionTime: new Date().toISOString(),
      comments: [],
    };
    setQuestions([...questions, newQuestion]);
    handleCancel(id);
  };

  const handleCancel = (id) => {
    setAddComponents((prevComponents) => prevComponents.filter(component => component.id !== id));
    setIsAdding(false);
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
      {questions.map(q => (
        <div key={q.questionId}>
          <div className={styles.question}>
            <h4 className={styles.questionText}>Q. {q.questionContents}</h4>
            <div className={q.comments.length > 0 ? styles.status : styles.noStatus}>
              {q.comments.length > 0 ? "답변완료" : "답변 미완료"}
            </div>
          </div>
          <p className={styles.date}>
            문의일: {new Date(q.questionTime).toLocaleString()}
          </p>
          {q.comments.map(comment => (
            <div key={comment.commentId} className={styles.answer}>
              <h4 className={styles.answerText}>A. {comment.comment}</h4>
              <p className={styles.date}>
                답변일: {new Date(comment.commentTime).toLocaleString()}
              </p>
            </div>
          ))}
          <div className={styles.divider}></div>
        </div>
      ))}
      {addComponents.map(component => component.component)}
    </div>
  );
}

export default QnA;
