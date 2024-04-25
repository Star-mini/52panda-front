import React from "react";
import MainPageItemCard from "../card/MainPageItemCard";
import redcan from "../../../static/styles/images/redcan.png";
import notebook from "../../../static/styles/images/notebook.png";
import ddofoki from "../../../static/styles/images/ddofoki.png";
import samsung from "../../../static/styles/images/samsungflip.png";
import styles from "../../../static/styles/css/mainpageitem.module.css";
function MainPageItem(props) {
  const h1style = {
    marginLeft: "5%",
  };
  return (
    <div className={`container ${styles.itemlistmargin}`}>
      <h1 style={h1style}>{props.heading}</h1>
      <div className={`card-group d-flex ${styles.myflex}`}>
        <MainPageItemCard
          img={notebook}
          category="전자기기/노트북"
          name="그램"
          startprice="5000억"
          nowprice="5조"
        />
        <MainPageItemCard
          img={samsung}
          category="전자기기/휴대폰"
          name="삼성플립2"
          startprice="5000억"
          nowprice="5조"
        />
        <MainPageItemCard
          img={ddofoki}
          category="식료품/밀키트"
          name="떡볶이밀키트"
          startprice="5000억"
          nowprice="5조"
        />
        <MainPageItemCard
          img={redcan}
          category="화장품세트/기초세트"
          name="화장품세트"
          startprice="5000억"
          nowprice="5조"
        />
      </div>
    </div>
  );
}

export default MainPageItem;
