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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/no-auth/auction/Recommendation`, {
          id: itemId
        });

        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        if (response.data && response.data.status === 'success' && response.data.data) {
          const parsedData = JSON.parse(response.data.data);
          if (parsedData.data && parsedData.data.data) {
            setItems(parsedData.data.data);
            console.log('Items after set:', parsedData.data.data);
          } else {
            throw new Error('No items available');
          }
        } else {
          throw new Error('Failed to fetch recommendations');
        }
      } catch (error) {
        setError(error.message);
        setItems([]);
        console.error('Error fetching recommendations:', error);
      }
    };

    if (itemId) {
      fetchRecommendations();
    }
  }, [itemId]);

  if (error) {
    return null;
  }

  if (!items.length) {
    return <div>Loading recommendations...</div>;
  }

  const slidesToShow = Math.min(items.length, 4);
  const slidesToScroll = Math.min(items.length, 4);

  const settings = {
    dots: true,
    infinite: items.length > 1,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    prevArrow: <img src={prev} className={styles.aprevArrow} alt="Previous" />,
    nextArrow: <img src={next} className={styles.anextArrow} alt="Next" />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: Math.min(items.length, 3),
          slidesToScroll: Math.min(items.length, 3),
          infinite: items.length > 1,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: Math.min(items.length, 2),
          slidesToScroll: Math.min(items.length, 2),
          infinite: items.length > 1,
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
            itemId={item.itemId} // itemId 전달
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
