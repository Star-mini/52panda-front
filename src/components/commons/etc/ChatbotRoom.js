import React from "react";
import styles from "../../../static/styles/css/ChatRoom.module.css"; // 기존 ChatRoom 스타일을 재사용
import ChatbotIcon from "../../../static/styles/images/chatbothalf.png"; // 챗봇 아이콘 이미지 import

const ChatbotRoom = ({ onClick }) => {
  const handleRoomClick = () => {
    onClick('chatbot', '오이바오'); // 챗봇 방 ID와 제목을 onClick 함수에 전달
  };

  return (
    <div className={styles.chatRoom} onClick={handleRoomClick}> {/* 채팅방을 클릭하면 handleRoomClick 호출 */}
      <img
        src={ChatbotIcon}
        alt="Chatbot Icon"
        className={styles.pandaIcon} // 챗봇 아이콘 이미지
      />
      <div className={styles.chatInfo}>
        <div className={styles.nickname}>오이바오와 대화하기</div> {/* 챗봇 이름 */}
        <div className={styles.date}>궁금한점이나 필요하신 정보가 있으시면 편하게 찾아주세요.🐼</div> {/* 최근 채팅 날짜/시간 */}
      </div>
      <hr className={styles.separator} /> {/* 구분선 */}
    </div>
  );
};

export default ChatbotRoom;
