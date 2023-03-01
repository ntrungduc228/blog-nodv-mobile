import axiosClient, {axiosClientPrivate} from './axiosClient';

const url = '/users';
const userApi = {
  getAllUsers: () => axiosClientPrivate.get(url),
  getUserProfile: email => axiosClient.get(`${url}/${email}`),
  searchUser: (q, page = 0, limit = 10) =>
    axiosClientPrivate.get(`${url}/search?q=${q}&page=${page}&limit=${limit}`),
  updateUserProfile: data => axiosClientPrivate.put(url, data),
  followUser: id => axiosClientPrivate.patch(`${url}/follow/${id}`, {}),
  unFollowUser: id => axiosClientPrivate.patch(`${url}/unFollow/${id}`),
  addTopics: topics => axiosClientPrivate.patch(`${url}/topics`, {topics}),
  getOwnTopics: () => axiosClientPrivate.get(`${url}/topics`),
  getAllUnFollow: (page = 0, limit = 3) =>
    axiosClientPrivate.get(url + '/getAllUnFollow'),
  updateCountNotifications: ({userId, isIncrease}) => {
    return axiosClientPrivate.patch(
      `${url}/${userId}${isIncrease ? '?isIncrease=' + isIncrease : ''}`,
    );
  },
  getAllUsersFollower: id => axiosClient.get(`${url}/${id}/follower`),
  getAllUsersFollowing: id => axiosClient.get(`${url}/${id}/following`),
  getUsersNotFollow: limit =>
    axiosClientPrivate.get(url + `/getUsersNotFollowed?limit=${limit}`),
  getMoreUsersNotFlow: limit =>
    axiosClientPrivate.get(url + `/getUsersNotFollowed?limit=${limit}`),
};
export const {
  getAllUsers,
  getUserProfile,
  searchUser,
  updateUserProfile,
  followUser,
  getAllUnFollow,
  unFollowUser,
  addTopics,
  getOwnTopics,
  updateCountNotifications,
  getAllUsersFollower,
  getAllUsersFollowing,
  getMoreUsersNotFlow,
  getUsersNotFollow,
} = userApi;
