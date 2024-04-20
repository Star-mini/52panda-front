import React from "react";
import AboutMore from "../commons/etc/AboutMore";
import ProductDetail from "../commons/etc/ProductDetail";
import Chatting from "../commons/etc/Chatting"; // 경로 확인

function ItemDetail() {
  return (
    <div>
      <ProductDetail />
      <AboutMore />
      <Chatting />
    </div>
  );
}

export default ItemDetail;
