import React, { useState } from "react";
import styles from "../static/styles/css/AmountSelection.module.css";

function AmountSelection({ onBid }) {
  const [amount, setAmount] = useState(1500000); // 초기 금액 설정
  const [bidValue, setBidValue] = useState(""); // 입찰가를 입력할 상태

  const handleAddAmount = (addValue) => {
    setAmount((prevAmount) => prevAmount + addValue);
    setBidValue((prevBidValue) => {
      // 기존 bidValue를 숫자로 변환하고, 새로운 addValue를 더한 후 다시 문자열로 변환
      const newBidValue = parseInt(prevBidValue || '0') + addValue;
      return newBidValue.toString();
    });
  };

  const handleBid = () => {
    if (bidValue) { // 입찰가가 입력된 경우
      onBid("사용자", bidValue); // 사용자 이름과 입찰가 전달 (문자열로 유지)
      setBidValue(""); // 입력 필드를 비웁니다.
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.amount}>{amount.toLocaleString()}원</span>
        <button className={styles.withdraw}>즉시 입찰</button>
      </div>
      <div className={styles.question}>
        <input
          type="text"
          className={styles.inputArea}
          placeholder="얼마에 살까요?"
          value={bidValue}
          onChange={(e) => {
            const newValue = e.target.value;
            const filteredValue = newValue.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
            setBidValue(filteredValue);
          }}
        />
        <button className={styles.bidButton} onClick={handleBid}>
          입찰
        </button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.maxAmount}>
        <span>최대 5000만원 가능</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAddAmount(1000)}>
          +1000
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(2000)}>
          +2000
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(1000)}>
          +1000
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(2000)}>
          +2000
        </button>
      </div>
    </div>
  );
}

export default AmountSelection;
