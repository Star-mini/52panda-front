import React from "react";
import styles from "../../../static/styles/css/footer.module.css";
function Footer() {
  const outer = {
    display: "grid",
  };
  return (
    <div style={outer}>
      <div className={styles.division}>
        <p className={styles.font}>About 오이판다</p>
      </div>
    </div>
  );
}

export default Footer;
