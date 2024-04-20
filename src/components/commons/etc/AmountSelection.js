import React, { useState } from "react";
import styles from "../../../static/styles/css/AmountSelection.module.css";

function AmountSelection({ onBid, togglePopup }) {
  const [amount, setAmount] = useState(100000); // 초기 금액 설정
  const [bidValue, setBidValue] = useState(""); // 입찰가를 입력할 상태

  const handleAddAmount = (addValue) => {
    setBidValue((prevBidValue) => {
      // 기존 bidValue를 숫자로 변환하고, 새로운 addValue를 더한 후 다시 문자열로 변환
      const newBidValue = parseInt(prevBidValue || '0') + addValue;
      return newBidValue.toString();
    });
  };

  const handleBid = () => {
    if (bidValue) {
      const numericBidValue = parseInt(bidValue, 10);
      if (numericBidValue > amount) {
        // 사용자에게 입찰 금액이 즉시 입찰 금액보다 높음을 알리고 확인 요청
        if (window.confirm(`입찰 금액이 ${amount.toLocaleString()}원의 즉시 입찰 금액보다 높습니다. 즉시 입찰가로 입찰하시겠어요?🤔`)) {
          onBid("사용자", amount.toString()); // 사용자가 확인한 경우, 즉시 입찰 금액으로 입찰
          alert("즉시 입찰에 성공했습니다. 축하합니다.😊");
          togglePopup(); // 팝업 닫기
        }
      } else {
        onBid("사용자", bidValue); // 정상적인 입찰 처리
        setBidValue(""); // 입력 필드 초기화
      }
    }
  };

  const handleInstantBid = () => {
    onBid("사용자", amount.toString()); // 현재 금액을 입찰
    alert("축하합니다. 낙찰하셨습니다.😊"); // 축하 메시지 표시
    togglePopup(); // 팝업 닫기
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.amount}>{amount.toLocaleString()}원</span>
        <button className={styles.withdraw} onClick={handleInstantBid}>즉시 입찰</button>
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
