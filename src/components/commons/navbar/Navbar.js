import React from "react";
import pandaLogo from "../../../static/styles/images/panda_logo.png";
import heartButton from "../../../static/styles/images/heart_black.png";
import styles from "../../../static/styles/css/navbar.module.css";
import mypageButton from "../../../static/styles/images/mypage_panda.png";

function Navbar() {
  return (
    <nav class="navbar navbar-expand">
      <div className="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={pandaLogo} width="120" height="55" alt="" />
        </a>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item ms-4">
              <a className={styles.a} href="">
                <p className={styles.paragraph}>About</p>
              </a>
            </li>
            <li className="nav-item ms-2">
              <a className={styles.a} href="">
                <p className={styles.paragraph}>Item</p>
              </a>
            </li>
            <li className="nav-item ms-2">
              <a className={styles.a} href="">
                <p className={styles.paragraph}>Post</p>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <input
                className={`${styles.input} form-control`}
                placeholder="찾고 싶은 중고물품을 검색해보세요"
              />
            </li>
            <li className="nav-item">
              <button className={styles.button}>
                <img
                  className={styles.img}
                  width="40px"
                  src={heartButton}
                  alt=""
                />
              </button>
            </li>
            <li className="nav-item">
              <button className={styles.button}>
                <img
                  className={styles.img}
                  width="40px"
                  src={mypageButton}
                  alt=""
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
