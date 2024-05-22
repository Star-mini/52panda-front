import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import "../../static/styles/css/mypage.css"
import axios from 'axios';
import { client } from "../util/client";

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

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const userId = searchParams.get("sel");
    // }, []);

    const fetchData = () => {
    setLoading(true);
    const endpointMap = {
      '찜': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/like`,
      '등록글': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/auction`,
      '입찰': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/bid`,
      '낙찰': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/award`
    }
    client.get(endpointMap[selectedMenu])
        .then(response => {
          console.log("testeseatstre",response.data);
          setItems(prevItems => [...prevItems, ...response.data]); //받은 데이터를 아이템에 추가
          setCurrentPage(prevPage => prevPage + 1);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching items: ', error);
          setLoading(false);
        })
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
          scrollThreshold={0.9}
          scrollableTarget="scrollableDiv"
        >
          <div className="row" >
            {items.map((item, index) => (
              <div key={index} className="col-md-6 item-card">
                <ItemListInfoCard
                  image={item.thumbnail}
                  title={item.itemTitle}
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

export default MyPage;
