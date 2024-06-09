import React, { useEffect, useState, useRef } from "react";
import Navbar from "../commons/navbar/Navbar";
import head from "../../static/styles/images/head5.png";
import MainPageCard from "../commons/card/MainPageCard";
import styles from "../../static/styles/css/mainpage.module.css";
import MainPageItem from "../commons/etc/MainPageItem";
import CategoryToggle from "../commons/toggle/CategoryMainToggle";
import aboutPhoto from "../../static/styles/images/aboutphoto.png";
import Chatting from "../commons/etc/Chatting";

function MainPage() {
  const [toggled, setToggled] = useState(false);
  const aboutPhotoRef = useRef(null);

  const onClick = () => {
    setToggled(!toggled);
  };

  const wid = {
    margin: "100px!important",
  };

  useEffect(() => {
    const shouldScrollToAbout = localStorage.getItem('navigateToAbout');
    if (shouldScrollToAbout === 'true') {
      setTimeout(() => {
        if (aboutPhotoRef.current) {
          aboutPhotoRef.current.scrollIntoView({ behavior: 'smooth' });
          localStorage.removeItem('navigateToAbout');
        }
      }, 100); // 약간의 지연을 주어 페이지가 완전히 로드된 후 스크롤
    }
  }, []);

  return (
      <div style={wid}>
        <div className="row justify-content-center mx-5">
          <img src={head} className={`img-fluid ${styles.headPicture}`} />
          <CategoryToggle />
          <MainPageItem heading="Hot Item" />
          <MainPageItem heading="New Item" />
        </div>
        <img id="aboutPhoto" src={aboutPhoto} ref={aboutPhotoRef} className={styles.img} />
      </div>
  );
}

export default MainPage;
