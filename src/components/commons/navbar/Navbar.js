import React, { useState } from "react";
import pandaLogo from "../../../static/styles/images/PandaLogo.png";
import bell from "../../../static/styles/images/bell.png";
import styles from "../../../static/styles/css/navbar.module.css";
import mypageButton from "../../../static/styles/images/mypage_panda.png";
import dbg from "../../../static/styles/images/dbg.svg";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import NotificationToggle from "../toggle/NotificationToggle";

function Navbar() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    localStorage.setItem('navigateToAbout', 'true');
    navigate('/'); // navigate 함수로 라우팅
  };


  const login = localStorage.getItem("login");

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("id");
    localStorage.removeItem("access");
    localStorage.removeItem("username");

  };

  return (
    <nav class="navbar navbar-expand">
      <div className={`container-fluid ${styles.padding}`}>
        <a className="navbar-brand" href="/">
          <img src={pandaLogo} className={styles.logoImg} alt="" />
        </a>
        <div className="collapse navbar-collapse" id="">
          <ul className={`navbar-nav `}>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a}  href="/" onClick={handleAboutClick}>
                <p className={styles.paragraph}>About</p>
              </a>
            </li>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a} href="/auction">
                <p className={styles.paragraph}>물품목록</p>
              </a>
            </li>
            <li
              className={`nav-item ms-4 ${styles.zeromargin} ${styles.leftandblock}`}
            >
              <a className={styles.a} href={login === "1" ? "/auction/form" : "/login"}>
                <p className={styles.paragraph}>판매하기</p>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <form className="input-group">
                <input
                  className={`${styles.input} form-control`}
                  placeholder=""
                />
                <button className={styles.button}>
                  <img className={styles.dbg} src={dbg}></img>
                </button>
              </form>
            </li>
            <li className="nav-item">
              <button className={styles.button} onClick={toggleNotifications}>
                <img className={styles.img} width="40px" src={bell} alt="" />
              </button>
              {showNotifications && <NotificationToggle />}
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

              <ul className={`${styles.dropdown} dropdown-menu`}>
                {login === "1" ? (
                  <>
                    <li>
                      <a className="dropdown-item" href="/mypage?select=like">
                        찜한목록
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/mypage?select=auction">
                        경매등록목록
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/mypage?select=bid">
                        경매참여목록
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/mypage?select=award">
                        입찰완료목록
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/"  onClick={handleLogout}>
                        로그아웃
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      로그인
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
