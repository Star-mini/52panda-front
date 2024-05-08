import React, { useState } from 'react';
import styles from '../../../static/styles/css/Chatting.module.css'; 
import chatting from "../../../static/styles/images/chatting.png";
import ChatRoom from './ChatRoom'; // Import the ChatRoom component
import closeIcon from '../../../static/styles/images/close.png';
import ChatWindow from './ChatWindow';

function Chatting() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null); 
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false); 
  const [testUser,setTestUser] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);

  const chatRoomsData = [
    { id: 5, user:1,nickname: '꿀', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
    { id: 5, user:2,nickname: '단우', date: '24/03/12 08:12:31', content: '어머고 꺄꺄꺄 오모모모' },
  ];

  const handleChatRoomClick = (roomId,user) => {
    setSelectedChatRoomId(roomId);
    setTestUser(user);
    setIsChatWindowOpen(true);
  };

  const handleBackButtonClick = () => {
    setIsChatWindowOpen(false);
  };

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
            <div className={styles.Chattingnav} >
              <h2 className={styles.chattingH2}>채팅창 LIST</h2>
              <div className={styles.closeButtonContainer}> 
                <button className={styles.closebox} onClick={toggleModal}>
                  <img src={closeIcon} className={styles.closeicon} alt="close" />
                </button>
              </div>
            </div>
            
            <div>
            {isChatWindowOpen ? (
              <ChatWindow roomId={selectedChatRoomId}  testUser={testUser} onBackButtonClick={handleBackButtonClick} />
            ) : (
              chatRoomsData.map((room, index) => (
                <ChatRoom key={index} room={room} onClick={handleChatRoomClick}/>
              ))
            )}
            </div>
          </div>
        </div>
      )}
    
    </>
  );
}

export default Chatting;