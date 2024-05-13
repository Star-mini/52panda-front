import React, { useState } from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head.png";
import head2 from "../../static/styles/images/head2.png";
import styles from "../../static/styles/css/mypage.module.css";
import MainPageCard from "../commons/card/MainPageCard";
import MainPageItem from "../commons/etc/MainPageItem";
import Footer from "../commons/footer/Footer";
import CategoryToggle from "../commons/toggle/CategoryMainToggle";
import footer from "../../static/styles/images/footerup.png";

function MainPage() {
  const [toggled, setToggled] = useState(false);

  const onClick = () => {
    setToggled(!toggled);
  };

  const wid = {
    margin: "100px!important",
  };
  return (
    <div style={wid}>
      <div className="row justify-content-center mx-5">
        <img src={head2} className={`img-fluid ${styles.headPicture}`} />
        <CategoryToggle />
        <MainPageItem heading="Hot Item" />
        <MainPageItem heading="New Item" />
      </div>
      <img src={footer} className={styles.img} />
    </div>
  );
}

export default MainPage;
