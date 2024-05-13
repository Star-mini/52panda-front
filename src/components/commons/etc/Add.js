import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../../static/styles/css/Add.module.css';

function Add({ onSubmit, onCancel, isAnswering, questionId }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCompleteClick = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/v1/auth/auction/3/qna/`;

    const data = isAnswering
      ? { answerContents: input, questionId: questionId } // questionId를 포함하여 답변 데이터 전송
      : { questionContents: input, questionUserId: 1 }; // 질문 데이터

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("데이터 전송 성공:", response.data);
        onSubmit(input);
        setInput("");
      })
      .catch((error) => {
        console.error("데이터 전송 실패:", error);
      });
  };

  const handleCancelClick = () => {
    onCancel();
    setInput("");
  };

  return (
    <div className={styles.inputGroup}>
      <h4 className={styles.title}>{isAnswering ? "A" : "Q"}</h4>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={handleInputChange}
      />
      <div className={styles.buttonsContainer}>
        <button className={styles.completeButton} onClick={handleCompleteClick}>
          완료
        </button>
        <button className={styles.cancelButton} onClick={handleCancelClick}>
          취소
        </button>
      </div>
    </div>
  );
}

export default Add;