import React, { useEffect, useState } from 'react'; // React, useState, useEffect를 import
import axios from 'axios'; // axios를 import하여 HTTP 요청을 처리
import styles from '../../../static/styles/css/Chatting.module.css'; // CSS 모듈을 import하여 스타일링
import chatting from "../../../static/styles/images/chatting.png"; // 채팅 아이콘 이미지 import
import ChatRoom from './ChatRoom'; // ChatRoom 컴포넌트를 import
import closeIcon from '../../../static/styles/images/close.png'; // 닫기 아이콘 이미지 import
import ChatWindow from './ChatWindow'; // ChatWindow 컴포넌트를 import
import { client } from '../../util/client'; // client 객체를 import하여 HTTP 요청에 사용
import ChatbotRoom from './ChatbotRoom'; // ChatbotRoom 컴포넌트를 import

function Chatting() {
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null); // 선택된 채팅방 ID를 저장하는 상태 변수
  const [selectedChatRoomTitle, setSelectedChatRoomTitle] = useState(null); // 선택된 채팅방 제목을 저장하는 상태 변수
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false); // 채팅창의 열림/닫힘 상태를 관리하는 상태 변수
  const [chatRoomsData, setChatRoomsData] = useState(null); // 채팅방 목록 데이터를 저장하는 상태 변수

  // 모달을 열고 닫는 함수
  const toggleModal = () => setIsOpen(!isOpen);

  // 모달이 열릴 때 채팅방 목록을 가져오는 useEffect
  useEffect(() => {
    if (isOpen) {
      client.get(`${process.env.REACT_APP_API_URL}/v1/auth/chat/rooms`) // API 요청을 통해 채팅방 목록을 가져옴
        .then(response => {
          setChatRoomsData(response.data.data); // 응답 데이터를 상태 변수에 저장
          console.log(response.data.data); // 데이터 콘솔 출력
        })
        .catch(error => {
          console.error('Error fetching chat rooms:', error); // 오류 처리
        });
    }
  }, [isOpen, isChatWindowOpen]); // 모달 열림 상태와 채팅창 열림 상태를 의존성 배열로 설정

  // 채팅방을 클릭했을 때 호출되는 함수
  const handleChatRoomClick = (roomId, chatTitle) => {
    setSelectedChatRoomId(roomId); // 선택된 채팅방 ID를 설정
    setSelectedChatRoomTitle(chatTitle); // 선택된 채팅방 제목을 설정
    setIsChatWindowOpen(true); // 채팅창을 열림 상태로 설정
  };

  // 뒤로 가기 버튼을 클릭했을 때 호출되는 함수
  const handleBackButtonClick = () => {
    setIsChatWindowOpen(false); // 채팅창을 닫음 상태로 설정
  };

  return (
    <>
      <img 
        src={chatting} 
        alt="Chat Icon" 
        className={styles.chatIcon}     
        onClick={toggleModal} // 채팅 아이콘을 클릭했을 때 모달 열림/닫힘
      />
      {isOpen && ( // 모달이 열려 있을 때만 표시
        <div className={styles.backdrop} onClick={toggleModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}> {/* 모달 클릭 이벤트 전파 차단 */}
            <div className={styles.Chattingnav}>
              <h2 className={styles.chattingH2}>채팅창 LIST</h2> {/* 모달 제목 */}
              <div className={styles.closeButtonContainer}> 
                <button className={styles.closebox} onClick={toggleModal}> {/* 모달 닫기 버튼 */}
                  <img src={closeIcon} className={styles.closeicon} alt="close" />
                </button>
              </div>
            </div>
            
            <div>
              {chatRoomsData !== null && ( // 채팅방 데이터가 있을 때만 표시
                isChatWindowOpen ? ( // 채팅창이 열려 있는 경우
                  <ChatWindow roomId={selectedChatRoomId} roomTitle={selectedChatRoomTitle} onBackButtonClick={handleBackButtonClick} /> // ChatWindow 컴포넌트 표시
                ) : ( // 채팅창이 닫혀 있는 경우
                  <div>
                    {chatRoomsData.map((room, index) => ( // 채팅방 목록을 반복하여 표시
                      <ChatRoom key={index} room={room} onClick={handleChatRoomClick} /> // ChatRoom 컴포넌트 표시
                    ))}
                    <ChatbotRoom onClick={handleChatRoomClick} /> {/* 챗봇 방 추가 */}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatting;
