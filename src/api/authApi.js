import axiosClient, {axiosClientPrivate} from './axiosClient';

const url = '/auth';

const authApi = {
  signUp: data => axiosClient.post(`${url}/sign-up`, data),
  login: data => axiosClient.post(`${url}/signin`, data),
  verifyAccount: otp => axiosClient.post(`${url}/verify/${otp}`),
  forgotPassword: data => axiosClient.post(`${url}/forgot-password/${data}`),
  verifyForgotPassword: data =>
    axiosClient.post(`${url}/verify-forgot-password`, data),

  authByMobile: info => {
    return axiosClient.post(`${url}/mobile/auth-by-mobile`, info);
  },
  getAuthInfo: () => axiosClientPrivate.get(url + '/info'),
};

export const {
  getAuthInfo,
  authByMobile,
  signUp,
  login,
  verifyAccount,
  forgotPassword,
  verifyForgotPassword,
} = authApi;

export default authApi;
