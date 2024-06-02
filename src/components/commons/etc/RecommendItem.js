import React from 'react';
import styles from '../../../static/styles/css/RecommendItem.module.css';

// RecommendItem 컴포넌트
const RecommendItem = ({ itemId, imageUrl, title, price }) => {

  const handleClick = (e) => {
    window.location.href = `/detail?itemId=${itemId}`; // 클릭 시 페이지 강제 이동
  };

  return (
    <div className={styles.recommendItem} onClick={handleClick}>
      <img src={imageUrl} alt={title} className={styles.recommendItem__image} />
      <div className={styles.recommendItem__details}>
        <p className={styles.recommendItem__title}>{title}</p>
        <p className={styles.recommendItem__price}>현재가격: {price}원</p>
      </div>
    </div>
  );
};

export default RecommendItem;
