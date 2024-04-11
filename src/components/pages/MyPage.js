import React from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head.png";
function MyPage() {
  return (
    <div>
      <Navbar />;
      <img src={head} alt="" />
    </div>
  );
}

export default MyPage;
