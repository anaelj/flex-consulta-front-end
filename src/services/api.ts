import axios from 'axios';
// baseURL:'http://192.168.100.8:3333'
// baseURL: process.env.REACT_APP_API_URL,
const api = axios.create({
  baseURL:'http://localhost:3333'
});

export default api;
