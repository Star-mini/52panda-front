import React from "react";
import cosmetics from "../../../static/styles/images/cosmetics.png";
import diet from "../../../static/styles/images/diet.png";
import laptop from "../../../static/styles/images/laptop.png";
import furniture from "../../../static/styles/images/furniture.png";
import noodle from "../../../static/styles/images/noodle.png";
import rice_cooker from "../../../static/styles/images/rice_cooker.png";
import tshirt from "../../../static/styles/images/tshirt.png";
import menu from "../../../static/styles/images/menu.png";
import food from "../../../static/styles/images/food.png";
import styles from "../../../static/styles/css/maincard.module.css";
import MainCardPart from "./MainCardPart";
function MainCard() {
  return (
    <div>
      <div className={`card-group ${styles.cards}`}>
        <MainCardPart img={menu} name="전체메뉴" />

        <MainCardPart img={cosmetics} name="화장품" />
        <MainCardPart img={laptop} name="전자기기" />

        <MainCardPart img={food} name="배달" />
        <MainCardPart img={noodle} name="즉석식품" />
        <MainCardPart img={diet} name="식료품" />
        <MainCardPart img={tshirt} name="의류" />
        <MainCardPart img={furniture} name="가구" />

        <MainCardPart img={rice_cooker} name="가전제품" />
      </div>
    </div>
  );
}

export default MainCard;
