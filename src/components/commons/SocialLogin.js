import React from 'react';
import Google from '../../static/styles/images/login/google_icon.png';
import Naver from '../../static/styles/images/login/naver_icon.png';
import Kakao from '../../static/styles/images/login//kakao_icon.png';
import styles from "../../static/styles/css/SocialLogin.module.css"; // 모듈 CSS 임포트

function SocialLogin() {
  const handleSocialLogin =  (url) => {
    window.location.href = url;
  };

  return (
    <div className={styles.centerBox}>
      <div className={styles.greenBox}>
        <h2 className={styles.welcomeMessage}>52판다에 오신 것을 환영합니다.<br />로그인을 하고 오늘은 이걸로 팔아보세요!</h2>
        <div className={styles.socialLoginButtons}>
          <img src={Google} alt="Google" className={styles.socialButton} onClick={() => handleSocialLogin(process.env.REACT_APP_GOOGLE_OAUTH_URL)} />
          <img src={Naver} alt="Naver" className={styles.socialButton} onClick={() => handleSocialLogin(process.env.REACT_APP_NAVER_OAUTH_URL)} />
          <img src={Kakao} alt="Kakao" className={styles.socialButton} onClick={() => handleSocialLogin(process.env.REACT_APP_KAKAO_OAUTH_URL)} />
        </div>
      </div>
    </div>
  );
}

export default SocialLogin;
