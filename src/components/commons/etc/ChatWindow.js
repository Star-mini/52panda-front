import React, { useState, useEffect, useRef } from 'react'; // React, useState, useEffect, useRef를 import
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트를 import
import styles from '../../../static/styles/css/ChatWindow.module.css'; // CSS 모듈을 import하여 스타일링
import axios from 'axios'; // axios를 import하여 HTTP 요청을 처리
import backImg from '../../../static/styles/images/chatback.png'; // 뒤로가기 아이콘 이미지 import
import { client } from '../../util/client'; // client 객체를 import하여 HTTP 요청에 사용
import { sendMessage, fetchItems } from '../api/openai'; // OpenAI API 호출 함수 및 fetchItems 함수 import

function ChatWindow({ roomId, roomTitle, onBackButtonClick }) {
  const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지를 저장하는 상태 변수
  const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트를 저장하는 상태 변수
  const [messageInput, setMessageInput] = useState(''); // 메시지 입력 값을 저장하는 상태 변수
  const [items, setItems] = useState([]); // 아이템 목록을 저장하는 상태 변수

  const chatContainerRef = useRef(null); // 채팅 메시지 컨테이너에 대한 참조 생성

  // 메시지 입력 값이 변경될 때 호출되는 함수
  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 컴포넌트가 마운트될 때 실행되는 useEffect
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
      // 챗봇 방일 경우 아이템 목록을 불러옴
      const fetchItemsData = async () => {
        try {
          const itemsData = await fetchItems();
          setItems(itemsData);
          // 환영 메시지 추가
          setChatMessages([{ content: '안녕하세요.😊 원하시는게 무엇일까요?', chatUser: 0 }]);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      fetchItemsData();
    }

    return () => {
      if (stompClient !== null) {
        stompClient.deactivate(); // 컴포넌트 언마운트 시 STOMP 클라이언트 비활성화
      }
    };
  }, [roomId]);

  // STOMP 클라이언트가 설정될 때 실행되는 useEffect
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

  // 채팅 메시지가 업데이트될 때 실행되는 useEffect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // 새 메시지가 추가되면 스크롤을 맨 아래로 이동
    }
  }, [chatMessages]);

  // 메시지 전송 버튼을 클릭했을 때 호출되는 함수
  const handleSendMessage = async () => {
    const userId = localStorage.getItem("id");
    if (messageInput.trim() !== '') {
      if (roomId === 'chatbot') {
        // 고객 메시지 추가
        const userMessage = { content: messageInput, chatUser: userId };
        setChatMessages((prevMessages) => [...prevMessages, userMessage]);
        
        try {
          // 아이템 목록을 챗봇에게 함께 전달
          const itemMessages = items.map(item => `<a href="https://web.52pandas.com/detail?itemId=${item.itemId}">${item.title}</a>`).join('<br/>');
          const fullMessage = `너는 이커머스 사이트에서 귀여운 챗봇 역할을 할거야.너의 컨셉은 아기 판다야., 150자 이내로 최대한 간단하게 대답해줘. 귀엽고 친절하게 대응해줘. 그리고 우리 사이트에 있는 현재 물품의 내용은 다음과 같아. 고객이 원하는 내용을 상담해주면 돼.\n\n아이템 목록:\n${itemMessages}\n\n고객 메시지: ${messageInput}`;
          const chatbotResponse = await sendMessage(fullMessage);
          const botMessage = { content: `오이바오: ${chatbotResponse}`, chatUser: '0' }; // 챗봇 메시지는 chatUser가 '0'
          setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.error('Error sending message to OpenAI:', error);
        }
      } else {
        stompClient.publish({ destination: `/message/${roomId}`, body: JSON.stringify({ content: messageInput, chatUser: userId }) });
      }
      setMessageInput(''); // 메시지 입력란 초기화
    }
  };

  // 뒤로가기 버튼을 클릭했을 때 호출되는 함수
  const handleBackButtonClick = () => {
    onBackButtonClick();
  };

  return (
    <div>
      <div className={styles.chatTitle}>
        <img className={styles.backImg} src={backImg} alt="뒤로가기" onClick={handleBackButtonClick} /> {/* 뒤로가기 버튼 */}
        <h3>{roomTitle}</h3>
      </div>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {chatMessages.map((message, index) => (
          <div 
            key={index} 
            className={`${styles.chatBubble} ${message.chatUser === parseInt(localStorage.getItem("id")) ? styles.right : styles.left}`}
            dangerouslySetInnerHTML={{ __html: message.content }} // HTML을 안전하게 렌더링
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
