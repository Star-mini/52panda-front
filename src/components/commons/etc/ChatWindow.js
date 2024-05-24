import React, { useState, useEffect , useRef} from 'react';
import { Client }  from '@stomp/stompjs';
import styles from '../../../static/styles/css/ChatWindow.module.css';
import axios from 'axios';
import backImg from '../../../static/styles/images/chatback.png';
import { client } from '../../util/client';


function ChatWindow({ roomId, roomTitle,onBackButtonClick }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const chatContainerRef = useRef(null);

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await client.get(`${process.env.REACT_APP_API_URL}/v1/auth/chat/room/content?roomId=${roomId}`);
        console.log("테스트용",response.data.data);

        const messages = response.data.data;
        const newMessages = messages.map(message => ({
          content: message.content, 
          chatUser: message.chatUser
        }));
        
        setChatMessages(prevMessages => [...prevMessages, ...newMessages]);
      } catch (error) {
        console.error('Error fetching chat content:', error);
      }
    };

    fetchData();


    const socket = new WebSocket(`${process.env.REACT_APP_CHAT_URL}`);
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
      stompClient.publish({ destination: `/message/${roomId}`, body: JSON.stringify({ content: messageInput ,chatUser:1}) })
      setMessageInput('');
    }
  };


  const handleBackButtonClick = () => {
    onBackButtonClick(); 
  };

  return (
    <div>
      <div className={styles.chatTitle}>
        <img className={styles.backImg} src={backImg} alt="뒤로가기" onClick={handleBackButtonClick} />
        <h3>{roomTitle}</h3>
      </div>
      <div  className={styles.chatContainer} ref={chatContainerRef}>
      
      
      {chatMessages.map((message) => (
          <div key={message.id} className={`${styles.chatBubble} ${message.chatUser === localStorage.getItem("id") ? styles.right : styles.left}`}>
            {message.content}
          </div>
        ))}
      <div className={styles.inputContainer}>
        <input 
          className={styles.input}
          type="text" 
          value={messageInput} 
          onChange={handleMessageInputChange}
          onKeyDown={handleKeyPress} 
          placeholder="메시지를 입력하세요" />
        <button onClick={handleSendMessage} className={styles.sendBtn}>전송</button>
      </div>
    </div>
    </div>
    
  );
}

export default ChatWindow;