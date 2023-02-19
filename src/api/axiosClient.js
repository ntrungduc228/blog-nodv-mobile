import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'content-type': 'application/json',
  },
  credentials: 'include',
  withCredentials: true,
});

export const axiosClientPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'content-type': 'application/json',
  },
  credentials: 'include',
  timeout: 60000,
  withCredentials: true,
});

export default axiosClient;
