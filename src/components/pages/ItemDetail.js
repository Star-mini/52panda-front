import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductDetail from "../commons/etc/ProductDetail";
import AboutMore from "../commons/etc/AboutMore";
import Recommend from "../commons/etc/Recommend";

function ItemDetail() {
  const [productData, setProductData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // URL의 쿼리 파라미터에서 itemId를 추출합니다.
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get('itemId');

    const fetchData = async () => {
      try {
        if (itemId) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/auth/auction/${itemId}`);
          setProductData(response.data.data);
        } else {
          console.error('itemId가 URL에 없습니다.');
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, [location.search]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail productData={productData} />
      <AboutMore productData={productData} />
      <Recommend/>
    </div>
  );
}

export default ItemDetail;
