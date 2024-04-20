import React, { useEffect, useState } from "react";
import noImage from "../../static/styles/images/noimage.png";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import "../../static/styles/css/mypage.css"

function MyPage() {

  const [items,setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

  useEffect(() => {
    setItems([]);
    fetchData();
  }, [selectedMenu]); 

  const fetchData = () => {
    setLoading(true);
    const newItems = [
      { id: 1, image: noImage, title: '푸바오', category: 'IT',categoryDetail:'노트북', tradingMethod: 0, startPrice: 1000, currentPrice: 1200 },
      { id: 2, image: noImage, title: '아이바오', category: '동물', categoryDetail:'노트북',tradingMethod: 2, startPrice: 15300, currentPrice: 18300 },
      { id: 3, image: noImage, title: 'A바오', category: '의류', categoryDetail:'노트북',tradingMethod: 2, startPrice: 100, currentPrice: 18001 },
      { id: 4, image: noImage, title: 'B바오', category: '애기', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 5, image: noImage, title: 'C바오', category: '야채', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 6, image: noImage, title: 'D바오', category: '자동차', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 7, image: noImage, title: 'E바오', category: '기타', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 8, image: noImage, title: 'F바오', category: '동물', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 9, image: noImage, title: 'G바오', category: '동물', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
      { id: 10, image: noImage, title: 'H바오', category: '동물', categoryDetail:'노트북',tradingMethod: 2, startPrice: 1500, currentPrice: 1800 },
    ];
    setItems(prevItems => [...prevItems, ...newItems]);
    setCurrentPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    fetchData();
  };

  return (
    <div className='container container-zoom'>
      <div className="mypage-buttons">
        <button className={selectedMenu === '찜' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('찜')}>찜 목록</button>
        <button className={selectedMenu === '등록글' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('등록글')}>등록글 목록</button>
        <button className={selectedMenu === '입찰' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('입찰')}>입찰 목록</button>
        <button className={selectedMenu === '낙찰' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('낙찰')}>낙찰 목록</button>
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
                  categoryDetail={item.categoryDetail}
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

export default MyPage;
