import React, { useState } from 'react';
import styles from '../static/styles/css/Add.module.css'; // CSS 모듈을 임포트합니다.

function Add({ onSubmit, onCancel }) {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCompleteClick = () => {
        onSubmit(input);
        setInput(""); // 입력 필드 초기화
    };

    const handleCancelClick = () => {
        onCancel();
        setInput(""); // 입력 필드 초기화
    };

    return (
      <div className={styles.inputGroup}>
        <h4 className={styles.title}>Q</h4>
        <input type="text" className={styles.input} value={input} onChange={handleInputChange} />
        <div className={styles.buttonsContainer}>
          <button className={styles.completeButton} onClick={handleCompleteClick}>완료</button>
          <button className={styles.cancelButton} onClick={handleCancelClick}>취소</button>
        </div>
      </div>
    );
  }

export default Add;
