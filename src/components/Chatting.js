import React, { useState } from 'react';
import styles from '../static/styles/css/Chatting.module.css'; 
import chatting from "../static/styles/images/chatting.png";


function Chatting() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

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
            <h2>채팅창</h2>
            <button onClick={toggleModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatting;
