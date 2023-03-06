import {axiosClientPrivate} from './axiosClient';

const url = '/notifications';

const notificationApi = {
  getNotifications: (isRead, page = 0, limit = 10) =>
    axiosClientPrivate.get(
      `${url}${
        isRead != null ? `?isRead=${isRead}&` : '?'
      }page=${page}&limit=${limit}`,
    ),
  setIsRead: id => axiosClientPrivate.patch(`${url}/${id}`),
  createNotification: notification => {
    console.log('createNotification', notification);
    return axiosClientPrivate.post(`${url}`, notification);
  },
};

export const setNotificationRead = async id => {
  const response = await axiosClientPrivate.patch(`${url}/${id}`, null);
  return response.data;
};

export const {getNotifications, setIsRead, createNotification} =
  notificationApi;

export default notificationApi;
