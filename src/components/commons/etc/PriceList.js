import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../static/styles/css/PriceList.module.css';
import rotate from '../../../static/styles/images/rotate.png';

function PriceList({ items, productData, isPopupVisible }) {
  const [bids, setBids] = useState(items); // 서버에서 받은 입찰 정보를 저장할 상태
  const [currentPrice, setCurrentPrice] = useState('0원'); // 최고 가격 상태

  // fetchBids 함수 정의
  const fetchBids = async () => {
    console.log("API 요청 시작: 입찰 정보 불러오기"); // 로그 출력
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/auth/auction/item/${productData.itemId}/bid`);
      console.log("API 응답:", response); // API 응답 로그 출력
      if (response.data.success) {
        const sortedItems = response.data.data.info.sort((a, b) => {
          // 가격을 내림차순으로 정렬하고, 같은 가격일 경우 이름을 사전 순으로 정렬
          if (b.price - a.price !== 0) {
            return b.price - a.price;
          } else {
            return a.name.localeCompare(b.name);
          }
        });
        setBids(sortedItems); // 정렬된 입찰 정보를 상태에 저장
        if (sortedItems.length > 0) {
          setCurrentPrice(sortedItems[0].price.toLocaleString() + '원'); // 배열의 첫 번째 요소 가격을 최고 가격으로 설정
        }
      }
    } catch (error) {
      console.error('입찰 정보 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (isPopupVisible && productData && productData.itemId) {
      fetchBids(); // 모달이 보일 때 데이터 불러오기
    }
  }, [isPopupVisible, productData]); // isPopupVisible 또는 productData가 변경될 때마다 다시 불러오기

  useEffect(() => {
    // 전달된 items를 bids 상태에 업데이트
    if (items.length > 0) {
      const updatedBids = [items[0], ...bids];
      setBids(updatedBids);
      setCurrentPrice(updatedBids[0].price.toLocaleString() + '원');
    }
    console.log("Updated bids in PriceList: ", items);
  }, [items]);

  return (
    <div className={styles.container}>
      <img 
        src={rotate} 
        alt="rotate" 
        className={styles.rotate} 
        onClick={fetchBids} // 클릭 이벤트 핸들러 추가
      /> {/* 회전 이미지 추가 */}
      <div className={styles.header}>
        <span className={styles.currentPriceTitle}>현재 가격</span>
        <span className={styles.currentPrice}>{currentPrice}</span>
      </div>
      <div className={styles.itemList}>
        {bids.slice(0, 4).map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>{item.price.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceList;
