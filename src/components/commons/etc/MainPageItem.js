import React, { useState } from "react";
import MainPageItemCard from "../card/MainPageItemCard";
import redcan from "../../../static/styles/images/redcan.png";
import notebook from "../../../static/styles/images/notebook.png";
import ddofoki from "../../../static/styles/images/ddofoki.png";
import samsung from "../../../static/styles/images/samsungflip.png";
import styles from "../../../static/styles/css/mainpageitem.module.css";
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

function MainPageItem(props) {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : totalPages - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const h1style = {
    marginLeft: "5%",
  };

  return (
    <div className={`container ${styles.itemlistmargin}`}>
      <h1 style={h1style}>{props.heading}</h1>
      <div className={`d-flex justify-content-between align-items-center ${styles.carouselContainer}`}>
        <img
          src={carouselControlPrev}
          alt="Previous"
          onClick={handlePrev}
          className={styles.carouselControl}
          style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
        />
        <div className={`card-group d-flex ${styles.myflex}`}>
          {selectedItems.map((item, index) => (
            <MainPageItemCard
              key={index}
              img={item.img}
              category={item.category}
              name={item.name}
              startprice={item.startprice}
              nowprice={item.nowprice}
            />
          ))}
        </div>
        <img
          src={carouselControlNext}
          alt="Next"
          onClick={handleNext}
          className={styles.carouselControl}
          style={{ cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer" }}
        />
      </div>
    </div>
  );
}

export default MainPageItem;
