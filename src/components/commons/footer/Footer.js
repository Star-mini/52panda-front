import React from "react";
import footer from "../../../static/styles/images/footerup.png";
import styles from "../../../static/styles/css/footer.module.css";
function Footer() {
  const outer = {
    display: "grid",
  };
  return (
    <div style={outer} className="">
      <div className={styles.division}>
        <img src={footer} className={styles.img} />
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
