import React, { useState } from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head.png";
import styles from "../../static/styles/css/mypage.module.css";
import MainPageCard from "../commons/card/MainPageCard";
import MainPageItem from "../commons/etc/MainPageItem";
import Footer from "../commons/footer/Footer";

function MainPage() {
  const [toggled, setToggled] = useState(false);

  const onClick = () => {
    setToggled(!toggled);
  };

  return (
    <div>
      <div className="row justify-content-center">
        <Navbar />

        <img src={head} className={`img-fluid ${styles.headPicture}`} />
        <div>
          {toggled ? (
            <div className={`${styles.teduri} ${toggled ? styles.fadeIn : ""}`}>
              <MainPageCard onClick={onClick} beMenu={"yes"} />
              <MainPageCard beMenu={"no"} />
              <MainPageCard beMenu={"no"} />
            </div>
          ) : (
            <div className={styles.teduri2}>
              <MainPageCard onClick={onClick} />
            </div>
          )}
        </div>
        <MainPageItem heading="Hot Item" />
        <MainPageItem heading="New Item" />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
