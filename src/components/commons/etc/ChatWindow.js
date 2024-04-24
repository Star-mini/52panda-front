import React, { useState, useEffect } from 'react';
import { Client }  from '@stomp/stompjs';

function ChatWindow({ roomId, onBackButtonClick }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messageInput, setMessageInput] = useState('');


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

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      stompClient.publish({ destination: `/message/${roomId}`, body: JSON.stringify({ content: messageInput ,chatUser:1}) });
      setMessageInput('');
    }
  };


  const handleBackButtonClick = () => {
    onBackButtonClick(); 
  };

  return (
    <div>
      <button onClick={handleBackButtonClick}>뒤로가기</button>
      <h3>채팅 내역</h3>
      <ul>
        {chatMessages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          value={messageInput} 
          onChange={handleMessageInputChange} 
          placeholder="메시지를 입력하세요" />
        <button onClick={handleSendMessage} style={{ marginLeft: '8px' }}>전송</button>
      </div>
    </div>
  );
}

export default ChatWindow;