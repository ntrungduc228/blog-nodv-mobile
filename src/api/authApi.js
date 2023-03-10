import axiosClient, {axiosClientPrivate} from './axiosClient';

const url = '/auth';

const authApi = {
  authByMobile: info => {
    return axiosClient.post(`${url}/mobile/auth-by-mobile`, info);
  },
  getAuthInfo: () => axiosClientPrivate.get(url + '/info'),
};

export const {getAuthInfo, authByMobile} = authApi;

export default authApi;
