import React from "react";
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import noImage from "../../static/styles/images/noimage.png";

function Auction() {
  return (
    <div>
      <div className="item-list">
        <ItemListInfoCard
          image={noImage}
          title="푸바오"
          category="IT"
          tradingMethod= {2}
          startPrice={13000}
          currentPrice={230000}
        />
        <ItemListInfoCard
          image={noImage}
          title="아이바오"
          category="의류"
          tradingMethod= {0}
          startPrice={1000}
          currentPrice={20000}
        />
      </div>
    </div>
  );
}

export default Auction;
