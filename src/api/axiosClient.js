import Config from 'react-native-config';
import axios from 'axios';

const baseURL = Config.REACT_APP_API_URL;
console.log('baseURL', baseURL);
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Content-type': 'application/json',
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

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log('error axios ', error, error?.response);
    if (error.response.data.status === 404) {
      // window.location.href = '/404';
    }
    return Promise.reject(error?.response.data);
  },
);

export default axiosClient;
