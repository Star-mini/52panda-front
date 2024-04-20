import React, { useEffect, useState } from 'react';
import styles from '../static/styles/css/PriceList.module.css';

function PriceList({ items }) {
  const [sortedItems, setSortedItems] = useState([]); // 정렬된 목록 상태
  const [currentPrice, setCurrentPrice] = useState('0원'); // 최고 가격 상태

  useEffect(() => {
    // 내림차순으로 정렬
    const sorted = [...items].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''), 10);
      const priceB = parseInt(b.price.replace(/,/g, ''), 10);
      return priceB - priceA; // 내림차순 정렬
    });

    setSortedItems(sorted); // 정렬된 목록 상태 설정

    // 최고 가격을 설정합니다. 정렬된 배열의 첫 번째 요소를 사용합니다.
    if (sorted.length > 0) {
      setCurrentPrice(sorted[0].price);
    }
  }, [items]); // items가 변경될 때마다 정렬 및 최고 가격 업데이트

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.currentPriceTitle}>현재 가격</span>
        <span className={styles.currentPrice}>{currentPrice}</span>
      </div>
      {/* 6개까지 표시하고, 그 이상은 스크롤 */}
      <div className={styles.itemList}>
        {sortedItems.slice(0, 6).map((item, index) => ( // 최대 6개만 표시
          <div key={index} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceList;
