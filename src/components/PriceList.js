import React from 'react';
import styles from '../static/styles/css/PriceList.module.css'; // CSS 모듈 임포트

function PriceList() {
  const items = [
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' },
    { name: '상민', price: '8,000' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.currentPriceTitle}>현재가격</span>
        <span className={styles.currentPrice}>8000</span>
      </div>
      <div className={styles.itemList}>
        {items.map((item, index) => (
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
