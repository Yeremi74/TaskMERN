import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://taskmern-xlb2.onrender.com/api',
  withCredentials: true,
});

export default instance;
