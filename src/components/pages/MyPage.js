import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListInfoCard from "../commons/card/ItemListInfoCard";
import "../../static/styles/css/mypage.css";
import { client } from "../util/client";
import { useLocation } from 'react-router-dom';

function MyPage() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const menu = params.get('select');
        if (menu) {
            setSelectedMenu(menu);
        }
    }, [location]);

    useEffect(() => {
        if (selectedMenu) {
            resetItemsAndFetchData();
        }
    }, [selectedMenu]);

    const resetItemsAndFetchData = () => {
        setItems([]);
        setCurrentPage(0);
        setHasMore(true);
        fetchData(0);
    };

    const fetchData = (page) => {
        if (loading || !selectedMenu) return;
        setLoading(true);
        const endpointMap = {
            'like': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/like`,
            'auction': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/auction`,
            'bid': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/bid`,
            'award': `${process.env.REACT_APP_API_URL}/v1/auth/mypage/award`
        };

        console.log(`Fetching data from: ${endpointMap[selectedMenu]}`);

        client.get(endpointMap[selectedMenu], { params: { page } })
            .then(response => {
                const fetchedItems = response.data;
                setItems(prevItems => page === 0 ? fetchedItems : [...prevItems, ...fetchedItems]);
                setCurrentPage(page + 1);
                setLoading(false);
                if (fetchedItems.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(error => {
                console.error('Error fetching items: ', error);
                setLoading(false);
            });
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className='container container-zoom'>
            <div className="mypage-buttons">
                <button className={selectedMenu === 'like' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('like')}>찜 목록</button>
                <button className={selectedMenu === 'auction' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('auction')}>등록글 목록</button>
                <button className={selectedMenu === 'bid' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('bid')}>입찰 목록</button>
                <button className={selectedMenu === 'award' ? 'mypage-button selected' : 'mypage-button'} onClick={() => handleMenuClick('award')}>낙찰 목록</button>
            </div>

            <div className='div-margin container'>
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => fetchData(currentPage)}
                    hasMore={hasMore}
                    scrollThreshold={0.9}
                >
                    <div className="row">
                        {items.map((item, index) => (
                            <div key={index} className="col-md-6 item-card">

                                <ItemListInfoCard
                                    image={item.thumbnail}
                                    title={item.itemTitle}
                                    category={item.category}
                                    tradingMethod={item.tradingMethod}
                                    startPrice={item.startPrice}
                                    currentPrice={item.currentPrice}
                                    itemId={item.itemId}
                                    isBidComplete={item.isBidComplete}

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
