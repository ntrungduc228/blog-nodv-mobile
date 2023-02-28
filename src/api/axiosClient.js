import axios from 'axios';
import Config from 'react-native-config';
import {store} from '../redux/store';
const baseURL = Config.REACT_APP_API_URL;
import jwt_decode from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import routes from '../navigations/routesScreen';
import useSocialAuth from '../hooks/useSocialAuth';
import {setIsCallLogin} from '../redux/slices/authSlice';

// const navigation = useNavigation();

function ConfigAxiosInterceptor(config) {
  const navigation = useNavigation();
  const {handleLogoutBySocial} = useSocialAuth();

  const accessToken = store.getState().user.data.accessToken;
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  if (accessToken === null) {
    store.dispatch(setIsCallLogin(true));
    navigation.navigate(routes.Auth);
  } else {
    const decodeToken = jwt_decode(accessToken);
    const today = new Date();
    if (decodeToken.exp < today.getTime() / 1000) {
      handleLogoutBySocial();
      // store.dispatch(logout());
      // window.location.href = appRoutes.AUTH_LOGIN;
      navigation.navigate(routes.Auth);
    }
  }
}

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

axiosClientPrivate.interceptors.request.use(
  async config => {
    ConfigAxiosInterceptor(config);
    // const accessToken = store.getState().user.data.accessToken;
    // config.headers['Authorization'] = `Bearer ${accessToken}`;
    // if (accessToken === null) {
    //   // store.dispatch(setIsCallLogin(true));
    // } else {
    //   const decodeToken = jwt_decode(accessToken);
    //   const today = new Date();
    //   if (decodeToken.exp < today.getTime() / 1000) {
    //     // store.dispatch(logout());
    //     // window.location.href = appRoutes.AUTH_LOGIN;
    //   }
    // }

    return config;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

axiosClientPrivate.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

axiosClient.interceptors.request.use(
  async config => {
    const accessToken = store.getState()?.user?.data?.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    // console.log('responssee ', response.data);
    return response?.data;
  },
  function (error) {
    console.log('error axios ', error, error?.response);
    console.log('keys axios ', Object.key(error));
    if (error.response.data.status === 404) {
      // window.location.href = '/404';
    }
    return Promise.reject(error?.response.data);
  },
);

export default axiosClient;
