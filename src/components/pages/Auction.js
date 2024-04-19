import React, { useState, useEffect } from 'react';
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import noImage from "../../static/styles/images/noimage.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterButton from '../commons/button/FilterButton';
import CategoryToggle from '../commons/toggle/CategoryToggle';
import '../../static/styles/css/auction.css'
import WriteImage from '../../static/styles/images/write.png'

function Auction() {
  const [items,setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    region: "지역",
    tradingMethod: "거래 방법"
  });

  useEffect(() => {
    console.log(currentPage);
    fetchData();
  }, [filters]); 

  const fetchData = () => {
    setLoading(true);
    const newItems = [
      { id: 1, image: noImage, title: '푸바오', category: 'IT', tradingMethod: 0, startPrice: 1000, currentPrice: 1200 },
      { id: 2, image: noImage, title: '아이바오', category: '동물', tradingMethod: 2, startPrice: 15300, currentPrice: 18300 },
      { id: 3, image: noImage, title: 'A바오', category: '의류', tradingMethod: 2, startPrice: 100, currentPrice: 18001 },
      { id: 4, image: noImage, title: 'B바오', category: '애기', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 5, image: noImage, title: 'C바오', category: '야채', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 6, image: noImage, title: 'D바오', category: '자동차', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 7, image: noImage, title: 'E바오', category: '기타', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 8, image: noImage, title: 'F바오', category: '동물', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 9, image: noImage, title: 'G바오', category: '동물', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 10, image: noImage, title: 'H바오', category: '동물', tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    ];
    setItems(prevItems => [...prevItems, ...newItems]);
    setCurrentPage(prevPage => prevPage + 1);
    setLoading(false);
  };


  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };
  
  return (
    <div className='container'>
      <CategoryToggle></CategoryToggle>

      <div className='auction-filter'>
        <FilterButton handleFilterChange={handleFilterChange} selectedRegion={filters.region} selectedTradingMethod={filters.tradingMethod}/>
        <button className="btn btn-success">
            글쓰기  
            <img src={WriteImage} alt="Button Image" className='btn-image' />
        </button>
      </div>
      

      <div className='div-margin container'>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
        scrollableTarget="scrollableDiv"
      >
        <div className="row" >
          {items.map((item, index) => (
            <div key={index} className="col-md-6 item-card">
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
      </InfiniteScroll>
      </div>
    </div>
  );
}

export default Auction;
