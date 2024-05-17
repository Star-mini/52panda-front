import React, { useState, useEffect } from 'react';
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import noImage from "../../static/styles/images/noimage.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterButton from '../commons/button/FilterButton';
import CategoryToggle from '../commons/toggle/CategoryToggle';
import '../../static/styles/css/auction.css'
import WriteImage from '../../static/styles/images/write.png'
import axios from 'axios';

function Auction() {
  const [items,setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    region: "지역",
    tradingMethod: "거래 방법"
  });

  useEffect(() => {
    fetchData();
  }, [filters,selectedCategory]); 


  const handleCategoryChange = (category) => {
    setItems([]);
    setCurrentPage(0);
    setSelectedCategory(category);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      
      let regionValue = null;
      if (filters.region !== "전체" && filters.region !== "지역") {
        regionValue = filters.region;
      }

      let tradingMethodValue = null;
      if(filters.tradingMethod === "택배"){
        tradingMethodValue = 1;
      }else if(filters.tradingMethod === "직거래"){
        tradingMethodValue = 2;
      }else if(filters.tradingMethod === "전체"){ 
        tradingMethodValue = 3;
      }

      const params = {
        status: 'progress',
        page: currentPage
      };

      if (regionValue !== null) {
        params.region = regionValue;
      }

      if(tradingMethodValue !== null){
        params.tradingMethod =tradingMethodValue
      }

      if(selectedCategory !== null ){
        params.category = selectedCategory
      }

      console.log("params",params);
    
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/no-auth/auction`, {
        params: params
      });

      console.log(regionValue);
  
  
      const progressItemListDto = response.data.data;

      const newItems = progressItemListDto.progressItemListDto;
  
      newItems.forEach(item => {
        
        const processedItem = {
            itemId: item.itemId,
            itemTitle: item.itemTitle,
            category: item.category,
            tradingMethod: item.tradingMethod,
            thumbnail: item.thumbnail,
            startPrice: item.startPrice,
            currentPrice: item.currentPrice
        };
        setItems(prevItems => [...prevItems, processedItem]);
    });

      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleFilterChange = (type, value) => {
    setItems([]);
    setCurrentPage(0);
    setFilters({ ...filters, [type]: value });
  };
  
  return (
    <div className='container container-zoom'>
      <CategoryToggle onSelectCategory={handleCategoryChange}></CategoryToggle>

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
        scrollThreshold={0.9}
        scrollableTarget="scrollableDiv"
        style={{ overflowX: 'hidden' }}
      >
        <div className="row" >
          {items.map((item, index) => (
            <div key={index} className="col-md-6 item-card">
              <ItemListInfoCard
                image={item.thumbnail}
                title={item.itemTitle}
                category={item.category}
                categoryDetail={item.categoryDetail}
                tradingMethod={item.tradingMethod}
                startPrice={item.startPrice}
                currentPrice={item.currentPrice}
                itemId={item.itemId}
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
