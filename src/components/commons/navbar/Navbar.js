import React from "react";
import pandaLogo from "../../../static/styles/images/panda_logo.jpg";
import heartButton from "../../../static/styles/images/heart_black.png";
import styles from "../../../static/styles/css/navbar.module.css";
import mypageButton from "../../../static/styles/images/mypage_panda.png";
import dbg from "../../../static/styles/images/dbg.svg";

function Navbar() {
  const pad = {
    paddingRight: "100px",
    paddingLeft: "100px",
  };
  return (
    <nav class="navbar navbar-expand">
      <div className={`container-fluid ${styles.padding}`} style={pad}>
        <a className="navbar-brand" href="#">
          <img src={pandaLogo} className={styles.logoImg} alt="" />
        </a>
        <div className="collapse navbar-collapse" id="">
          <ul className={`navbar-nav `}>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a} href="">
                <p className={styles.paragraph}>About</p>
              </a>
            </li>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a} href="">
                <p className={styles.paragraph}>물품목록</p>
              </a>
            </li>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a} href="">
                <p className={styles.paragraph}>판매하기</p>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <form className="input-group">
                <input
                  className={`${styles.input} form-control`}
                  placeholder="찾고 싶은 중고물품을 검색해보세요"
                />
                <button className={styles.button}>
                  <img className={styles.dbg} src={dbg}></img>
                </button>
              </form>
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
            <li class="dropdown nav-item me-5">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button className={styles.button}>
                  <img
                    className={styles.img}
                    width="40px"
                    src={mypageButton}
                    alt=""
                  />
                </button>
              </a>

              <ul class={`${styles.dropdown} dropdown-menu`}>
                <li>
                  <a class="dropdown-item" href="#">
                    찜한목록
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    경매글목록
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    참여한 경매글목록
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    비밀번호수정
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
