import React from "react";
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import noImage from "../../static/styles/images/noimage.png";

function Auction() {

  const items = [
    { id: 1, image: noImage, title: '푸바오', category: 'IT', tradingMethod: 0, startPrice: 1000, currentPrice: 1200 },
    { id: 2, image: noImage, title: '아이바오', category: '동물', tradingMethod: 2, startPrice: 15300, currentPrice: 18300 },
    { id: 3, image: noImage, title: 'A바오', category: '의류', tradingMethod: 2, startPrice: 100, currentPrice: 18001 },
    { id: 4, image: noImage, title: 'B바오', category: '애기', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    { id: 5, image: noImage, title: 'C바오', category: '야채', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    { id: 6, image: noImage, title: 'D바오', category: '자동차', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    { id: 7, image: noImage, title: 'E바오', category: '기타', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    { id: 8, image: noImage, title: 'F바오', category: '동물', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    
  ];
  return (
    <div className="container">
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-md-6 mb-4">
            <ItemListInfoCard
              image={item.image}
              title={item.title}
              category={item.category}
              tradingMethod={item.tradingMethod}
              startPrice={item.startPrice}
              currentPrice={item.currentPrice}
              itemId={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Auction;
