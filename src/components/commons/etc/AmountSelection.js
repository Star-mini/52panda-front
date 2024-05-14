import React, { useState } from "react";
import styles from "../../../static/styles/css/AmountSelection.module.css";

function AmountSelection({ onBid, togglePopup, productData }) {
  const amount = productData.buyNowPrice; // 즉시 낙찰 금액
  const [bidValue, setBidValue] = useState(""); // 입찰가 상태
  const startPrice = productData.startPrice; // 시작 입찰 금액
  const increment = startPrice >= 10000 ? startPrice * 0.01 : 100; // 입찰 올리기 기준 (100-9999원은 100원, 만원 이상은 1%)

  const handleAddAmount = (multiplier) => {
    setBidValue((prevBidValue) => {
      const newBidValue = parseInt(prevBidValue || "0") + (increment * multiplier);
      return newBidValue.toString();
    });
  };

  const handleBid = () => {
    if (bidValue) {
      const numericBidValue = parseInt(bidValue, 10);
      if (numericBidValue >= amount) {
        if (window.confirm(`입찰 금액이 ${amount.toLocaleString()}원의 즉시 낙찰 금액 이상입니다. 즉시 낙찰로 진행하시겠어요?😯`)) {
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
        <span>{amount.toLocaleString()}원까지 가능</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAddAmount(1)}>
          +{increment.toLocaleString()}
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(5)}>
          +{(increment * 5).toLocaleString()}
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(10)}>
          +{(increment * 10).toLocaleString()}
        </button>
        <button className={styles.button} onClick={() => handleAddAmount(20)}>
          +{(increment * 20).toLocaleString()}
        </button>
      </div>
    </div>
  );
}

export default AmountSelection;
