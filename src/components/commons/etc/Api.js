// src/api/openai.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
});

export const sendMessage = async (message) => {
  const response = await openai.post('/chat/completions', {
    model: 'gpt-4o',
    messages: [{ role: 'user', content: message }],
  });
  return response.data.choices[0].message.content;
};

// 백엔드 API로부터 아이템 목록을 가져오는 함수
export const fetchItems = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/no-auth/chatBot`);
  return response.data;
};
