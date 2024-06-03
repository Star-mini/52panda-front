import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import styles from '../../../static/styles/css/ChatWindow.module.css';
import axios from 'axios';
import backImg from '../../../static/styles/images/chatback.png';
import { client } from '../../util/client';
import { sendMessage, fetchItems } from '../api/openai';
import sanitizeHtml from 'sanitize-html'; // sanitize-html 라이브러리를 import

function ChatWindow({ roomId, roomTitle, onBackButtonClick }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [items, setItems] = useState([]);

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
        console.log("테스트용", response.data.data);

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

    if (roomId !== 'chatbot') {
      fetchData();
      const socket = new WebSocket(`${process.env.REACT_APP_CHAT_URL}`);
      const stomp = new Client({
        webSocketFactory: () => socket,
        debug: function () {
          console.log.apply(null, arguments);
        },
      });
      setStompClient(stomp);
    } else {
      const fetchItemsData = async () => {
        try {
          const itemsData = await fetchItems();
          setItems(itemsData);
          setChatMessages([{ content: '안녕하세요.😊 원하시는게 무엇일까요?', chatUser: 0 }]);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      fetchItemsData();
    }

    return () => {
      if (stompClient !== null) {
        stompClient.deactivate();
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (stompClient) {
      stompClient.onConnect = () => {
        console.log('WebSocket 연결됨');
        if (roomId !== 'chatbot') {
          stompClient.subscribe(`/room/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
          });
        }
      };

      stompClient.activate();
    }
  }, [stompClient, roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    const userId = localStorage.getItem("id");
    if (messageInput.trim() !== '') {
      if (roomId === 'chatbot') {
        const userMessage = { content: messageInput, chatUser: userId };
        setChatMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
          const itemMessages = items.map(item => `<a href="https://web.52pandas.com/detail?itemId=${item.itemId}">${item.title}</a>`).join('<br/>');          const fullMessage = `너는 이커머스 사이트에서 귀여운 챗봇 역할을 할거야. 너의 컨셉은 아기 판다야. 150자 이내로 최대한 간단하게 대답해줘. 귀엽고 친절하게 대응해줘. 그리고 우리 사이트에 있는 현재 물품의 내용은 다음과 같아. 고객이 원하는 내용을 상담해주면 돼.\n\n아이템 목록:\n${itemMessages}\n\n고객 메시지: ${messageInput}\n\n링크는 하이퍼링크로 전달해주세요.`;
          const chatbotResponse = await sendMessage(fullMessage);
          const botMessage = { content: `오이바오: ${chatbotResponse}`, chatUser: '0' };
          setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.error('Error sending message to OpenAI:', error);
        }
      } else {
        stompClient.publish({ destination: `/message/${roomId}`, body: JSON.stringify({ content: messageInput, chatUser: userId }) });
      }
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
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {chatMessages.map((message, index) => (
          <div 
            key={index} 
            className={`${styles.chatBubble} ${message.chatUser === localStorage.getItem("id") ? styles.right : styles.left}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.content, { allowedTags: ['a'], allowedAttributes: { 'a': ['href'] } }) }} // HTML을 안전하게 렌더링
          />
        ))}
      </div>
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
  );
}

export default ChatWindow;
