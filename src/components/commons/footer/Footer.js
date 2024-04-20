import React from "react";
import styles from "../../../static/styles/css/footer.module.css";
function Footer() {
  return (
    <div className={styles.outer}> 
      <div className={styles.division}>
        <p>Copyright ©2023-2024 Kakao Cloud School.52Panda</p>
        <p>
          Developer Inhong Lee | SangMin Park | JiHun Kang | HaHyeon Cho |
          MinKyung Son | TaeWoo Kim
        </p>
      </div>
    </div>
  );
}

export default Footer;
