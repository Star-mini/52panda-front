import React from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head.png";
import styles from "../../static/styles/css/mypage.module.css";
import MainPageCard from "../commons/card/MainPageCard";
function MainPage() {
  return (
    <div>
      <Navbar />
      <img src={head} className={`img-fluid ${styles.headPicture}`} />
      <MainPageCard />
    </div>
  );
}

export default MainPage;
