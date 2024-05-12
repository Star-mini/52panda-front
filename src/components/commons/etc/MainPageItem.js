import React, { useState, useEffect } from "react";
import MainPageItemCard from "../card/MainPageItemCard";
import Slider from "react-slick";
import styles from "../../../static/styles/css/mainpageitem.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselControlPrev from "../../../static/styles/images/carouselControlPrev.png";
import carouselControlNext from "../../../static/styles/images/carouselControlNext.png";

const settings = {
  dots: true,
  infinite: true,
  speed: 700, // 슬라이드 전환 속도
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: false,
  autoplaySpeed: 4000, // 자동 전환 속도
  cssEase: 'ease-in-out', // 부드러운 전환 효과를 위한 속도 곡선 설정
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 500, // 가로 길이가 500px 이하일 때
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={carouselControlNext}
      alt="Next"
      onClick={onClick}
      className={`${className} ${styles.carouselControl}`}
      style={{ ...style, display: "block" }}
    />
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={carouselControlPrev}
      alt="Previous"
      onClick={onClick}
      className={`${className} ${styles.carouselControl}`}
      style={{ ...style, display: "block" }}
    />
  );
}

function MainPageItem({ heading }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url =
      heading === "New Item"
        ? "http://localhost:8081/api/v1/no-auth/new-item"
        : "http://localhost:8081/api/v1/no-auth/hot-item";
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setItems(data.data.hotItemListDtos.filter(item => item !== null)); // null 값 필터링
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [heading]);

  return (
    <div className={`container ${styles.itemlistmargin} ${styles.carouselContainer}`}>
      <h1>{heading}</h1>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <MainPageItemCard
              img={item.thumbnail}
              category={item.category}
              name={item.itemTitle}
              startprice={item.startPrice}
              nowprice={item.buyNowPrice}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainPageItem;
