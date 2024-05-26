import React from "react";
import styles from "../../../static/styles/css/ChatRoom.module.css"; // 모듈 CSS 임포트
import ChattingPanda from "../../../static/styles/images/ChattingPanda.png"; // 채팅 아이콘 이미지 임포트

const ChatRoom = ({ room, onClick }) => { // ChatRoom 컴포넌트 정의, room과 onClick을 props로 받음

  // 채팅방 클릭 시 호출되는 함수
  const handleRoomClick = () => {
    onClick(room.roomId, room.chatTitle); // 클릭된 채팅방 ID와 제목을 onClick 함수에 전달
  };

  return (
    <div className={styles.chatRoom} onClick={handleRoomClick}> {/* 채팅방을 클릭하면 handleRoomClick 호출 */}
      <img
        src={ChattingPanda} 
        alt="Chat Icon" 
        className={styles.pandaIcon} // 채팅방 아이콘 이미지
      />
      <div className={styles.chatInfo}>
        <div className={styles.nickname}>{room.username}</div> {/* 채팅방 사용자 이름 */}
        <div className={styles.date}>{room.recentDateTime}</div> {/* 최근 채팅 날짜/시간 */}
        {room.recentContent !== null ? ( // 최근 채팅 내용이 있을 경우 표시
          <div className={styles.content}>{room.recentContent}</div>
        ) : (
          <div className={styles.content}>채팅내용 없음</div> // 최근 채팅 내용이 없을 경우 "채팅내용 없음" 표시
        )}
      </div>
      <hr className={styles.separator} /> {/* 구분선 */}
    </div>
  );
};

export default ChatRoom; // ChatRoom 컴포넌트를 export
