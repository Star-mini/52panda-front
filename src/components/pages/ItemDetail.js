import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProductDetail from "../commons/etc/ProductDetail";
import AboutMore from "../commons/etc/AboutMore";

function ItemDetail() {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/auth/auction/1`);
        setProductData(response.data.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail productData={productData} />
      <AboutMore productData={productData} />
    </div>
  );
}

export default ItemDetail;
