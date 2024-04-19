import React from "react";
import AboutMore from "../AboutMore";
import ProductDetail from "../ProductDetail";
import Chatting from "../Chatting"; // 경로 확인

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
