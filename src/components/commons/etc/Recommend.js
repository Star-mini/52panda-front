import React from "react";
import Slider from "react-slick";
import styles from "../../../static/styles/css/Recommend.module.css";
import RecommendItem from "./RecommendItem";
import mac from '../../../static/styles/images/mac.png';
import prev from '../../../static/styles/images/carouselControlPrev.png';
import next from '../../../static/styles/images/carouselControlNext.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <img src={prev} className={styles.aprevArrow} alt="Previous" />,
    nextArrow: <img src={next} className={styles.anextArrow} alt="Next" />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
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
