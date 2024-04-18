import React from "react";
import styles from "../static/styles/css/ChatRoom.module.css"; // 모듈 CSS 임포트
import ChattingPanda from "../static/styles/images/ChattingPanda.png";

const ChatRoom = ({ nickname, date, content }) => {
  return (
    <div className={styles.chatRoom}>
      <img
        src={ChattingPanda} 
        alt="Chat Icon" 
        className={styles.pandaIcon}
      />
      <div className={styles.chatInfo}>
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles.content}>{content}</div>
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default ChatRoom;
