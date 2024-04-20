import React, { useEffect, useState } from 'react';
import styles from '../static/styles/css/PriceList.module.css';

function PriceList({ items }) {
  const [sortedItems, setSortedItems] = useState([]); // 정렬된 목록 상태

  useEffect(() => {
    // 내림차순으로 정렬
    const sorted = [...items].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''), 10);
      const priceB = parseInt(b.price.replace(/,/g, ''), 10);
      return priceB - priceA; // 내림차순 정렬
    });

    setSortedItems(sorted); // 정렬된 목록 상태 설정
  }, [items]); // items가 변경될 때마다 정렬

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.currentPriceTitle}>현재 가격</span>
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
