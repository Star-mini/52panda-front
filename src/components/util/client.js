import axios from 'axios';

export const client = axios.create({
    headers: {
      'Content-Type': 'application/json',
      access: `${localStorage.getItem('access')}`,
    },
    withCredentials: true,
  });
  