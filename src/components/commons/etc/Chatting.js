import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../static/styles/css/Chatting.module.css'; 
import chatting from "../../../static/styles/images/chatting.png";
import ChatRoom from './ChatRoom'; // Import the ChatRoom component
import closeIcon from '../../../static/styles/images/close.png';
import ChatWindow from './ChatWindow';

function Chatting() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [selectedChatRoomTitle, setSelectedChatRoomTitle] = useState(null); 
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false); 
  const [chatRoomsData, setChatRoomsData] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios.get('http://localhost:8081/chat/rooms')
      .then(response => {
        setChatRoomsData(response.data.data); 
        console.log(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching chat rooms:', error);
      });
  }, [isChatWindowOpen]);

  const handleChatRoomClick = (roomId,chatTitle) => {
    setSelectedChatRoomId(roomId);
    setSelectedChatRoomTitle(chatTitle);
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
              <ChatWindow roomId={selectedChatRoomId} roomTitle={selectedChatRoomTitle} onBackButtonClick={handleBackButtonClick} />
            ) : (
              <div>
                  {chatRoomsData.map((room, index) => (
                    <ChatRoom key={index} room={room} onClick={handleChatRoomClick}/>
                  ))}
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    
    </>
  );
}

export default Chatting;