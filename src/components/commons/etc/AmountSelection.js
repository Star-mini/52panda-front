import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../static/styles/css/AmountSelection.module.css";
import { client } from "../../util/client";

function AmountSelection({ onBid, togglePopup, productData }) {
  const amount = productData.buyNowPrice; // 즉시 낙찰 금액
  const [bidValue, setBidValue] = useState(""); // 입찰가 상태
  const [lastBidTime, setLastBidTime] = useState(null); // 마지막 입찰 시간 상태
  const startPrice = productData.startPrice; // 시작 입찰 금액
  const currentBidPrice = productData.maxPrice; // 현재 입찰 금액
  const increment = startPrice >= 10000 ? Math.floor(startPrice * 0.01) : 100; // 입찰 올리기 기준 (100-9999원은 100원, 만원 이상은 1%)

  const MAX_INT_VALUE = 2147483647; // int 최대값

  const handleAddAmount = (multiplier) => {
    setBidValue((prevBidValue) => {
      const baseValue = parseInt(prevBidValue || currentBidPrice || startPrice, 10); // 기본값 설정
      const newBidValue = baseValue + (increment * multiplier);
      if (newBidValue > MAX_INT_VALUE) {
        alert(`입찰 금액은 ${MAX_INT_VALUE.toLocaleString()}원을 넘을 수 없습니다.😊`);
        return prevBidValue;
      }
      return newBidValue.toString();
    });
  };

  const handleBid = async () => {
    const now = new Date().getTime();

    if (bidValue) {
      const numericBidValue = parseInt(bidValue, 10);

      if (numericBidValue > MAX_INT_VALUE) {
        alert(`입찰 금액은 ${MAX_INT_VALUE.toLocaleString()}원을 넘을 수 없습니다.😊`);
        return;
      }

      // maxPrice가 0이면 startPrice보다 높아야 입찰 가능
      if (currentBidPrice === 0 && numericBidValue < startPrice) {
        alert("입찰은 시작입찰가보다 높아야 입찰하실 수 있어요😊");
        return;
      }
      if (currentBidPrice !== 0 && numericBidValue <= currentBidPrice) {
        alert("입찰은 현재입찰가보다 높아야 입찰하실 수 있어요😊");
        return;
      }

      if (numericBidValue >= amount && amount !== null) {
        if (window.confirm(`입찰 금액이 ${amount.toLocaleString()}원의 즉시 낙찰 금액 이상입니다. 즉시 낙찰로 진행하시겠어요?😯`)) {
          await sendBidRequest(amount, true);
        }
      } else {
        await sendBidRequest(bidValue, false);
      }
    }
  };

  const handleInstantBid = async () => {
    if (amount !== null) {
      await sendBidRequest(amount, true); // 즉시 입찰은 buyNowPrice로
    } else {
      alert("즉시 낙찰 금액이 설정되지 않았습니다.😊");
    }
  };

  const sendBidRequest = async (price, isImmediate) => {
    const itemId = productData.itemId;
    const userId = localStorage.getItem("id") || 3; // 로컬스토리지에서 가져오거나 기본값 3 사용
    const nickname = localStorage.getItem("username") || "new"; // 로컬스토리지에서 가져오거나 기본값 new 사용
  
    try {
      const response = await client.post(`${process.env.REACT_APP_API_URL}/v1/auth/auction/item/${itemId}/bid`, {
        price: parseInt(price, 10),
        itemId: itemId,
        userId: userId,
        nickname: nickname,
      });

      if (response.data.success) {
        alert(isImmediate ? "즉시 낙찰에 성공했습니다. 축하합니다.😊" : "입찰에 성공했습니다.😊");
        onBid(nickname, price.toString(), isImmediate);
        if (isImmediate) {
          togglePopup(); // 즉시 낙찰 성공 시 팝업 닫기
        }
        const now = new Date().getTime();
        setLastBidTime(now); // 입찰 성공 시 마지막 입찰 시간 업데이트
      } else {
        handleErrorResponse(response.data.error);
      }
    } catch (error) {
      console.error("입찰 요청에 실패했습니다:", error);
      alert("입찰 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleErrorResponse = (error) => {
    switch (error.code) {
      case 40008:
        alert("입력하시는 동안 다른 사람이 더 높게 입찰했어요. 경매 목록을 갱신해야할거같아요.😊");
        break;
      case 40009:
        alert("현재 최고 입찰자와 같은 사용자입니다.😊");
        break;
      case 40011:
        alert("물품 판매자와 같은 사용자입니다.😊");
        break;
      // 다른 오류 코드에 따른 처리 추가
      default:
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.amount}>{amount !== null ? amount.toLocaleString() : '-'}원</span>
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
            if (parseInt(filteredValue, 10) > MAX_INT_VALUE) {
              alert(`입찰 금액은 ${MAX_INT_VALUE.toLocaleString()}원을 넘을 수 없습니다.😊`);
              return;
            }
            setBidValue(filteredValue);
          }}
        />
        <button className={styles.bidButton} onClick={handleBid}>
          입찰
        </button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.maxAmount}>
        <span>{amount !== null ? amount.toLocaleString() : '-'}원까지 가능</span>
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
