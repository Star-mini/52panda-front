import React, { useState } from 'react';
import styles from '../static/styles/css/Chatting.module.css'; 
import chatting from "../static/styles/images/chatting.png";
import ChatRoom from './ChatRoom'; // Import the ChatRoom component

function Chatting() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  // Sample data for the chat rooms
  const chatRoomsData = [
    { nickname: '꿀', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
    { nickname: '단우', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
    { nickname: '지훈지훈지훈', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
    { nickname: '한현이의 거부권', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
  ];

  return (
    <>
      <img 
        src={chatting} 
        alt="Chat Icon" 
        className={styles.chatIcon}     
        onClick={toggleModal}
      />
      {isOpen && (
        <div className={styles.backdrop} onClick={toggleModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>채팅창 LIST</h2>
            <button onClick={toggleModal}>닫기</button>
            <div>
              {chatRoomsData.map((room, index) => (
                <ChatRoom key={index} nickname={room.nickname} date={room.date} content={room.content} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatting;