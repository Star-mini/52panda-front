import React from "react";
import styles from "../../../static/styles/css/Recommend.module.css";
import RecommendItem from "./RecommendItem";
import mac from '../../../static/styles/images/mac.png';

const Recommend = () => {
  const items = [
    {
      imageUrl: mac,
      title: "13년쓴 맥북팔아요.",
      price: "79900",
    },
    {
      imageUrl: mac,
      title: "13년쓴 맥북팔아요.",
      price: "79900",
    },
    {
      imageUrl: mac,
      title: "13년쓴 맥북팔아요.",
      price: "79900",
    },
    {
      imageUrl: mac,
      title: "13년쓴 맥북팔아요.",
      price: "79900",
    },
  ];

  return (
    <div className={styles.recommend}>
      <h2>추천 상품</h2>
      <div className={styles.recommend__list}>
        {items.map((item, index) => (
          <RecommendItem
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
