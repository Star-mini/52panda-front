import React from 'react';
import styles from '../../../static/styles/css/RecommendItem.module.css';

// RecommendItem 컴포넌트
const RecommendItem = ({ imageUrl, title, price }) => {
  return (
    <div className={styles.recommendItem}>
      <img src={imageUrl} alt={title} className={styles.recommendItem__image} />
      <div className={styles.recommendItem__details}>
        <p className={styles.recommendItem__title}>{title}</p>
        <p className={styles.recommendItem__price}>현재가격: {price}원</p>
      </div>
    </div>
  );
};

export default RecommendItem;
