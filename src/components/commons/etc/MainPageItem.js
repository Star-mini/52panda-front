import React from "react";
import MainPageItemCard from "../card/MainPageItemCard";
import redcan from "../../../static/styles/images/redcan.png";
import notebook from "../../../static/styles/images/notebook.png";
import ddofoki from "../../../static/styles/images/ddofoki.png";
import samsung from "../../../static/styles/images/samsungflip.png";
import Slider from "react-slick";
import styles from "../../../static/styles/css/mainpageitem.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselControlPrev from "../../../static/styles/images/carouselControlPrev.png";
import carouselControlNext from "../../../static/styles/images/carouselControlNext.png";

const items = [
  { img: notebook, category: "전자기기/노트북", name: "그램", startprice: "5000억", nowprice: "5조" },
  { img: samsung, category: "전자기기/휴대폰", name: "삼성플립2", startprice: "5000억", nowprice: "5조" },
  { img: ddofoki, category: "식료품/밀키트", name: "떡볶이밀키트", startprice: "5000억", nowprice: "5조" },
  { img: redcan, category: "화장품세트/기초세트", name: "화장품세트", startprice: "5000억", nowprice: "5조" },
  { img: notebook, category: "전자기기/노트북", name: "그램", startprice: "5000억", nowprice: "5조" },
  { img: notebook, category: "전자기기/노트북", name: "그램", startprice: "5000억", nowprice: "5조" },
  { img: notebook, category: "전자기기/노트북", name: "그램", startprice: "5000억", nowprice: "5조" },
  { img: notebook, category: "전자기기/노트북", name: "그램", startprice: "5000억", nowprice: "5조" },
];

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
  return (
    <div className={`container ${styles.itemlistmargin} ${styles.carouselContainer}`}>
      <h1>{heading}</h1>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <MainPageItemCard
              img={item.img}
              category={item.category}
              name={item.name}
              startprice={item.startprice}
              nowprice={item.nowprice}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainPageItem;
