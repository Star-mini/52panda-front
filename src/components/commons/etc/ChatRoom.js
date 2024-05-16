import React from "react";
import styles from "../../../static/styles/css/ChatRoom.module.css"; // 모듈 CSS 임포트
import ChattingPanda from "../../../static/styles/images/ChattingPanda.png";

const ChatRoom = ({ room, onClick }) => {

  const handleRoomClick = () => {
    onClick(room.roomId,room.chatTitle); 
  }

  return (
    <div className={styles.chatRoom} onClick={handleRoomClick}>
      <img
        src={ChattingPanda} 
        alt="Chat Icon" 
        className={styles.pandaIcon}
      />
      <div className={styles.chatInfo}>
        <div className={styles.nickname}>{room.username}</div>
        <div className={styles.date}>{room.recentDateTime}</div>
        {room.recentContent !== null ? (
          <div className={styles.content}>{room.recentContent}</div>
        ) : (
          <div className={styles.content}>채팅내용 없음</div>
        )}
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default ChatRoom;
