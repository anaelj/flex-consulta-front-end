import axios from 'axios';
// 'http://192.168.100.8:3333'
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
