import React from "react";
import Slider from "react-slick";
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

  const settings = {
    dots: true, // 슬라이더 하단에 점 표시 여부
    infinite: true, // 무한 슬라이더 여부
    speed: 500, // 슬라이드 속도
    slidesToShow: 4, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 넘어갈 슬라이드 수
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  };

  return (
    <div className={styles.recommend}>
      <h2>추천 상품</h2>
      <Slider {...settings} className={styles.recommend__list}>
        {items.map((item, index) => (
          <RecommendItem
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Recommend;
