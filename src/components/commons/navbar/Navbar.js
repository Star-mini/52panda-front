import React from "react";
import pandaLogo from "../../../static/styles/images/panda_logo.png";
import heartButton from "../../../static/styles/images/heart_black.png";
import styles from "../../../static/styles/css/mainpage.module.css";
function Navbar() {
  return (
    <nav class="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={pandaLogo} width="50" height="24" alt="" />
        </a>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="" href="">
                <p className={styles.paragraph}>About</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="">
                <p className={styles.paragraph}>Item</p>
              </a>
            </li>
            <li className="nav-item">
              <input className={styles.input} />
            </li>
            <li className="nav-item">
              <button className={styles.button}>
                <img
                  className={styles.img}
                  width="20px"
                  src={heartButton}
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
