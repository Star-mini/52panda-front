import React, { useState } from 'react';
import styles from '../static/styles/css/AmountSelection.module.css'; // 모듈 CSS 임포트

function AmountSelection() {
  const [amount, setAmount] = useState(1500000); // 초기 금액 설정

  const handleAddAmount = (addValue) => {
    setAmount(prevAmount => prevAmount + addValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.amount}>{amount.toLocaleString()}원</span>
        <button className={styles.withdraw}>출금 인출</button>
      </div>
      <div className={styles.question}>
        <span>얼마에 출금요?</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAddAmount(1000)}>+1000</button>
        <button className={styles.button} onClick={() => handleAddAmount(2000)}>+2000</button>
        <button className={styles.button} onClick={() => handleAddAmount(1000)}>+1000</button>
        <button className={styles.button} onClick={() => handleAddAmount(2000)}>+2000</button>
      </div>
    </div>
  );
}

export default AmountSelection;
