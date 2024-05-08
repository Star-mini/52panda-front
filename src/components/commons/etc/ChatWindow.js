import React, { useState, useEffect , useRef} from 'react';
import { Client }  from '@stomp/stompjs';
import styles from '../../../static/styles/css/ChatWindow.module.css';

function ChatWindow({ roomId, onBackButtonClick ,testUser}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const chatContainerRef = useRef(null);

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081/ws');
    const stomp = new Client({
      webSocketFactory: () => socket,
      debug: function () {
        console.log.apply(null, arguments);
      },
    });
    setStompClient(stomp);

    return () => {
      if (stompClient !== null) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.onConnect = () => {
        console.log('WebSocket 연결됨');
        stompClient.subscribe(`/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
          
        });
      };

      stompClient.activate();
    }
  }, [stompClient, roomId]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      stompClient.publish({ destination: `/message/${roomId}`, body: JSON.stringify({ content: messageInput ,chatUser:testUser}) })
      setMessageInput('');
    }
  };


  const handleBackButtonClick = () => {
    onBackButtonClick(); 
  };

  return (
    <div  className={styles.chatContainer} ref={chatContainerRef}>
      <button onClick={handleBackButtonClick}>뒤로가기</button>
      <h3>채팅 내역</h3>
      {chatMessages.map((message) => (
          <div key={message.id} className={`${styles.chatBubble} ${message.chatUser === testUser ? styles.right : styles.left}`}>
            {message.content}
          </div>
        ))}
      <div className={styles.inputContainer}>
        <input 
          className={styles.input}
          type="text" 
          value={messageInput} 
          onChange={handleMessageInputChange} 
          placeholder="메시지를 입력하세요" />
        <button onClick={handleSendMessage} className={styles.sendBtn}>전송</button>
      </div>
    </div>
  );
}

export default ChatWindow;