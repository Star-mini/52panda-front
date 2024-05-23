import React, { useState, useEffect } from "react";
import axios from 'axios';
import Slider from "react-slick";
import styles from "../../../static/styles/css/Recommend.module.css";
import RecommendItem from "./RecommendItem";
import prev from '../../../static/styles/images/carouselControlPrev.png';
import next from '../../../static/styles/images/carouselControlNext.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommend = ({ itemId }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/no-auth/auction/Recommendation/Embedding`, {
          id: itemId
        });
  
        if (response.data && response.data.status === 'success' && response.data.data) {
          const parsedData = JSON.parse(response.data.data);  // 문자열 JSON을 객체로 파싱
          if (parsedData.data && parsedData.data.data) {
            setItems(parsedData.data.data);  // 올바른 데이터 경로로 상태 업데이트
          } else {
            throw new Error('No items available');
          }
        } else {
          throw new Error('Failed to fetch recommendations');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching recommendations:', error);
      }
    };
  
    if (itemId) {
      fetchRecommendations();
    }
  }, [itemId]);

  if (!items.length && !error) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            imageUrl={item.thumbnail}
            title={item.itemTitle}
            price={item.maxPrice}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Recommend;
