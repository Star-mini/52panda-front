import React, { useState } from "react";
import styles from "../../../static/styles/css/AmountSelection.module.css";

function AmountSelection({ onBid, togglePopup, productData }) {
  const amount = productData.buyNowPrice; // 즉시 낙찰 금액을 productData에서 가져옴
  const [bidValue, setBidValue] = useState(""); // 입찰가를 입력할 상태

  const handleAddAmount = (addValue) => {
    setBidValue((prevBidValue) => {
      const newBidValue = parseInt(prevBidValue || "0") + addValue;
      return newBidValue.toString();
    });
  };

  const handleBid = () => {
    if (bidValue) {
      const numericBidValue = parseInt(bidValue, 10);
      if (numericBidValue >= amount) {
        if (
          window.confirm(
            `입찰 금액이 ${amount.toLocaleString()}원의 즉시 낙찰 금액과 같습니다. 즉시 낙찰로 진행하시겠어요?`
          )
        ) {
          onBid("사용자", amount.toString(), true);
          alert("즉시 낙찰에 성공했습니다. 축하합니다.😊");
          togglePopup();
        }
      } else {
        onBid("사용자", bidValue, false);
        setBidValue("");
      }
    }
  };

  const handleInstantBid = () => {
    onBid("사용자", amount.toString(), true);
    alert("축하합니다. 낙찰하셨습니다.😊");
    togglePopup();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.amount}>{amount.toLocaleString()}원</span>
        <button className={styles.withdraw} onClick={handleInstantBid}>
          즉시 입찰
        </button>
      </div>
      <div className={styles.question}>
        <input
          type="text"
          className={styles.inputArea}
          placeholder="얼마에 살까요?"
          value={bidValue}
          onChange={(e) => {
            const newValue = e.target.value;
            const filteredValue = newValue.replace(/[^0-9]/g, "");
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
