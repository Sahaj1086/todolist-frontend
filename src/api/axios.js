import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
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