// SocialLogin.js

import React from 'react';
import Google from '../../static/styles/images/login/google_icon.png'
import Naver from '../../static/styles/images/login/naver_icon.png'
import Kakao from '../../static/styles/images/login//kakao_icon.png'

function SocialLogin() {
  const handleSocialLogin = (provider) => {
    // 각 소셜 로그인 버튼 클릭 시 실행할 함수
    console.log(`로그인 with ${provider}`);
    // 소셜 로그인 처리 로직 추가
  };

  return (
    <div className="center-box">
      <div className="green-box">
        <h2 style={{ fontSize: '1rem', marginBottom: '20px', paddingTop: '20px' }}>52판다에 오신 것을 환영합니다.<br />로그인을 하고 오늘은 이걸로 팔아보세요!</h2>
        <div className="social-login-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <img src={Google} alt="Google" style={{ width: '100px', height: '100px', cursor: 'pointer', marginTop: 'calc(50% - 50px)' }} onClick={() => handleSocialLogin('Google')} />
          <img src={Naver} alt="Naver" style={{ width: '100px', height: '100px', cursor: 'pointer', marginTop: 'calc(50% - 50px)' }} onClick={() => handleSocialLogin('Naver')} />
          <img src={Kakao} alt="Kakao" style={{ width: '100px', height: '100px', cursor: 'pointer', marginTop: 'calc(50% - 50px)' }} onClick={() => handleSocialLogin('Kakao')} />
        </div>
      </div>
    </div>
  );
}

export default SocialLogin;
