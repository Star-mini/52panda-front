import React, { useState } from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head.png";
import styles from "../../static/styles/css/mypage.module.css";
import MainPageCard from "../commons/card/MainPageCard";
import MainPageItem from "../commons/etc/MainPageItem";
import Footer from "../commons/footer/Footer";
import CategoryToggle from "../commons/toggle/CategoryMainToggle";

function MainPage() {
  const [toggled, setToggled] = useState(false);

  const onClick = () => {
    setToggled(!toggled);
  };

  const wid = {
    margin: "100px!important",
  };
  return (
    <div className="container-fluid" style={wid}>
      <div className="row justify-content-center mx-5">
        <img src={head} className={`img-fluid ${styles.headPicture}`} />
        <CategoryToggle />
        <MainPageItem heading="Hot Item" />
        <MainPageItem heading="New Item" />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
