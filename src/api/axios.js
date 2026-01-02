import axios from 'axios';
const API = axios.create({
  // baseURL: 'http://localhost:5001/api',
  baseURL:'https://todolist-backend-iota.vercel.app/api',
  timeout: 10000,
  withCredentials: true,
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;